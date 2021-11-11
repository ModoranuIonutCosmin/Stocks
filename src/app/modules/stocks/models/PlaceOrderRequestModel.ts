
export interface PlaceOrderRequestModel {
    token: string,
    isBuy: boolean,
    ticker: string,
    leverage: number,
    stopLossAmount: number,
    takeProfitAmount: number,
    investedAmount: number,
}
