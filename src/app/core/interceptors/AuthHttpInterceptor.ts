import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserService } from "../services/user.service";
import { catchError, map } from "rxjs/operators";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService,
                private snackBar: MatSnackBar,
                private router: Router) {}

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {

      if (this.authenticationService.isAuthenticated()) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authenticationService.gatherToken()}`
          }
        });
      }

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError(
          (
            httpErrorResponse: HttpErrorResponse,
            _: Observable<HttpEvent<any>>
          ) => {
            if (httpErrorResponse.status === 401) {
              this.authenticationService.logoutUser();

              this.router.navigateByUrl('/auth/login');
            }
            return throwError(httpErrorResponse);
          }
        )
      );
    }
  }
