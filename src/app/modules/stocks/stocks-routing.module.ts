import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketbrowserComponent } from './components/marketbrowser/marketbrowser.component';
import { ResearchPageComponent} from './pages/research-page/research-page.component'

const routes: Routes = [
  { path: 'market', component: MarketbrowserComponent},
  { path: 'summary/:ticker', component: ResearchPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {

}
