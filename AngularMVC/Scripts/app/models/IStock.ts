export interface IStock
{
    StockId: number,
    STOCKNAME: string,
    ActualRATE: string,
    DESCRIPTION : string,
    NETPOSITION : number,
    AVGRATE: number ,
    CLOSING : number,
    MARKETRATE : number,
    GAINLOSS : number,
    MARKETVAL : number,
    PERCENTCHANGE : number,
    ISIN : string,
    HOLDINGVALUE : number,
}
export interface ICompany {
    label: string;
    name: string;
    symbol: string;
    sector; string;
    industry: string;
}
export interface Quote {
    AverageDailyVolume: number;
    Change: number;
    DaysLow: number;
    DaysHigh: number;
    YearLow: number;
    YearHigh: number;
    MarketCapitalization: number;
    LastTradePriceOnly: number;
    DaysRange: string;
    Name: string;
    Symbol: string;
    Volume: number;
    StockExchange: string;
}

export interface QuoteSearch {
    symbol: string;
    name: string;
    exch: string;
    type: string;
}

export interface Stock {
    Name: string;
    Symbol: string;
    Quantity: number;
    Price: number;
    Change: number;
}

interface Price {
    price: number;
    change: number;
}

export interface StockPrices {
    [index: string]: Price;
}

export interface yahooStock
{
    symbol: string, 
    AverageDailyVolume: number,
    Change: number,
    DaysLow: number,
    DaysHig: number,
    YearLow: number,
    YearHigh: number,
    MarketCapitalization: string,
    LastTradePriceOnly: number,
    DaysRange: string,
    Name: string,
    Symbol: string,
    Volume: number,
    StockExchange: string
}