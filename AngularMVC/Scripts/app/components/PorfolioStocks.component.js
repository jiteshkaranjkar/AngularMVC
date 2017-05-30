"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("../services/user.service");
var stock_service_1 = require("../services/stock.service");
var enums_1 = require("../Shared/enums");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
//import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
//import { AutocompleteContainer } from './autocomplete-container';
//import { Autocomplete } from './autocomplete.component';
//export const AUTOCOMPLETE_DIRECTIVES = [Autocomplete, AutocompleteContainer];
var Providers_1 = require("../models/Providers");
var PorfolioStocksComponent = (function () {
    function PorfolioStocksComponent(frmBldr, stockService, lookUpTokens, stocksService, http) {
        this.frmBldr = frmBldr;
        this.stockService = stockService;
        this.lookUpTokens = lookUpTokens;
        this.stocksService = stocksService;
        this.http = http;
        this.indLoading = false;
        this.toggoleShowHide = 0;
        this.googAPIop = "";
        this.stkNameList = "";
        this.quoteStr = "";
        this.stkDetails = "";
        this.stkQuoteVisibility = 0;
    }
    PorfolioStocksComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        setTimeout(function () { return _this.RealTimeStock(); }, 1000);
    };
    PorfolioStocksComponent.prototype.RealTimeStock = function () {
        var _this = this;
        this.getStockNameList();
        this.http.get('https://www.google.com/finance/info?q=NSE:' + this.stkNameList)
            .subscribe(function (data) {
            _this.googAPIopArry = data.text().replace('[', '').replace(']', '').split('{', 100); //var str = "SUNPHARMA,TCS";
            //this.apiStockList = JSON.parse(data.text());
        });
        //setTimeout(() => console.log("First " + this.googAPIopArry[1].toString()), 400);
        ////setTimeout(() => console.log("Second " + this.getJsonData(this.googAPIopArry)), 400);
        ////setTimeout(() => this.getJsonData(this.googAPIopArry), 500);
    };
    PorfolioStocksComponent.prototype.getStockNameList = function () {
        var resultString = ""; // result variable
        this.stocks.forEach(function (stock) {
            resultString += (stock.STOCKNAME + ",");
        });
        //remove the extra comma at the end, using a regex
        this.stkNameList = resultString.replace(/,(?=[^,]*$)/, '');
    };
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
    PorfolioStocksComponent.prototype.getQuote = function (value) {
        var _this = this;
        if (value != "") {
            this.quoteStr = value;
            this.http.get('https://www.google.com/finance/info?q=NSE:' + value)
                .subscribe(function (data) {
                _this.stkDetails = data.text().replace('[', '').replace(']', '');
                //this.apiStock = JSON.parse(this.stkDetails);
                //alert("stkDetails " +this.stkDetails);
                //alert("apiStock " + this.apiStock);
            }, function (err) { _this.stkDetails = "Incorrect stock name, use proper name to get quote." + err; });
            this.stkQuoteVisibility = 1;
        }
        else {
            this.stkQuoteVisibility = 0;
        }
    };
    PorfolioStocksComponent.prototype.LoadStocks = function () {
        var _this = this;
        this.indLoading = true;
        this.stockService.get('api/PorfolioStocks/').
            subscribe(function (stocks) { _this.stocks = stocks; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    PorfolioStocksComponent.prototype.yearValidator = function (control) {
        if (control.value.length == 0) {
            return null;
        }
        var year = control.value.getFullYear();
        var minYear = 1920;
        var maxYear = 2017;
        if (year >= minYear && year <= maxYear) {
            return control.value.toDateString();
        }
        else
            return { 'DOB': { min: minYear, max: maxYear } };
    };
    PorfolioStocksComponent.prototype.addStock = function () {
        this.dbOps = enums_1.DBOperation.insert;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Add New Stock";
        this.stkFrmGrp.reset();
    };
    PorfolioStocksComponent.prototype.editStock = function (stock) {
        this.dbOps = enums_1.DBOperation.update;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Edit Stocks";
        this.stkFrmGrp.setValue(stock);
    };
    PorfolioStocksComponent.prototype.deleteStock = function (id, stock) {
        var _this = this;
        this.toggoleShowHide = 0;
        this.dbOps = enums_1.DBOperation.delete;
        this.SetControlState(false);
        this.stock = this.stocks.filter(function (x) { return x.StockId = stock.StockId; })[0];
        this.stkFrmGrp.setValue(stock);
        this.stockService.delete('api/PorfolioStocks/', stock.StockId).subscribe(function (data) {
            if (data != null && data.StockId != 0) {
                _this.msg = "Stock successfully deleted.";
                _this.toggoleShowHide = 0;
                _this.LoadStocks();
            }
            else {
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    PorfolioStocksComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbOps) {
            case enums_1.DBOperation.insert:
                formData.StockId = 0;
                formData.FatherId = 0;
                formData.MotherId = 0;
                formData.GaurdianId = 0;
                this.stockService.post('api/porfoliostocksapi/', formData).subscribe(function (data) {
                    if (data != null && data.StockId != 0) {
                        _this.msg = "Data Successfully Added.";
                        _this.toggoleShowHide = 0;
                        _this.LoadStocks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enums_1.DBOperation.update:
                this.stockService.put('api/PorfolioStocks/', formData.value.StockId, formData.value).subscribe(function (data) {
                    if (data != null && data.StockId != 0) {
                        _this.msg = "Data successfully updated.";
                        _this.toggoleShowHide = 0;
                        _this.LoadStocks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
            case enums_1.DBOperation.delete:
                alert("delete");
                this.stockService.delete('api/PorfolioStocks/', formData.value.StockId).subscribe(function (data) {
                    if (data != null && data.StockId != 0) {
                        _this.msg = "Data successfully deleted.";
                        _this.toggoleShowHide = 0;
                        _this.LoadStocks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            default:
                alert("default");
                break;
        }
    };
    PorfolioStocksComponent.prototype.SetControlState = function (isEnable) {
        isEnable ? this.stkFrmGrp.enable() : this.stkFrmGrp.disable();
    };
    return PorfolioStocksComponent;
}());
PorfolioStocksComponent = __decorate([
    core_1.Component({
        templateUrl: 'Scripts/app/components/PorfolioStocks.component.html'
    }),
    __param(2, core_1.Inject(Providers_1.lookUpTokenList)),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, Object, stock_service_1.StockService, http_1.Http])
], PorfolioStocksComponent);
exports.PorfolioStocksComponent = PorfolioStocksComponent;
//# sourceMappingURL=PorfolioStocks.component.js.map