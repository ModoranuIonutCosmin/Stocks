import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guard/logged-guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule)
  },
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
  },
  {
    path: 'news', loadChildren: () => import('./modules/news/news.module')
      .then(m => m.NewsModule)
  },
  {
    path: 'membership', loadChildren: () => import('./modules/subscription/subscription.module')
      .then(m => m.SubscriptionModule),
      canActivate: [LoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
