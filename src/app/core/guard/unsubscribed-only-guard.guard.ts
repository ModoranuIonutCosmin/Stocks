import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SubscriptionsService } from '../services/subscription/subscription.service';

@Injectable()
export class UnsubscribedOnlyGuard implements CanActivate {


  constructor(private subscriptionsService: SubscriptionsService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    return this.subscriptionsService.userSubscription
    .pipe(
      map((subs) => subs == null || subs.status != 'active')
      )
      ;
      
  }
  
}
