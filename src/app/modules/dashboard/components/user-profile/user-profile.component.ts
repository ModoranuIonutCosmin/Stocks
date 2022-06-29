import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpinnerService} from "../../../../core/services/spinner.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  capital: number = 0;
  forgotPasswordTriggered = false;

  userProfileData = this.fb.group({
    userName: [""],
    lastName: [""],
    firstName: [""],
    email: [""],
  })

  isLoading$: BehaviorSubject<boolean>;
  constructor(private fb: UntypedFormBuilder,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private spinnerService: SpinnerService) {
    this.isLoading$ = spinnerService.isLoading$;
  }

  ngOnInit(): void {
    this.spinnerService.setLoading(true);
    this.userService.gatherProfileInfo()
      .subscribe(userInfo => {
        this.spinnerService.setLoading(false)
        this.userProfileData.patchValue(userInfo)
        this.capital = userInfo.capital
      })
  }

  changePassword() {
    var userEmail: string = this.userProfileData.controls['email'].value;
    if (userEmail != '') {
      this.userService.forgotPassword({
        email: userEmail
      })
        .subscribe(result => {
          this.forgotPasswordTriggered = true;
          this.snackBar.open('Password reset requested. Please check your email for next steps!',
            'OK', {
            duration: 5000
            })
        })
    }

  }
}
