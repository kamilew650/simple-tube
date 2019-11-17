import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { LoginService } from '../services/login.service';
import UserModel from '../models/UserModel';
import { Router, ActivatedRoute } from '@angular/router';
import { isError } from 'util';
import { RoleEnum } from '../models/RoleEnum';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  isError = false;

  constructor(
    private loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clean();
  }

  clean() {
    this.login = null;
    this.password = null;
  }

  tryLogin() {
    this.loginService
      .login(this.login, this.password)
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
