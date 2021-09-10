import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksRoutingModule } from './stocks-routing.module';
import { StockSummaryItemComponent } from './components/stock-summary-item/stock-summary-item.component';
import { MaterialModule } from '../material/material.module';
import { MarketbrowserComponent } from './components/marketbrowser/marketbrowser.component';
import { StocksDataService } from './services/stocks-data.service';
import { HttpClientModule } from '@angular/common/http';
import { StocksDescriptivePageComponent } from './components/stocks-descriptive-page/stocks-descriptive-page.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HistoricalDataInfoAndGraphComponent } from './components/historical-data-info-and-graph/historical-data-info-and-graph.component';
import { ForecastDataInfoAndGraphComponent } from './components/forecast-data-info-and-graph/forecast-data-info-and-graph.component';

@NgModule({
  declarations: [
    StockSummaryItemComponent,
    MarketbrowserComponent,
    StocksDescriptivePageComponent,
    HistoricalDataInfoAndGraphComponent,
    ForecastDataInfoAndGraphComponent,
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    MaterialModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [StocksDataService]
})
export class StocksModule { }
