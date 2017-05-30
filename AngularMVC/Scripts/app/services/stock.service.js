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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var StockService = (function () {
    function StockService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.stocks = JSON.parse(localStorage['portfolio'] || '[]');
        this.stockPrices = {};
        //private BASE = 'http://query.yahooapis.com/v1/public/yql'; http://finance.google.com/finance/info?client=ig&q=NSE:NIFTY,INDEXBOM:SENSEX, q=NSE:NiFTY
        this.baseUrl = 'https://www.google.com/finance/info?q=NSE:SUNPHARMA,TCS';
    }
    StockService.prototype.get = function (url) {
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
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
    StockService.prototype.handleError = function (error) {
        console.error(error);
        alert(error.statusText + "  " + error.text());
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return StockService;
}());
StockService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_1.Jsonp])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map