import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRow } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';
import { StocksDataService } from '../../services/stocks-data.service';
import { BuyPanelComponent } from '../buy-panel/buy-panel.component';
import { SellPanelComponent } from '../sell-panel/sell-panel.component';

@Component({
  selector: 'app-marketbrowser',
  templateUrl: './marketbrowser.component.html',
  styleUrls: ['./marketbrowser.component.scss']
})
export class MarketbrowserComponent implements OnInit, OnDestroy {

  StockMarketList: Array<StockCompanyWidgetModel>;
  displayedColumns: string[] = ['Market', 'Trend', 'Sell', 'Buy', 'Options'];

  gatherMarketData!: Subscription;

  constructor(private dataService : StocksDataService,
    public dialog: MatDialog,
    private router: Router) {
    this.StockMarketList = new Array<StockCompanyWidgetModel>();
  }

  ngOnInit(): void {

    this.gatherMarketData = timer(1, 60000).pipe(
      switchMap(() => 
      
      this.dataService.GatherAllCompaniesShortData())
   ).subscribe((result) => {
    this.StockMarketList = result;
   });
  }


  public handleSell(widgetModel: StockCompanyWidgetModel) : void{
    console.log(`Selling for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(SellPanelComponent);

    dialogRef.componentInstance.companyModel = widgetModel;
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public handleBuy(widgetModel: StockCompanyWidgetModel) : void{
    console.log(`Buying for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(BuyPanelComponent);

    dialogRef.componentInstance.companyModel = widgetModel;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public navigatToCompanyPage(tickerData: StockCompanyWidgetModel){
    this.router.navigate(['/stocks/summary', tickerData.ticker]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gatherMarketData.unsubscribe();
  }
}
