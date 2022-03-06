import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { environment } from 'src/environments/environment';
import { ForgotPasswordRequestModel } from '../../modules/stocks/models/ForgotPasswordRequest';
import { ResetPasswordRequestModel } from '../../modules/stocks/models/ResetPasswordRequestModel';
import { TradingContextModel } from '../../modules/stocks/models/trading-context-model';
import { LoginResponseModel } from '../../modules/auth/models/login-response-model';
import { LoginModel } from '../../modules/auth/models/LoginModel';
import { RegisterRequestModel } from '../../modules/auth/models/register-request-model copy';

@Injectable()
export class UserService {
  tokenKey : string = "token";
  currentToken: string;
  currentUser!: LoginResponseModel;

  constructor(private httpClient: HttpClient,
   private router: Router) {
     this.currentToken = '';
     if(this.isAuthenticated()){
       this.currentToken = localStorage.getItem(this.tokenKey) || '';
     }
  }

  isAuthenticated() : boolean
  {
    var token : string | null = localStorage.getItem(this.tokenKey);

    if(token == null || token == ''){
      return false;
    }

    return true;
  }

  gatherToken() : string
  {
    var token : string | null = localStorage.getItem(this.tokenKey);

    return token || '';
  }

  loginUser(loginDetails: LoginModel): Observable<LoginResponseModel>{
    return this.httpClient.post<LoginResponseModel>(environment.baseUrl +
      ApiPaths.AuthLogin,
      loginDetails).pipe(map(result =>{

          this.currentUser = result;
          console.log(result);
          localStorage.setItem('token', result.token);

        return result;
      }));
  }

  logoutUser(): void{
    localStorage.removeItem('token');
  }


  registerUser(registerDetails: LoginModel): Observable<RegisterRequestModel>{
    return this.httpClient.post<RegisterRequestModel>(environment.baseUrl +
      ApiPaths.AuthRegister, registerDetails);
  }

  confirmEmail(email: string, token: string) {
    return this.httpClient
      .post<ApiResponse<string>>(`${environment.baseUrl}${ApiPaths.ConfirmEmailPost}`,
        {
          email: email,
          token: token
        })
  }

  forgotPassword(request: ForgotPasswordRequestModel): Observable<ApiResponse<string>>{
    return this.httpClient.post<ApiResponse<string>>
    (`${environment.baseUrl}${ApiPaths.ForgotPasswordPost}`,
      request
    );
  }

  resetPassword(request: ResetPasswordRequestModel): Observable<ApiResponse<string>>{
    return this.httpClient.put<ApiResponse<string>>
    (`${environment.baseUrl}${ApiPaths.ResetPasswordPost}`,
      request
    );
  }


}
