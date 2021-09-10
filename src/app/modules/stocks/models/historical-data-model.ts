import { SimpleTimepointValuesModel } from "./simple-timepoint-values-model";

export interface HistoricalDataModel {
    ticker: string,
    name: string,
    description: string,
    urllogo: string,
    trend: number,
    historicalPrices: Array<SimpleTimepointValuesModel>
}
