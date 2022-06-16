import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/app/api-paths';
import { CreateCheckoutSessionRequest } from 'src/app/modules/subscription/models/checkout-session';
import { CreateCheckoutSessionResponse } from 'src/app/modules/subscription/models/CreateCheckoutSessionResponse';
import { SubscriptionDetails } from 'src/app/modules/subscription/models/subscription-details';
import { Subscription } from 'src/app/modules/dashboard/models/subscription';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfilePrivateData } from 'src/app/modules/dashboard/models/profile-private-data';
import { CreateCustomerPortalSessionResponse } from 'src/app/modules/subscription/models/create-customer-portal-session-response';

declare const Stripe: any;

@Injectable({ providedIn: 'root' })
export class SubscriptionsService {
  public userSubscription: BehaviorSubject<Subscription> =
    new BehaviorSubject<Subscription>({
      customerId: '',
      id: '',
      periodEnd: new Date(),
      periodStart: new Date(),
      status: 'default',
      type: 9999,
    });


  constructor(private httpClient: HttpClient) {
    this.loadSubscription();
  }

  getProSubscriptionDetails(): SubscriptionDetails {
    return {
      id: 'prod_LpOK3pVNunrxSL',
      priceId: 'price_1L7jXpJlzqump2BG2YKxh3Y0',
      name: 'Stocks Researcher PRO',
      price: '2.00 €',
    };
  }

  loadSubscription(): void {
    var subscription = localStorage.getItem('subscription');

    if (subscription == null) {
      this.checkRemoteSubcription();

      return;
    }

    this.userSubscription.next(JSON.parse(subscription));
  }

  updateSubscription(subscription: Subscription): void {
    localStorage.setItem('subscription', JSON.stringify(subscription));
    this.userSubscription.next(subscription);
  }

  public requestSubscriptionTier(priceId: string): void {
    var openCheckoutSessionRequest: CreateCheckoutSessionRequest = {
      priceId,
      frontEndFailureUrl: environment.paymentFailureURL,
      frontEndSuccesUrl: environment.paymentSuccessURL,
    };

    this.httpClient
      .post<CreateCheckoutSessionResponse>(
        environment.baseUrl + ApiPaths.StripeCreateCheckoutSession,
        openCheckoutSessionRequest
      )
      .subscribe((res) => {
        this.redirectToCheckout(res.sessionId, res.publicKey);
      });
  }

  public redirectToCheckout(sessionId: string, publicKey: string) {
    const stripe = Stripe(publicKey);

    stripe.redirectToCheckout({ sessionId });
  }

  public redirectToSubscriptionManagement(): void {
    this.httpClient.post<CreateCustomerPortalSessionResponse>(
      environment.baseUrl + ApiPaths.StripeCreateCustomerPortalSession,
      {}
    ).subscribe((session) => {
      console.log(session.url)
      window.location.href = session.url
    })
  }

  checkRemoteSubcription(): void {
    this.httpClient
      .get<ProfilePrivateData>(
        `${environment.baseUrl}${ApiPaths.ProfileDataGet}`
      )
      .subscribe((profile) => {
        this.updateSubscription(profile.subscription);
      });
  }

  noSubscription(): any {
    return {
      customerId: '',
      id: '',
      periodEnd: new Date(),
      periodStart: new Date(),
      status: 'default',
      type: 9999,
    }
  }
}
