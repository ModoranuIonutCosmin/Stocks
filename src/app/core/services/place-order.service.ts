import { Injectable } from '@angular/core';

@Injectable()
export class PlaceOrderService {

  constructor() {

  }

  public getAmountChangeStep(currentFunds: number): number {
    return Math.floor(currentFunds * 0.01)
  }

  public getInitialInvestedAmount(currentFunds: number) {
    return Math.floor(currentFunds / 10);
  }

  public getMaximumStopLoss(investedAmount: number, isBuy: boolean): number {
    return isBuy ? investedAmount : investedAmount / 2;
  }
  public getMinimumStopLoss(investedAmount: number, isBuy: boolean, leverage: number): number {
    return (isBuy && leverage == 1) ? 0 : investedAmount / 2;
  }

  public getMaximumTakeProfit(investedAmount: number, isBuy: boolean): number {
    return 50 * investedAmount;
  }

}
