import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from "ngx-cookie-service"
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoleEnum } from '../models/RoleEnum';
import { url } from '../congif';
import Vehicle from '../models/Vehicle';



@Injectable()
export class VehicleService {

  constructor(
    private httpService: CustomHttpService,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private http: HttpClient
  ) { }


  protected getToken() {
    return this.loginService.token
  }

  getAuthHeader() {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.loginService.token })
  }

  get() {
    return this.http
      .get(`${url}/vehicle`)
      .toPromise()
      .then((response) => {
        const vehicles = response
        console.log(vehicles)
        return vehicles
      })
      .catch(error => {
        console.error(error)
      })
  }

  getOne(id: number) {
    return this.http
      .get(`${url}/vehicle/${id}`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response) => {
        const vehicle = response
        return vehicle
      })
      .catch(error => {
        console.error(error)
      })
  }

  add(vehicle: Vehicle) {
    return this.http
      .post(`${url}/vehicle/create`, vehicle, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response) => {
        const vehicle = response
        return vehicle
      })
      .catch(error => {
        console.error(error)
      })
  }

  update(id: number, vehicle: Vehicle) {
    return this.http
      .put(`${url}/vehicle/update`, vehicle, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response) => {
        const vehicle = response
        return vehicle
      })
      .catch(error => {
        console.error(error)
      })
  }

  delete(id: number) {
    return this.http
      .delete(`${url}/vehicle/${id}/delete`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response) => {
        const vehicle = response
        return vehicle
      })
      .catch(error => {
        console.error(error)
      })
  }
}