import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionsService } from 'src/app/core/services/subscription/subscription.service';
import { SubscriptionDetails } from '../../models/subscription-details';

@Component({
  selector: 'app-subscription-tiers',
  templateUrl: './subscription-tiers.component.html',
  styleUrls: ['./subscription-tiers.component.scss']
})
export class SubscriptionTiersComponent implements OnInit {

  @Input() price_id: string = "price_1L7jXpJlzqump2BG2YKxh3Y0";

  subcriptionInfo!: SubscriptionDetails

  constructor(private subscriptionsService: SubscriptionsService) {

  }

  ngOnInit(): void {
    this.subcriptionInfo = this.subscriptionsService.getProSubscriptionDetails()
  }

  onCheckoutPressed () {
    this.subscriptionsService
        .requestSubscriptionTier(this.subcriptionInfo.priceId)
  }

}
