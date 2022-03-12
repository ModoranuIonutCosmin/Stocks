import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NavigationEnd, Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ServerDownInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(result => {
        }, (error: HttpErrorResponse) => {
          console.log("err:" + JSON.stringify(error));

          let errorMsg = '';
          if (error.status == 0) {
            this.snackBar.open('API Server is down at the moment, try again later!', 'OK', {
              duration: 10000
            })
          }

          return throwError(errorMsg);
        })
      )
  }
}
