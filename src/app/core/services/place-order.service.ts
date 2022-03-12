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

  public getMaximumStopLoss(investedAmount: number, leverage: number, isBuy: boolean): number {
    return (isBuy && leverage == 1) ? investedAmount : investedAmount / 2;
  }
  public getMinimumStopLoss(investedAmount: number): number {
    return 0.05 * investedAmount;
  }

  public getMaximumTakeProfit(investedAmount: number, isBuy: boolean): number {
    return 50 * investedAmount;
  }

}
