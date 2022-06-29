import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionDetails } from '../../models/subscription-details';
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-subscription-tiers',
  templateUrl: './subscription-tiers.component.html',
  styleUrls: ['./subscription-tiers.component.scss']
})
export class SubscriptionTiersComponent implements OnInit {

  @Input() price_id: string = "price_1L7jXpJlzqump2BG2YKxh3Y0";

  subcriptionInfo!: SubscriptionDetails

  constructor(private subscriptionsService: UserService) {

  }

  ngOnInit(): void {
    this.subcriptionInfo = this.subscriptionsService.getProSubscriptionDetails()
  }

  onCheckoutPressed () {

    console.log('pressed');
    this.subscriptionsService
        .requestSubscriptionTier(this.subcriptionInfo.priceId)
  }

}
