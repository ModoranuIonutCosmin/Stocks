import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsubscribedOnlyGuard } from 'src/app/core/guard/unsubscribed-only-guard.guard';
import { SubscriptionTiersComponent } from './components/subscription-tiers/subscription-tiers.component';
import { FailedSubscriptionComponent } from './page/failed-subscription/failed-subscription.component';
import { SuccessfulSubscriptionComponent } from './page/successful-subscription/successful-subscription.component';

const routes: Routes = [{
  path: 'aquire', component: SubscriptionTiersComponent,
  canActivate: [UnsubscribedOnlyGuard]
},
{
  path: 'success', component: SuccessfulSubscriptionComponent
},
{
  path: 'failure', component: FailedSubscriptionComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
