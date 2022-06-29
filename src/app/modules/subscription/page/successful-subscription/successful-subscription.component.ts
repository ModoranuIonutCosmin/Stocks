import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-successful-subscription',
  templateUrl: './successful-subscription.component.html',
  styleUrls: ['./successful-subscription.component.scss']
})
export class SuccessfulSubscriptionComponent implements OnInit {

  constructor(private subscriptionService: UserService) { }

  ngOnInit(): void {
    this.subscriptionService.checkRemoteSubcription()
  }

}
