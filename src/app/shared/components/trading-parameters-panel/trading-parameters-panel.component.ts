import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TradingContextService} from "../../../core/services/trading-context.service";
import {PlaceOrderService} from "../../../core/services/place-order.service";
import {PlaceOrderRequestModel} from "../../../modules/stocks/models/PlaceOrderRequestModel";
import {Guid} from "guid-typescript";
import {PortofolioService} from "../../../core/services/portofolio.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {OrderTaxesPreviewModel} from "../../../modules/stocks/models/orderPreviewModel";
import {StocksSingleCompanyReport} from "../../../modules/stocks/models/stocks-single-company-report";
import {Subscription, takeWhile, timer} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";
import {TradingContextModel} from "../../../modules/stocks/models/trading-context-model";

@Component({
  selector: 'app-trading-parameters-panel',
  templateUrl: './trading-parameters-panel.component.html',
  styleUrls: ['./trading-parameters-panel.component.scss']
})
export class TradingParametersPanelComponent implements OnInit, OnDestroy {
  alive = true;


  @Input() isBuyOrder: boolean = true;

  investedAmount: number = 0;
  investedStep: number = 0;

  availableFunds = 0;
  stopAmount = 0;
  takeProfit = 0;
  leverageValue: number = 1;

  validityToken = Guid.create().toString();
  errorMessage = ''
  ticker = '';

  orderDetails: UntypedFormGroup = this.fb.group({
    investedAmount: [0, [Validators.required]],
    stopLoss: [0, [Validators.required]],
    takeProfit: [0, [Validators.required]],
  });

  tradingParametersSubscription$!: Subscription;
  tradingParameters!: OrderTaxesPreviewModel;
  companyModel!: StocksSingleCompanyReport;
  fullyLoaded: boolean = false;

  constructor(private fb: UntypedFormBuilder,
              private tradingContextService: TradingContextService,
              private placeOrderService: PlaceOrderService,
              private portofolioService: PortofolioService,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<TradingParametersPanelComponent>
  ) {
    this.tradingParameters = {
      currentPrice: 0,
      investedAmount: 0,
      trend: 0,
      todayIncrement: 0,
      weekdayTax: 0,
      weekendTax: 0,
      percentageExposed: 0,
      unitsPaid: 0,
      extraMoneyNeeded: 0,
      stopLossMax: 0,
    }
  }

  ngOnInit(): void {
    this.tradingContextService
      .currentTradingContext()
      .pipe(tap(context => {
        this.availableFunds = context.funds

        this.investedAmount = this.placeOrderService.getInitialInvestedAmount(context.funds);
        this.stopAmount = this.placeOrderService.getMaximumStopLoss(this.investedAmount, this.leverageValue, this.isBuyOrder);
        this.takeProfit = this.investedAmount;

        this.investedStep = this.placeOrderService.getAmountChangeStep(context.funds)
        this.orderDetails.patchValue({
          investedAmount: this.investedAmount,
          stopLoss: this.stopAmount,
          takeProfit: this.takeProfit
        });
      })).subscribe((value) => {
      this.scheduleTradinParametersInterval(value);
    });
  }

  scheduleTradinParametersInterval(context: TradingContextModel): void {
    this.tradingParametersSubscription$ = timer(1, 1000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
              this.portofolioService.gatherBuyOrderTaxesInfo(this.ticker,
                this.leverageValue, this.investedAmount)
                .subscribe((result) => {
                  this.tradingParameters = result;
                  this.fullyLoaded = true;
                }, err => {
                  this.errorMessage = err.error.detail;
                  this.fullyLoaded = true;
                })
      })
  }

  onLeverageChange(value: number) {
    this.leverageValue = value;

    if (this.leverageValue > 1) {

      let stopLoss: number = this.placeOrderService
        .getMaximumStopLoss(this.investedAmount, this.leverageValue, this.isBuyOrder);
      this.orderDetails.patchValue(
        {
          stopLoss: stopLoss,
        })
    }
  }

  changeInvestedAmount(newValue: number) {
    if (newValue <= 0 || newValue >= this.availableFunds) {
      newValue = this.placeOrderService.getInitialInvestedAmount(this.availableFunds)
    }

    this.stopAmount = this.placeOrderService.getMaximumStopLoss(newValue, this.leverageValue, this.isBuyOrder);

    this.investedAmount = newValue;

    this.orderDetails.patchValue(
      {
        investedAmount: this.investedAmount,
        stopLoss: this.stopAmount,
        takeProfit: this.takeProfit
      })
  }


  changeStopLossAmount(value: number) {
    let stopLossMinimum = this.placeOrderService
      .getMinimumStopLoss(this.investedAmount);
    console.log(value);
    console.log(this.investedAmount);
    this.stopAmount = Math.max(stopLossMinimum, value);
    console.log(stopLossMinimum);

    this.orderDetails.patchValue(
      {
        stopLoss: this.stopAmount,
      })
  }

  changeTakeProfitAmount(value: number) {
    let takeProfitMaximum = this.placeOrderService.getMaximumTakeProfit(this.investedAmount, this.isBuyOrder);

    this.takeProfit = Math.min(takeProfitMaximum, value);

    this.orderDetails.patchValue(
      {
        takeProfit: this.takeProfit,
      })
  }

  placeOrder(): void {
    var transactionModel: PlaceOrderRequestModel;

    transactionModel = {
      isBuy: this.isBuyOrder,
      token: this.validityToken,
      ticker: this.ticker,
      leverage: this.leverageValue,
      stopLossAmount: this.stopAmount,
      takeProfitAmount: this.takeProfit,
      investedAmount: this.investedAmount,
    };

    this.portofolioService.PlaceTransactionOrder(transactionModel)
      .subscribe((response) => {

          this._snackBar.open('Order placed successfully!', 'OK');
          this.dialogRef.close();
        },
        err => {
          this.errorMessage = err.error.detail;
          this._snackBar.open(err.error.detail, 'OK');
        });
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
