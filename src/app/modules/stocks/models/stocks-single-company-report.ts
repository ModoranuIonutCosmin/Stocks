import { OHLCPriceValue } from "./ohlcprice-value";

export interface StocksSingleCompanyReport {
    ticker: string;
    name: string;
    urlLogo: string;
    description: string;
    trend: Number;
    sellPrice: Number;
    buyPrice: Number;
    period: Number;
    timepoint: OHLCPriceValue;
}
