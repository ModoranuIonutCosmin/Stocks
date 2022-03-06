import {StocksPriceModel} from "./stocks-price-model";

export interface ForecastDataModel {
  ticker: string,
  algorithm: string,
  page: number,
  count: number,
  totalCount: number,
  predictions: Array<StocksPriceModel>
}
