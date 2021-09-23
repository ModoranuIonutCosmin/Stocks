import { TransactionFullInfo } from "./TransactionFullInfo";

export interface AllTransactionsDetailedDataModel {
    ticker: string,
    name: string,
    description: string,
    urlLogo: string,
    transactions: Array<TransactionFullInfo>
}
