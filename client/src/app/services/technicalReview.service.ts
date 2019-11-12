import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from "ngx-cookie-service"
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoleEnum } from '../models/RoleEnum';
import { url } from '../congif';
import TechnicalReview from '../models/TechnicalReview';



@Injectable()
export class TechnicalReviewService {

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
      .get(`${url}/technicalReview`)
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
      .get(`${url}/technicalReviews/${id}`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const review = response.json()
        return review
      })
      .catch(error => {
        console.error(error)
      })
  }

  add(review: TechnicalReview) {
    return this.http
      .post(`${url}/technicalReview`, review, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const review = response.json()
        return review
      })
      .catch(error => {
        console.error(error)
      })
  }

  update(id: number, review: TechnicalReview) {
    return this.http
      .put(`${url}/technicalReview/update`, review, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const review = response.json()
        return review
      })
      .catch(error => {
        console.error(error)
      })
  }

  delete(id: number) {
    return this.http
      .delete(`${url}/technicalReviews/${id}`, { headers: this.getAuthHeader() })
      .toPromise()
      .then((response: Response) => {
        const review = response.json()
        return review
      })
      .catch(error => {
        console.error(error)
      })
  }
}