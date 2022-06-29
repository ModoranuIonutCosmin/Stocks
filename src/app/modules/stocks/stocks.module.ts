import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StocksRoutingModule} from './stocks-routing.module';
import {MaterialModule} from '../material/material.module';
import {MarketbrowserComponent} from './components/marketbrowser/marketbrowser.component';
import {StocksDataService} from '../../core/services/stocks-data.service';
import {LoggedGuard} from 'src/app/core/guard/logged-guard';
import {PortofolioService} from '../../core/services/portofolio.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';
import {SharedModule} from "../shared/shared.module";
import {ResearchPageComponent} from './pages/research-page/research-page.component';
import { StockschartComponent } from './components/stockschart/stockschart.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StocksPredictionsLineGraphComponent } from './components/stocks-predictions-line-graph/stocks-predictions-line-graph.component';
import { TradeSuggestComponent } from './components/trade-suggest/trade-suggest.component';
import { TradeSuggestionsSelectorComponent } from './components/trade-suggestions-selector/trade-suggestions-selector.component';
import { PredictionsAnalysisComponent } from './components/predictions-analysis/predictions-analysis.component';
import { TradeSuggestionsService } from 'src/app/core/services/trade_suggestions/trade-suggestions.service';
import { ConfirmTradeDialogComponent } from './components/marketbrowser/confirm-trade-dialog/confirm-trade-dialog.component';

@NgModule({
  declarations: [
    MarketbrowserComponent,
    ResearchPageComponent,
    StockschartComponent,
    CompanyInfoComponent,
    StocksPredictionsLineGraphComponent,
    TradeSuggestComponent,
    TradeSuggestionsSelectorComponent,
    PredictionsAnalysisComponent,
    ConfirmTradeDialogComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    MaterialModule,
    FormsModule,
    DirectivesModule,
    SharedModule,
    NgApexchartsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [StocksDataService, LoggedGuard, PortofolioService, TradeSuggestionsService]
})
export class StocksModule {
}
