import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userService.isAuthenticated()){
        return true;
      } else {
        this.snackBar.open('You need to be logged in in order to access this page!', 'OK', {
          duration: 8000
        })
        this.router.navigate(['/auth/login']);
        return false;
      }

  }

}
