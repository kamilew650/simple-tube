import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from "ngx-cookie-service"
import { url } from '../congif';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class LoginService {

  loggedUser
  user
  private tokenValue: string

  get token() {
    if (this.tokenValue)
      return this.tokenValue
    else {
      let token = this.cookieService.get('pc_token')
      if (token) {
        this.tokenValue = token
        return token
      }
      return null
    }
  }

  get isLoggedIn() {
    return this.token ? true : false
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) { }


  protected getToken() {
    return this.cookieService.get('te_token')
  }

  login(login: string, password: string) {
    return this.http
      .post(`${url}/user/authenticate`, { login: login, password: password })
      .toPromise().then(model => {
        console.log(model)
        this.user = model
        this.tokenValue = (model as any).token
        this.cookieService.set('pc_token', this.tokenValue)
        return model
      })
  }

  logout() {
    this.user = null
    this.tokenValue = null
    this.cookieService.deleteAll()
  }
}