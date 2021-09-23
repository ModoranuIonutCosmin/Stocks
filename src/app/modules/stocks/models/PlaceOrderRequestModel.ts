
export interface PlaceOrderRequestModel {
    token: string,
    ticker: string,
    isBuy: boolean,
    leverage: number,
    stopLossAmount: number,
    takeProfitAmount: number,
    investedAmount: number,
}
