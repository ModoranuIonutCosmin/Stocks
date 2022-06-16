import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';
import { UserService } from '../../../../core/services/user.service';
import { SubscriptionsService } from 'src/app/core/services/subscription/subscription.service';

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
    private subscriptionService: SubscriptionsService,
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

        this.subscriptionService.loadSubscription();

        this.router.navigateByUrl(this.registerStruct.registerUrl);
      },
        err => {
          this.displaySnackBar(err.error.detail);
        });
  }

  public displaySnackBar(message:string ='') {
    this.snackBar.open(`${message}.`, "OK",
    {
      duration: 10000
    });
  }

}
