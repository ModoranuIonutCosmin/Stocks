import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from 'src/app/core/services/subscription/subscription.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-successful-subscription',
  templateUrl: './successful-subscription.component.html',
  styleUrls: ['./successful-subscription.component.scss']
})
export class SuccessfulSubscriptionComponent implements OnInit {

  constructor(private subscriptionService: SubscriptionsService) { }

  ngOnInit(): void {
    this.subscriptionService.checkRemoteSubcription()
  }

}
