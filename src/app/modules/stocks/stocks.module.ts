import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StockSummaryItemComponent } from './components/stock-summary-item/stock-summary-item.component';
import { MaterialModule } from '../material/material.module';
import { MarketbrowserComponent } from './components/marketbrowser/marketbrowser.component';
import { StocksDataService } from './services/stocks-data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    StockSummaryItemComponent,
    MarketbrowserComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [StocksDataService]
})
export class StocksModule { }
