import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StocksRoutingModule} from './stocks-routing.module';
import {StockSummaryItemComponent} from './components/stock-summary-item/stock-summary-item.component';
import {MaterialModule} from '../material/material.module';
import {MarketbrowserComponent} from './components/marketbrowser/marketbrowser.component';
import {StocksDataService} from '../../core/services/stocks-data.service';
import {UserService} from '../../core/services/user.service';
import {LoggedGuard} from 'src/app/core/guard/logged-guard';
import {PortofolioService} from '../../core/services/portofolio.service';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';
import {SharedModule} from "../shared/shared.module";
import {ResearchPageComponent} from './pages/research-page/research-page.component';
import { StockschartComponent } from './components/stockschart/stockschart.component';

@NgModule({
  declarations: [
    StockSummaryItemComponent,
    MarketbrowserComponent,
    ResearchPageComponent,
    StockschartComponent,
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    MaterialModule,
    FormsModule,
    DirectivesModule,
    SharedModule,
  ],
  providers: [StocksDataService, LoggedGuard, UserService, PortofolioService]
})
export class StocksModule {
}
