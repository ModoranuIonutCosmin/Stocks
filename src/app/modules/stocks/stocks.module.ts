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
import { UserService } from '../auth/services/user.service';
import { AuthModule } from '../auth/auth.module';
import { LoggedGuard } from 'src/app/AuthGuards/logged-guard';
import { SellPanelComponent } from './components/sell-panel/sell-panel.component';
import { BuyPanelComponent } from './components/buy-panel/buy-panel.component';
import { PortofolioService } from './services/portofolio.service';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    StockSummaryItemComponent,
    MarketbrowserComponent,
    StocksDescriptivePageComponent,
    HistoricalDataInfoAndGraphComponent,
    ForecastDataInfoAndGraphComponent,
    SellPanelComponent,
    BuyPanelComponent,
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    MaterialModule,
    HighchartsChartModule,
    FormsModule,
    DirectivesModule
  ],
  providers: [StocksDataService, LoggedGuard, UserService, PortofolioService]
})
export class StocksModule { }
