import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserService } from "./modules/auth/services/user.service";
import { catchError, map } from "rxjs/operators";
  
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService) {}
  
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
              this.authenticationService.redirectToLogin();
            }
            return throwError(httpErrorResponse);
          }
        )
      );
    }
  }