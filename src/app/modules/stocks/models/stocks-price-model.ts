export interface StocksPriceModel {
  id: number,
  price: number,
  prediction: boolean,
  date: Date,
  companyTicker: string,
  algorithmUsed: string
}
