import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;
  hidePassword: boolean = true;
  returnUrl: string;

  constructor(private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.registerForm = formBuilder.group({
      userName: formBuilder.control('', [Validators.required]),
      firstName: formBuilder.control('', [Validators.required]),
      lastName: formBuilder.control('', [Validators.required]),
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [Validators.required]),
      passwordAgain: formBuilder.control('', [Validators.required])
    }, {
      validator: this.ConfirmedValidator('password', 'passwordAgain')
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
  }

  ngOnInit(): void {
  }

  public submit(e: Event): void {
    if (!this.registerForm.valid) {
      return;
    }

    this.userService.registerUser(this.registerForm.value)
      .subscribe(response => {
        this.displaySnackbar("Registration successful!");
        this.router.navigateByUrl(this.returnUrl);
        }, err => {
          this.displaySnackbar(err.error.detail);
        });
  }

  public displaySnackbar(message: string ='') {
    this.snackBar.open(`${message}.`, "OK");
  }

  public ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: UntypedFormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
