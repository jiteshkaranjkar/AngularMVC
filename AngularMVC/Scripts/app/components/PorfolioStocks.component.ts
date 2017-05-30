import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { StockService } from '../services/stock.service';
import { IStock, ICompany, Quote, QuoteSearch, Stock, StockPrices } from '../models/IStock';
import { GoogleAPI } from '../models/GoogleFinanceAPIModel';
import { DBOperation } from '../Shared/enums';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
//import { AutocompleteContainer } from './autocomplete-container';
//import { Autocomplete } from './autocomplete.component';
//export const AUTOCOMPLETE_DIRECTIVES = [Autocomplete, AutocompleteContainer];

import { lookUpTokenList, lookUpTokens } from '../models/Providers';

@Component({
    templateUrl: 'Scripts/app/components/PorfolioStocks.component.html'
})

export class PorfolioStocksComponent implements OnInit {
    init: OnInit;
    stock: IStock;
    stocks: IStock[];
    apiStockList: GoogleAPI[];
    apiStock: GoogleAPI;
    stkFrmGrp: FormGroup;
    msg: string;
    indLoading: boolean = false;
    toggoleShowHide: number = 0;
    operation: string;
    dbOps: DBOperation;
    loading: boolean;
    googAPIop: string = "";
    stkNameList: string = "";
    googAPIopArry: string[];
    quoteStr: string = "";
    stkDetails: string = "";
    stkQuoteVisibility: number = 0;

    constructor(private frmBldr: FormBuilder, private stockService: UserService, @Inject(lookUpTokenList) public lookUpTokens, private stocksService: StockService, private http: Http) { }

    ngOnInit(): void {
        this.stkFrmGrp = this.frmBldr.group({
            StockId: [''],
            STOCKNAME: [''],
            DESCRIPTION: [''],
            NETPOSITION: [''],
            AVGRATE: [''],
            CLOSING: [''],
            MARKETRATE: [''],
            GAINLOSS: [''],
            MARKETVAL: [''],
            PERCENTCHANGE: [''],
            ISIN: [''],
            HOLDINGVALUE: [''],
        });
        this.LoadStocks();

        setTimeout(() => this.RealTimeStock(), 1000);
    }

    RealTimeStock() {
        this.getStockNameList();
        
        this.http.get('https://www.google.com/finance/info?q=NSE:' + this.stkNameList)
            .subscribe(data => {
                this.googAPIopArry = data.text().replace('[', '').replace(']', '').split('{', 100);//var str = "SUNPHARMA,TCS";
                //this.apiStockList = JSON.parse(data.text());
            });
        //setTimeout(() => console.log("First " + this.googAPIopArry[1].toString()), 400);
        ////setTimeout(() => console.log("Second " + this.getJsonData(this.googAPIopArry)), 400);

        ////setTimeout(() => this.getJsonData(this.googAPIopArry), 500);
    }

    getStockNameList() {
        var resultString = ""; // result variable
        this.stocks.forEach(function (stock) {
            resultString += (stock.STOCKNAME + ",");
        });
        //remove the extra comma at the end, using a regex
        this.stkNameList = resultString.replace(/,(?=[^,]*$)/, '')
    }

    //getJsonData(obj : string[])
    //{
    //    var len = this.stocks.length;
    //    console.log("Third " + Object.keys(obj).map(function (k) { return obj[k] }));
    //    this.googAPIopArry.forEach(
    //        {
    //            for(var i = 0; i< len; ++i)
    //    {
    //        this.stocks[i].STOCKNAME = 
    //            }
    //        });
    //}

    getQuote(value: string) {
        if (value != "") {
            this.quoteStr = value;
            this.http.get('https://www.google.com/finance/info?q=NSE:' + value)
                .subscribe(data => {
                    this.stkDetails = data.text().replace('[', '').replace(']', '');
                    //this.apiStock = JSON.parse(this.stkDetails);
                    //alert("stkDetails " +this.stkDetails);
                    //alert("apiStock " + this.apiStock);
                },
                err => { this.stkDetails = "Incorrect stock name, use proper name to get quote." + <any>err; }
                );
            this.stkQuoteVisibility = 1;
        }
        else
        {
            this.stkQuoteVisibility = 0;
        }
    }

    LoadStocks(): void {
        this.indLoading = true;
        this.stockService.get('api/PorfolioStocks/').
            subscribe(stocks => { this.stocks = stocks; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    yearValidator(control) {
        if (control.value.length == 0) {
            return null;
        }
        let year = control.value.getFullYear();
        let minYear = 1920;
        let maxYear = 2017;
        if (year >= minYear && year <= maxYear) {
            return control.value.toDateString();
        }
        else
            return { 'DOB': { min: minYear, max: maxYear } };
    }

    addStock() {
        this.dbOps = DBOperation.insert;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Add New Stock";
        this.stkFrmGrp.reset();
    }

    editStock(stock: IStock) {
        this.dbOps = DBOperation.update;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Edit Stocks";
        this.stkFrmGrp.setValue(stock);
    }

    deleteStock(id: number, stock: IStock) {
        this.toggoleShowHide = 0;
        this.dbOps = DBOperation.delete;
        this.SetControlState(false);
        this.stock = this.stocks.filter(x => x.StockId = stock.StockId)[0];
        this.stkFrmGrp.setValue(stock);
        this.stockService.delete('api/PorfolioStocks/', stock.StockId).subscribe(
            data => {
                if (data != null && data.StockId != 0) //Success
                {
                    this.msg = "Stock successfully deleted.";
                    this.toggoleShowHide = 0;
                    this.LoadStocks();
                }
                else {
                    this.msg = "There is some issue in saving records, please contact to system administrator!"
                }
            },
            error => {
                this.msg = error;
            }
        );
    }

    onSubmit(formData: any) {
        this.msg = "";
        switch (this.dbOps) {
            case DBOperation.insert:
                formData.StockId = 0;
                formData.FatherId = 0;
                formData.MotherId = 0;
                formData.GaurdianId = 0;
                this.stockService.post('api/porfoliostocksapi/', formData).subscribe(
                    data => {
                        if (data != null && data.StockId != 0) //Success
                        {
                            this.msg = "Data Successfully Added."
                            this.toggoleShowHide = 0;
                            this.LoadStocks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.msg = error;
                    });
                break;
            case DBOperation.update:
                this.stockService.put('api/PorfolioStocks/', formData.value.StockId, formData.value).subscribe(
                    data => {
                        if (data != null && data.StockId != 0) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.toggoleShowHide = 0;
                            this.LoadStocks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.msg = error;
                    }
                );
            case DBOperation.delete:
                alert("delete");
                this.stockService.delete('api/PorfolioStocks/', formData.value.StockId).subscribe(
                    data => {
                        if (data != null && data.StockId != 0) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.toggoleShowHide = 0;
                            this.LoadStocks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            default:
                alert("default");
                break;
        }
    }

    SetControlState(isEnable: boolean) {
        isEnable ? this.stkFrmGrp.enable() : this.stkFrmGrp.disable();
    }
}