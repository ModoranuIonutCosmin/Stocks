import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/general/models/api-response';
import { environment } from 'src/environments/environment';
import { LoginResponseModel } from '../models/login-response-model';
import { LoginModel } from '../models/LoginModel';
import { RegisterRequestModel } from '../models/register-request-model copy';

@Injectable()
export class UserService {
  tokenKey : string = "token";
  currentUser!: LoginResponseModel;

  constructor(private httpClient: HttpClient,
   private router: Router) { 
  }

  isAuthenticated() : boolean
  {
    var token : string | null = localStorage.getItem(this.tokenKey) ;

    if(token == null || token == ''){
      return false;
    }

    return true;
  }

  loginUser(loginDetails: LoginModel): Observable<ApiResponse<LoginResponseModel>>{
    return this.httpClient.post<ApiResponse<LoginResponseModel>>(environment.baseUrl +
      ApiPaths.AuthLogin,
      loginDetails).pipe(map(result =>{

        if(result.response != null){
          this.currentUser = result.response;
          localStorage.setItem('token', result.response.token);
        }

        return result;
      }));
  }

  logoutUser(): void{
    localStorage.removeItem('token');
  }


  registerUser(registerDetails: LoginModel): Observable<ApiResponse<RegisterRequestModel>>{
    return this.httpClient.post<ApiResponse<RegisterRequestModel>>(environment.baseUrl +
      ApiPaths.AuthRegister,
      registerDetails);
  }

  redirectToLogin() : void {
    this.router.navigateByUrl('/auth/login');
  }
}
