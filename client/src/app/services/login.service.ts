import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from 'ngx-cookie-service';
import { url } from '../congif';
import { HttpClient } from '@angular/common/http';
import RegistrationModel from '../models/RegistrationModel';

@Injectable()
export class LoginService {
  loggedUserData;
  user;
  private tokenValue: string;

  get token() {
    if (this.tokenValue) {
      return this.tokenValue;
    } else {
      const token = this.cookieService.get('access_token');
      if (token) {
        this.tokenValue = token;
        return token;
      }
      return null;
    }
  }

  get isLoggedIn() {
    return this.token ? true : false;
  }

  get loggedUser() {
    if (this.loggedUserData) {
      return this.loggedUserData
    } else {
      const userString = this.cookieService.get('logged_user')
      if (userString) {
        const user = JSON.parse(userString)
        if (user) {
          this.user = user;
          return user;
        }
      }
      return null;
    }
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  protected getToken() {
    return this.cookieService.get('access_token');
  }

  protected getLoggedUser() {
    return this.cookieService.get('logged_user');
  }

  login(login: string, password: string) {
    return this.http
      .post(`${url}/user/login`, { loginInput: { email: login, password } })
      .toPromise()
      .then(model => {
        console.log(model);
        this.user = model;
        this.tokenValue = (model as any).access_token;
        this.cookieService.set('access_token', this.tokenValue);
        this.cookieService.set('logged_user', JSON.stringify(this.user))
        return model;
      });
  }

  registration(registrationModel: RegistrationModel) {
    return this.http
      .post(`${url}/user/registration`, { userInput: registrationModel })
      .toPromise()
      .then(model => {
        return model;
      });
  }

  logout() {
    this.loggedUserData = null
    this.user = null;
    this.tokenValue = null;
    this.cookieService.deleteAll();
  }
}
