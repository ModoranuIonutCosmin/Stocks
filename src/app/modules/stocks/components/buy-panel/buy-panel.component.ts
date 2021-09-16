import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { OrderTaxesPreviewModel } from '../../models/orderPreviewModel';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';
import { PortofolioService } from '../../services/portofolio.service';

@Component({
  selector: 'app-buy-panel',
  templateUrl: './buy-panel.component.html',
  styleUrls: ['./buy-panel.component.scss']
})
export class BuyPanelComponent implements OnInit {

  capital: number;
  displayValue: number;
  leverageValue: string;
  stopLoss: number;
  takeProfit: number;

  step: number;
  errorMessage: string;

  tradingParameters!: OrderTaxesPreviewModel;
  feesObs!: Subscription ;

  companyModel!: StockCompanyWidgetModel;

  get ticker() {
    return this.companyModel.ticker;
  }

  constructor(private userService: UserService,
    private portofolioService: PortofolioService) { 
    this.capital = 0;
    this.displayValue = 0;

    this.step = 0;

    this.errorMessage = "";
    this.leverageValue = "1";
    this.stopLoss = 0;
    this.takeProfit = 0;
  }



  ngOnInit(): void {
    this.userService.currentTradingContext()
    .subscribe((context) => {
      this.capital = context.funds
      this.displayValue = context.funds / 100
      this.step = this.displayValue / 2;

       // get our data every subsequent 10 seconds
       this.feesObs = timer(1, 2000).pipe(
        switchMap(() => this.portofolioService.GatherBuyOrderTaxes(this.ticker,
          Number.parseFloat(this.leverageValue), this.displayValue))
     ).subscribe((result) => {

        if(result.successful){
          this.tradingParameters = result.response;
        } else {
          this.errorMessage = result.errorMessage;
        }
     });
    });
       

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    this.feesObs.unsubscribe();
  }

}
