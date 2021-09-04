import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketbrowserComponent } from './components/marketbrowser/marketbrowser.component';

const routes: Routes = [
  { path: 'market', component: MarketbrowserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {

}
