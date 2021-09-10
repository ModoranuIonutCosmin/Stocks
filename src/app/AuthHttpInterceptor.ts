import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { Observable, throwError } from "rxjs";
  import { catchError, map } from "rxjs/operators";
import { UserService } from "./modules/auth/services/user.service";
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
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
              this.authenticationService.redirectToLogin();
            }
            return throwError(httpErrorResponse);
          }
        )
      );
    }
  }