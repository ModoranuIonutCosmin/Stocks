import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../modules/auth/services/user.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.userService.isAuthenticated()){
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }

  }
  
}
