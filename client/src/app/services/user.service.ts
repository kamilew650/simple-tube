import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from "ngx-cookie-service"
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoleEnum } from '../models/RoleEnum';
import User from '../models/User';
import { url } from '../congif';



@Injectable()
export class UserService {

  constructor(
    private httpService: CustomHttpService,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  getAuthHeader() {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.loginService.token })
  }

  getUsers() {
    return this.http
      .get(`${url}/user`, { headers: this.getAuthHeader() })
      .toPromise()
      .catch(error => {
        console.error(error)
      })
  }

  getUser(id: number) {
    return this.http
      .get(`${url}/user/${id}`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const user = response
        return user
      })
      .catch(error => {
        console.error(error)
      })
  }

  addUser(user: User) {
    return this.http
      .post(`${url}/user/create`, user, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const user = response
        return user
      })
      .catch(error => {
        console.error(error)
      })
  }

  updateUser(id: number, user: User) {
    return this.http
      .put(`${url}/user/update`, user, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const user = response
        return user
      })
      .catch(error => {
        console.error(error)
      })
  }

  deleteUser(id: number) {
    return this.http
      .delete(`${url}/user/${id}/delete`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const user = response
        return user
      })
      .catch(error => {
        console.error(error)
      })
  }
}