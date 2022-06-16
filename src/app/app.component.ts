import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {PortofolioService} from './core/services/portofolio.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from './core/services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Spinner} from "@angular/cli/utilities/spinner";
import {SpinnerService} from "./core/services/spinner.service";
import { SubscriptionsService } from './core/services/subscription/subscription.service';
import { Subscription } from './modules/dashboard/models/subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading$: BehaviorSubject<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  subscription$!: BehaviorSubject<Subscription>;
  amountRefill: number = 0;
  refillForm: FormGroup = this.fb.group({
    "refill": [0, Validators.required]
  });

  constructor(private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder,
              private portofolioService: PortofolioService,
              public userService: UserService,
              private _snackBar: MatSnackBar,
              public subscriptionService: SubscriptionsService,
              private spinnerService: SpinnerService,
              private router: Router) {
    this.amountRefill = 0;
    this.isLoading$ = spinnerService.isLoading$;
    this.subscription$ = this.subscriptionService.userSubscription;
  }

  refillBalance() {
    this.portofolioService.RefillBalance({
      paymentHandler: "PayPal",
      initialCurrencyTicker: "USD",
      amount: this.amountRefill,
      paymentDate: new Date()
    }).subscribe(response => {
        this._snackBar.open(`Aquired ${response.amountBought} funds.
        Current balance: ${response.currentBalance}`, 'OK', {
          duration: 4000
        });
      },

      err => {
        this._snackBar.open(`Balance refill processing failed! | ${err.error.detail}`, 'OK', {
          duration: 4000
        });
      });

  }


  logout(): void {
    this.userService.logoutUser();
    this.subscriptionService.userSubscription.next(this.subscriptionService.noSubscription())
    this._snackBar.open(`You've logged out successfully`, 'OK', {duration: 1000});
    this.router.navigateByUrl('/');
  }

  refillAmountChanged(newValue: number) {
    this.amountRefill = newValue;
  }
}
