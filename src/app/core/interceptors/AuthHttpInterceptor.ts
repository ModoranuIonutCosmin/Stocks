import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserService } from "../services/user.service";
import { catchError, map } from "rxjs/operators";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: "root"})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector,
                private snackBar: MatSnackBar,
                private router: Router) {}

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {

      try {
        var userService: UserService = this.injector.get(UserService)

        if (userService.isAuthenticated()) {
          request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userService.gatherToken()}`
            }
          });
        }
      } catch {

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
              userService?.logoutUser();
              this.router.navigateByUrl('/auth/login');
            }
            return throwError(httpErrorResponse);
          }
        )
      );
    }
  }
