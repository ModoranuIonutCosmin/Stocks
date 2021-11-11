import { SimpleTimepointValuesModel } from "./simple-timepoint-values-model";

export interface ForecastDataModel {
    ticker: string,
    name: string,
    description: string,
    urllogo: string,
    predictions: Array<SimpleTimepointValuesModel>
}
