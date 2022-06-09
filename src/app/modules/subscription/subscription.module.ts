import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionTiersComponent } from './components/subscription-tiers/subscription-tiers.component';
import { SubscriptionsService } from 'src/app/core/services/subscription/subscription.service';
import { SuccessfulSubscriptionComponent } from './page/successful-subscription/successful-subscription.component';
import { FailedSubscriptionComponent } from './page/failed-subscription/failed-subscription.component';


@NgModule({
  declarations: [
    SubscriptionTiersComponent,
    SuccessfulSubscriptionComponent,
    FailedSubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule
  ],
  providers: [
    SubscriptionsService
  ]
})
export class SubscriptionModule { }
