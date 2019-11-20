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
    if (this.loginService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }
  }


  tryLogin() {
    if (this.password.localeCompare(this.confirmPassword) !== 0) {
      this.isError = true;
      return
    }

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
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        this.isError = true;
      });
  }

}
