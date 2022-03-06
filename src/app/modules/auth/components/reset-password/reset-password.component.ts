import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordRequestModel } from 'src/app/modules/stocks/models/ResetPasswordRequestModel';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword: FormGroup;
  actionSuccess: boolean = false;
  errorMessage: string = '';
  hidePassword: boolean = true;
  email: string;
  token: string;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.resetPassword = formBuilder.group({
      password: formBuilder.control('', [Validators.required]),
      confirmPassword: formBuilder.control('', [Validators.required]),
    },
    {
      validator: this.PasswordMatchValidator('password', 'confirmPassword')
    });

    this.email = this.activatedRoute.snapshot.queryParams['email'] || '';
    this.token = this.activatedRoute.snapshot.queryParams['token'] || '';

  }

  ngOnInit(): void {
  }

  public submit(e: Event): void {
    if (!this.resetPassword.valid) {
      return;
    }

    var formValue = this.resetPassword.value;
    var resetPasswordRequest: ResetPasswordRequestModel;

    resetPasswordRequest = {
      email: this.email,
      token: this.token,
      newPassword: formValue.password
    }

    this.userService.resetPassword(resetPasswordRequest)
    .subscribe(response => {
        this.actionSuccess = true;
        this.snackBar.open('Password changed. You can log in using the new password', 'OK');
        this.router.navigateByUrl('/');
      }, err => {
        this.snackBar.open(err.error, 'OK', {duration: 5000});
      });
  }

  PasswordMatchValidator(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordMatchValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

}
