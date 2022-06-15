import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionTiersComponent } from './components/subscription-tiers/subscription-tiers.component';
import { SuccessfulSubscriptionComponent } from './page/successful-subscription/successful-subscription.component';
import { FailedSubscriptionComponent } from './page/failed-subscription/failed-subscription.component';
import { MaterialModule } from '../material/material.module';
import { UnsubscribedOnlyGuard } from 'src/app/core/guard/unsubscribed-only-guard.guard';


@NgModule({
  declarations: [
    SubscriptionTiersComponent,
    SuccessfulSubscriptionComponent,
    FailedSubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    MaterialModule
  ],
  providers: [
    UnsubscribedOnlyGuard,
  ]
})
export class SubscriptionModule { }
