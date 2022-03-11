import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortofolioDetailedTransactionsBrowserComponent } from './components/portofolio-detailed-transactions-browser/portofolio-detailed-transactions-browser.component';
import { PortofolioTransactionsBrowserComponent } from './components/portofolio-transactions-browser/portofolio-transactions-browser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {LoggedGuard} from "../../core/guard/logged-guard";

const routes: Routes = [
  {
    path: 'portofolio',
    component: PortofolioTransactionsBrowserComponent
  },
  {
    path: 'portofolio/:ticker',
    component: PortofolioDetailedTransactionsBrowserComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
