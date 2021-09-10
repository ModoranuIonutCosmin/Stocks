import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketbrowserComponent } from './components/marketbrowser/marketbrowser.component';
import { StocksDescriptivePageComponent } from './components/stocks-descriptive-page/stocks-descriptive-page.component';

const routes: Routes = [
  { path: 'market', component: MarketbrowserComponent },
  { path: 'summary/:ticker', component: StocksDescriptivePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {

}
