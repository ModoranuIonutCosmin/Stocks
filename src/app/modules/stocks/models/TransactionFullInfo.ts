
export interface TransactionFullInfo {
    id: number,
    isBuy: boolean,
    unitsPurchased: number,
    initialPrice: number,
    currentPrice: number,
    investedAmount: number,
    stopLossAmount: number,
    takeProfitAmount: number,
    value: number,
    leverage: number,
    date: Date,
    isCfd: boolean,
    profitOrLoss: number,
    profitOrLossPercentage: number
}
