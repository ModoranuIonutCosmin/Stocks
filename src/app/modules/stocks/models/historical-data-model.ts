import { OHLCPriceValue } from "./ohlcprice-value";

export interface HistoricalDataModel {
    ticker: string,
    name: string,
    description: string,
    urllogo: string,
    trend: number,
    sellPrice: number,
    buyPrice: number,
    period: number,
    timepoints: Array<OHLCPriceValue>
}
