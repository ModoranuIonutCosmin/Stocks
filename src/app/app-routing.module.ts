import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guard/logged-guard';

const routes: Routes = [
  {
    path: 'stocks', loadChildren: () => import('./modules/stocks/stocks.module')
  .then(m => m.StocksModule),
  canActivate: [LoggedGuard]
  },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module')
  .then(m => m.AuthModule),
  },
  {
    path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module')
  .then(m => m.DashboardModule),
  canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
