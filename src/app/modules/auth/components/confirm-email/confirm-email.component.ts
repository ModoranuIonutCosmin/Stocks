import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  email: string = ''
  token: string = ''
  confirmationSuccess: boolean = false
  errorMessage: string

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.email = this.activatedRoute.snapshot.queryParams['email'] || '';
    this.token = this.activatedRoute.snapshot.queryParams['token'] || '';

    this.errorMessage = ''

  }

  ngOnInit(): void {
    if (this.email == '' || this.token == '') {
      this.confirmationSuccess = false
      this.errorMessage = 'Invalid confirmation email.'
      return;
    }

    this.userService
      .confirmEmail(this.email, this.token)
      .subscribe(response => {
          this.confirmationSuccess = true
        },
        err => {
          this.confirmationSuccess = false
          this.errorMessage = err.error.detail
        })
  }

}
