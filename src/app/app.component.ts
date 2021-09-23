import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PortofolioService } from './modules/stocks/services/portofolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './modules/auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  amountRefill!: number;

constructor(private breakpointObserver: BreakpointObserver,
  private portofolioService: PortofolioService,
  public userService: UserService,
  private _snackBar: MatSnackBar,
  private router: Router) {
    this.amountRefill = 0;
  }

  refillBalance(){
    this.portofolioService.RefillBalance({paymentHandler: "PayPal",
    initialCurrencyTicker: "USD",
    amount: this.amountRefill,
   paymentDate: new Date()}).subscribe(response => {
     if(response.successful){
        this._snackBar.open(`Aquired ${response.response.amountBought} funds. 
        Current balance: ${response.response.currentBalance}`, 'OK', {
          duration: 4000
        });
     } else {
      this._snackBar.open(`Balance refill processing failed! | ${response.errorMessage}`, 'OK', {
        duration: 4000
      });
     }
   });

  }


  logout(): void{
    this.userService.logoutUser();
    this._snackBar.open(`You've logged out successfully`, 'OK', {duration: 1000});
    this.router.navigateByUrl('/');
  }
}
