import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable,} from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { environment } from 'src/environments/environment';
import { ForgotPasswordRequestModel } from '../../modules/stocks/models/ForgotPasswordRequest';
import { ResetPasswordRequestModel } from '../../modules/stocks/models/ResetPasswordRequestModel';
import { LoginResponseModel } from '../../modules/auth/models/login-response-model';
import { LoginModel } from '../../modules/auth/models/LoginModel';
import { RegisterRequestModel } from '../../modules/auth/models/register-request-model copy';
import {ProfilePrivateData} from "../../modules/dashboard/models/profile-private-data";
import { Subscription } from 'src/app/modules/dashboard/models/subscription';
import {SubscriptionDetails} from "../../modules/subscription/models/subscription-details";
import {CreateCheckoutSessionRequest} from "../../modules/subscription/models/checkout-session";
import {CreateCheckoutSessionResponse} from "../../modules/subscription/models/CreateCheckoutSessionResponse";
import {
  CreateCustomerPortalSessionResponse
} from "../../modules/subscription/models/create-customer-portal-session-response";


declare const Stripe: any;

@Injectable({
  providedIn: "root"
})
export class UserService {

  tokenKey : string = "token";
  currentToken: string;
  currentUser!: LoginResponseModel;

  constructor(private httpClient: HttpClient) {
     this.currentToken = '';
     if(this.isAuthenticated()){
       this.currentToken = localStorage.getItem(this.tokenKey) || '';
     }

    this.loadSubscription();

  }

  isAuthenticated() : boolean
  {
    var token : string | null = localStorage.getItem(this.tokenKey);

    if(token == null || token == ''){
      return false;
    }

    return true;
  }

  gatherToken() : string
  {
    var token : string | null = localStorage.getItem(this.tokenKey);

    return token || '';
  }

  loginUser(loginDetails: LoginModel): Observable<LoginResponseModel>{
    return this.httpClient.post<LoginResponseModel>(environment.baseUrl +
      ApiPaths.AuthLogin,
      loginDetails).pipe(map(result =>{

          this.currentUser = result;
          console.log(result);
          localStorage.setItem('token', result.token);
          this.updateSubscription(result.subscription);
          result
        return result;
      }));
  }

  updateSubscription(subscription: Subscription): void {
    localStorage.setItem('subscription', JSON.stringify(subscription));
    this.userSubscription.next(subscription);
  }

  logoutUser(): void{
    localStorage.removeItem('token');
    localStorage.removeItem("subscription");
    this.userSubscription.next(this.noSubscription())
  }


  registerUser(registerDetails: LoginModel): Observable<RegisterRequestModel>{
    return this.httpClient.post<RegisterRequestModel>(environment.baseUrl +
      ApiPaths.AuthRegister, registerDetails);
  }

  confirmEmail(email: string, token: string) {
    return this.httpClient
      .post<ApiResponse<string>>(`${environment.baseUrl}${ApiPaths.ConfirmEmailPost}`,
        {
          email: email,
          token: token
        })
  }

  forgotPassword(request: ForgotPasswordRequestModel): Observable<ApiResponse<string>>{
    return this.httpClient.post<ApiResponse<string>>
    (`${environment.baseUrl}${ApiPaths.ForgotPasswordPost}`,
      request
    );
  }

  resetPassword(request: ResetPasswordRequestModel): Observable<ApiResponse<string>>{
    return this.httpClient.put<ApiResponse<string>>
    (`${environment.baseUrl}${ApiPaths.ResetPasswordPost}`,
      request
    );
  }

  gatherProfileInfo(): Observable<ProfilePrivateData> {
    return this.httpClient.get<ProfilePrivateData>(`${environment.baseUrl}${ApiPaths.ProfileDataGet}`)
  }


  //subscriptii

  public userSubscription: BehaviorSubject<Subscription> =
    new BehaviorSubject<Subscription>({
      customerId: '',
      id: '',
      periodEnd: new Date(),
      periodStart: new Date(),
      status: 'default',
      type: 9999,
    });

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
