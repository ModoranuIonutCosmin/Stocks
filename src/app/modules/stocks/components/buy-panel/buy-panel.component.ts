import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Guid } from 'guid-typescript';
import { Observable, Subscription, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { OrderTaxesPreviewModel } from '../../models/orderPreviewModel';
import { PlaceOrderRequestModel } from '../../models/PlaceOrderRequestModel';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';
import { PortofolioService } from '../../services/portofolio.service';

@Component({
  selector: 'app-buy-panel',
  templateUrl: './buy-panel.component.html',
  styleUrls: ['./buy-panel.component.scss']
})
export class BuyPanelComponent implements OnInit, OnDestroy {

  panelInfoLoaded: boolean = false;
  fullyLoaded: boolean = false;
  validityToken: string;
  isBuy: boolean = true;

  maxAmount: number = 10000000000;

  capital: number;
  displayValue: string;
  leverageValue: string;
  stopLoss: string;
  takeProfit: string;

  stopLossEnabled: boolean = false;

  step: number;
  errorMessage: string;

  tradingParameters!: OrderTaxesPreviewModel;
  feesObs!: Subscription ;
  companyModel!: StockCompanyWidgetModel;

  get ticker() {
    return this.companyModel.ticker;
  }

  constructor(private userService: UserService,
    private portofolioService: PortofolioService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BuyPanelComponent>) { 
    this.capital = 0;
    this.displayValue = "1";
    this.validityToken = Guid.create().toString();

    console.log(this.validityToken);

    this.tradingParameters = {
      currentPrice : 0,
      investedAmount : 0,
      trend : 0,
      todayIncrement : 0,
      weekdayTax : 0,
      weekendTax : 0,
      percentageExposed : 0,
      unitsPaid : 0,
      extraMoneyNeeded : 0,
      stopLossMax : 0,
    }

    this.step = 0;

    this.errorMessage = "";
    this.leverageValue = "1";
    this.stopLoss = "0";
    this.takeProfit = "0";
  }



  ngOnInit(): void {
    this.userService.currentTradingContext()
    .subscribe((context) => {
      this.capital = context.funds
      this.displayValue = (context.funds / 100).toString();
      this.step = (parseFloat(this.displayValue) / 2);
      this.panelInfoLoaded = true;
    });

    // get our data every subsequent 10 seconds
    this.feesObs = timer(1, 1000).pipe(
      filter(() => this.panelInfoLoaded),
      switchMap(() => 
      
      this.portofolioService.GatherBuyOrderTaxes(this.ticker,
        parseFloat(this.leverageValue),  parseFloat(this.displayValue)))
   ).subscribe((result) => {
    this.tradingParameters = result.response;
    this.fullyLoaded = true;
    this.errorMessage = "";
      if(!result.successful){
        this.errorMessage = result.errorMessage;
      }
   });
  }

  placeOrder() : void {
    var transactionModel : PlaceOrderRequestModel;

    transactionModel = {
      isBuy: this.isBuy,
      token: this.validityToken,
      ticker: this.ticker,
      leverage: parseFloat(this.leverageValue),
      stopLossAmount: parseFloat(this.stopLoss),
      takeProfitAmount: parseFloat(this.takeProfit),
      investedAmount: parseFloat(this.displayValue),
    };

    this.portofolioService.PlaceTransactionOrder(transactionModel)
    .subscribe((response) => {

      if(response.successful){
        this._snackBar.open('Order placed successfully!', 'OK');
        this.dialogRef.close();
      } else {
        this._snackBar.open(response.errorMessage, 'OK');
      }
    });
  }

  increaseAmount() : void{

    var newValue : number = (parseFloat(this.displayValue) + this.step);

    if(newValue < 0){
      return;
    }

    this.displayValue = newValue.toString();
  }

  decreaseAmount() : void{
    var newValue : number = (parseFloat(this.displayValue) - this.step);

    if(newValue < 0){
      return;
    }

    var stopLossValue = parseFloat(this.stopLoss);
    this.recalculateStopLossAmount(stopLossValue);
    this.displayValue = newValue.toString();
  }

  increaseStopLossAmount() : void{
    var newValue : number = (parseFloat(this.stopLoss) + 1);

    this.recalculateStopLossAmount(newValue);
  }

  decreaseStopLossAmount() : void{

    var newValue : number = (parseFloat(this.stopLoss) - 1);

    this.recalculateStopLossAmount(newValue);
  }

  increaseTakeProfitAmount() : void{
    var currentAmount = (parseFloat(this.displayValue));
    var newValue = (parseFloat(this.takeProfit) + this.step);

    if(newValue <= 0 || newValue >= this.maxAmount){
      newValue = currentAmount;
    }

   this.takeProfit = newValue.toString();
  }

  decreaseTakeProfitAmount() : void{

    var newValue : number = (parseFloat(this.takeProfit) - this.step);

    if(newValue < 0){
      return;
    }

    this.takeProfit = newValue.toString();
  }

  amountChanged(event: any): void{

    var newValue = parseFloat(event.target.value);
    var stopLossValue = parseFloat(this.stopLoss);

    event.preventDefault();

    this.displayValue = !isNaN(newValue) ? this.displayValue : "1";

    newValue = !isNaN(newValue) ? newValue : 1;

    console.log(newValue);

    if(newValue <= 0 || newValue >= this.maxAmount){
       newValue = this.step;
    }

    this.recalculateStopLossAmount(stopLossValue);
  }

  stopLossChanged(event: any): void{
    
    var newValue = parseFloat(this.stopLoss);

    this.recalculateStopLossAmount(newValue);
  }


  takeProfitChanged(event: Event){
    var newValue = parseFloat(this.takeProfit);
    var currentAmount = (parseFloat(this.displayValue));

    newValue = !isNaN(newValue) ? newValue : this.maxAmount;

    if(newValue <= 0 || newValue >= this.maxAmount){
       newValue = currentAmount;
    }

    this.takeProfit = newValue.toString();
  }

  onLeverageChange(leverage : string): void{
    console.log(`leverage is ${leverage}`);

    if(parseInt(leverage) > 1){

      this.stopLossEnabled = true;
      var stopLossValue = parseFloat(this.stopLoss);
      this.leverageValue = leverage;

      this.recalculateStopLossAmount(stopLossValue);
    }
  }

  recalculateStopLossAmount(userPreference: number): void{
    var currentAmount = (parseFloat(this.displayValue));
    var leverage = parseFloat(this.leverageValue);
    userPreference = !isNaN(userPreference) ? userPreference : 1;
    var finalValue = userPreference;
    

    if(!this.stopLossEnabled){
      return;
    }

    if(userPreference <= 0){

      if(leverage <= 1){
        finalValue = 1;
      } else {
        finalValue = currentAmount / 2;
      }
    }

    if(userPreference > currentAmount){
      finalValue = currentAmount;
    }

    if(leverage > 1 && userPreference > currentAmount / 2){
      //snackbar aici
      finalValue = currentAmount / 2;
    }

    this.stopLoss = (finalValue).toString();
  }

  enableStopLoss(): void{
    this.stopLossEnabled = true;
    this.stopLoss = this.displayValue;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    this.feesObs.unsubscribe();
  }

}
