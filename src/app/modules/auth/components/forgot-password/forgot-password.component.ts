import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordRequestModel } from 'src/app/modules/stocks/models/ForgotPasswordRequest';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  hidePassword: boolean = true;
  actionSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {

    this.forgotPassword = formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email])
    })

  }

  ngOnInit(): void {
  }

  public submit(e: Event): void {
    if (!this.forgotPassword.valid) {
      return;
    }

    var forgotPasswordRequest : ForgotPasswordRequestModel = this.forgotPassword.value;

    this.userService.forgotPassword(forgotPasswordRequest)
    .subscribe(response => {
      if(response.successful){
        this.actionSuccess = true;
        this.snackBar.open('Password reset link sent. Check your email adress for further instructions', 'OK');
      } else {
        this.errorMessage = response.errorMessage;
        this.snackBar.open(this.errorMessage, 'OK', {duration: 2000});
      }
    });

  }

  
}
