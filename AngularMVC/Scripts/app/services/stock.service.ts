import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IStock, ICompany, Quote, QuoteSearch, Stock, StockPrices, yahooStock } from '../models/IStock';
import { GoogleAPI } from '../models/GoogleFinanceAPIModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class StockService {
    stocks: GoogleAPI[] = JSON.parse(localStorage['portfolio'] || '[]');
    stockPrices: StockPrices = {};
    stock: GoogleAPI;
    stockList: GoogleAPI[];

    //private BASE = 'http://query.yahooapis.com/v1/public/yql'; http://finance.google.com/finance/info?client=ig&q=NSE:NIFTY,INDEXBOM:SENSEX, q=NSE:NiFTY
    private baseUrl : string = 'https://www.google.com/finance/info?q=NSE:SUNPHARMA,TCS';

    constructor(private http: Http, private jsonp: Jsonp)
    { }

    get(url: string): Observable<any> {
        return this.http.get(url)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    //GetGoogleStocks() {
    //    var url = "http://query.yahooapis.com/v1/public/yql";

    //    return this.jsonp.request('http://chartapi.finance.yahoo.com/instrument/1.0/NFLX/chartdata;type=quote;range=1d/json/?callback=JSONP_CALLBACK')
    //        .map(res => {
    //            return res.json().results.map(item => {
    //                return new GoogleAPI(
    //                    item.id,
    //                    item.t,
    //                    item.e,
    //                    item.l,
    //                    item.l_cur,
    //                    item.ltt,
    //                    item.lt_dts
    //                ); 
    //            });
    //        });

    //    //return this.http.get(this.baseUrl)
    //    //    .map((response: Response) => <any>response.json())
    //    //    //.map((data: Response) => {
    //    //    //data.text(); 
    //    //    //   console.log(data.text());})
    //    //    .catch(this.handleError);
    //}

    //GetGoogleStocks(): Observable<GoogleAPI[]> {
    //    debugger;
    //    return this.http.get(this.baseUrl)
    //        .map((data: Response) => {
    //            this.stockList = data.text();
    //            return this.stocks.map(({ id, t, e, l, l_cur, ltt, lt_dts }) => ({
    //            id: this.stockList.id,
    //            t,
    //            e,
    //            l,
    //            l_cur,
    //            ltt,
    //            lt_dts
    //                    Price: this.stockPrices[Symbol].price,
    //                    Change: this.stockPrices[Symbol].change
    //                })
    //            );
    //        });
    //}

    //getPrices(symbols: String[]): Observable<StockPrices> {
    //    debugger;
    //    if (symbols.length === 0) //return Observable.arguments(<StockPrices>{});
    //    {
    //        symbols = new Array("AMZN", "MSFT");
    //    }
    //    ///https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quote where symbol in ("${symbols.join('", "')}")&format=json&env=store://datatables.org/alltableswithkeys
    //    return this.http.get(`https://www.google.com/finance/info?q=NASDAQ:GOOG`)
    //        .map((response) => [].concat(response.json().query.results.quote)
    //            .reduce((o: Object, v: Quote) => Object.assign(o, { [v.Symbol]: { price: v.LastTradePriceOnly, change: v.Change } }), {}));

    //}

    //searchQuotes(query: string): Observable<QuoteSearch[]> {
    //    return this._jsonp.get(`https://s.yimg.com/aq/autoc?region=US&lang=en-US&callback=JSONP_CALLBACK&query=${query}`)
    //        .map((response) => response.json().ResultSet.Result);
    //}


    private handleError(error: Response) {
        console.error(error);
        alert(error.statusText + "  " + error.text());
        return Observable.throw(error.json().error || 'Server error');
    }

}