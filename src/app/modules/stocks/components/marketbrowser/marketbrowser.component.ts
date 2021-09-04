import { Component, OnInit } from '@angular/core';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';
import { StocksDataService } from '../../services/stocks-data.service';

@Component({
  selector: 'app-marketbrowser',
  templateUrl: './marketbrowser.component.html',
  styleUrls: ['./marketbrowser.component.scss']
})
export class MarketbrowserComponent implements OnInit {

  StockMarketList: Array<StockCompanyWidgetModel>;

  constructor(private dataService : StocksDataService) {
    this.StockMarketList = new Array<StockCompanyWidgetModel>();
  }

  ngOnInit(): void {
    this.dataService.GatherAllCompaniesShortData()
    .subscribe(res => {
      this.StockMarketList = res;
    });
  }

}
