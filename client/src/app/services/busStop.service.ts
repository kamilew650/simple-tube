import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from "ngx-cookie-service"
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoleEnum } from '../models/RoleEnum';
import { url } from '../congif';
import Failure from '../models/Failure';
import BusStop from '../models/BusStop';



@Injectable()
export class BusStopService {

  constructor(
    private httpService: CustomHttpService,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private http: HttpClient
  ) { }


  protected getToken() {
    return this.cookieService.get('te_token')
  }

  getAuthHeader() {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.loginService.token })
  }


  get() {
    return this.http
      .get(`${url}/busstop`)
      .toPromise()
      .then((response) => {
        const vehicles = response
        return vehicles
      })
      .catch(error => {
        console.error(error)
      })
  }


  getOne(id: number) {
    return this.http
      .get(`${url}/busstop/${id}`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const failure = response.json()
        return failure
      })
      .catch(error => {
        console.error(error)
      })
  }

  add(busStop: BusStop) {
    return this.http
      .post(`${url}/busstop/create`, busStop, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const failure = response.json()
        return failure
      })
      .catch(error => {
        console.error(error)
      })
  }

  update(id: number, busStop: BusStop) {
    return this.http
      .put(`${url}/busstop/update`, busStop, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const failure = response.json()
        return failure
      })
      .catch(error => {
        console.error(error)
      })
  }

  delete(id: number) {
    return this.http
      .delete(`${url}/failure/${id}/delete`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const failure = response.json()
        return failure
      })
      .catch(error => {
        console.error(error)
      })
  }
}