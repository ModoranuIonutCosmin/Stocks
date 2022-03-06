import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';
import { StocksDataService } from '../../../../core/services/stocks-data.service';
import {
  TradingParametersPanelComponent
} from "../../../../shared/components/trading-parameters-panel/trading-parameters-panel.component";

@Component({
  selector: 'app-marketbrowser',
  templateUrl: './marketbrowser.component.html',
  styleUrls: ['./marketbrowser.component.scss']
})
export class MarketbrowserComponent implements OnInit, OnDestroy {

  stockMarketList: Array<StockCompanyWidgetModel>;
  displayedColumns: string[] = ['Market', 'Trend', 'Sell', 'Buy', 'Options'];

  gatherMarketData!: Subscription;

  constructor(private dataService : StocksDataService,
    public dialog: MatDialog,
    private router: Router) {
    this.stockMarketList = new Array<StockCompanyWidgetModel>();
  }

  ngOnInit(): void {

    this.gatherMarketData = timer(1, 60000).pipe(
      switchMap(() =>

      this.dataService.GatherAllCompaniesShortData())
   ).subscribe((result) => {
    this.stockMarketList = result;
   });
  }


  public handleSell(widgetModel: StockCompanyWidgetModel) : void{
    console.log(`Selling for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(TradingParametersPanelComponent);

    dialogRef.componentInstance.companyModel = widgetModel;
    dialogRef.componentInstance.isBuyOrder = false;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public handleBuy(widgetModel: StockCompanyWidgetModel) : void{
    console.log(`Buying for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(TradingParametersPanelComponent);

    dialogRef.componentInstance.companyModel = widgetModel;
    dialogRef.componentInstance.isBuyOrder = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public navigateToCompanyPage(tickerData: StockCompanyWidgetModel){
    this.router.navigate(['/stocks/summary', tickerData.ticker]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gatherMarketData.unsubscribe();
  }
}
