import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string
  phone: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  birthDate: Date
  isError = false


  constructor(private loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
  }


  tryLogin() {
    if (this.password.localeCompare(this.confirmPassword) !== 0) {
      this.isError = true;
      return
    }

    console.log(typeof this.birthDate)

    this.loginService
      .registration({
        phone: this.phone,
        password: this.password,
        birthDate: new Date(this.birthDate).toISOString(),
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      })
      .then(res => {
        const user = res as any;
        console.log(user);
        switch (user.role) {
          case 0:
            this.router.navigateByUrl('/driver');
            break;
          case 1:
            this.router.navigateByUrl('/setter');
            break;

          default:
            this.isError = true;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

}
