import { TransactionFullInfo } from "./TransactionFullInfo";

export interface AllTransactionsDetailedDataModel {
    ticker: string,
    name: string,
    description: string,
    urlLogo: string,
    openTransactions: Array<TransactionFullInfo>,
    scheduledTransactions: Array<TransactionFullInfo>,
    closedTransactions: Array<TransactionFullInfo>,
}
