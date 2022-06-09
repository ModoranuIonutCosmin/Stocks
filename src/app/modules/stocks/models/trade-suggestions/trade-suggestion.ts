import { PlaceOrderRequestModel } from "../PlaceOrderRequestModel";

export interface TradeSuggestion {
    ticker: string,
    currentPrice: number,
    expectedPrice: number,
    openRequest: PlaceOrderRequestModel
}
