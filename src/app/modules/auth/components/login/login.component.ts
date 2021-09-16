import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword: boolean = true;
  returnUrl: string;
  registerStruct: {registerUrl: string};

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = formBuilder.group({
      userNameOrEmail: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required]),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.registerStruct = {
      registerUrl: this.returnUrl
    }

  }

  ngOnInit(): void {
  }

  public submit(e: Event): void {
    if (!this.loginForm.valid) {
      return;
    }
    var loginFormData : LoginModel = this.loginForm.value;

    this.userService.loginUser(loginFormData)
      .subscribe(response => {
        if (response.successful) {
          this.router.navigateByUrl(this.registerStruct.registerUrl);
        } else {
          this.displayErrorSnackBar(response.errorMessage);
          console.log(response.errorMessage);
        }
      })
  }

  public displayErrorSnackBar(errorMessage:string ='') {
    this.snackBar.open(`Login failed. ${errorMessage}.`, "OK",
    {
      duration: 10000
    });
  }

}
