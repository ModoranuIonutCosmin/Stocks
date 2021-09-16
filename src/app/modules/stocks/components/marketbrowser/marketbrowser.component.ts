import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRow } from '@angular/material/table';
import { Router } from '@angular/router';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';
import { StocksDataService } from '../../services/stocks-data.service';
import { BuyPanelComponent } from '../buy-panel/buy-panel.component';
import { SellPanelComponent } from '../sell-panel/sell-panel.component';

@Component({
  selector: 'app-marketbrowser',
  templateUrl: './marketbrowser.component.html',
  styleUrls: ['./marketbrowser.component.scss']
})
export class MarketbrowserComponent implements OnInit {

  StockMarketList: Array<StockCompanyWidgetModel>;
  displayedColumns: string[] = ['Market', 'Trend', 'Sell', 'Buy', 'Options'];

  constructor(private dataService : StocksDataService,
    public dialog: MatDialog,
    private router: Router) {
    this.StockMarketList = new Array<StockCompanyWidgetModel>();
  }

  ngOnInit(): void {
    this.dataService.GatherAllCompaniesShortData()
    .subscribe(res => {
      this.StockMarketList = res;
    });
  }


  public handleSell(widgetModel: StockCompanyWidgetModel) : void{
    console.log(`Selling for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(SellPanelComponent);

    
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
}
