import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { LoginService } from '../services/login.service';
import UserModel from '../models/UserModel';
import { Router, ActivatedRoute } from '@angular/router';
import { isError } from 'util';
import { RoleEnum } from '../models/RoleEnum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login: string
  password: string
  isError: boolean = false

  constructor(
    private loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.clean
  }

  clean() {
    this.login = null
    this.password = null
  }


  tryLogin() {
    this.loginService.login(this.login, this.password).then(res => {
      const user = res as unknown as UserModel
      console.log(user)
      switch (user.role) {
        case 0:
          this.router.navigateByUrl('/driver');
          break
        case 1:
          this.router.navigateByUrl('/setter');
          break
        case 2:
          this.router.navigateByUrl('/manager');
          break
        case 3:
          this.router.navigateByUrl('/planner');
          break
        case 4:
          this.router.navigateByUrl('/admin');
          break
        default:
          this.isError = true

      }
    })
      .catch(err => {
        console.error(err)
      })
  }

}
