import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { url } from '../congif';
import Movie from '../models/Movie';



@Injectable()
export class UserService {

    constructor(
        private cookieService: CookieService,
        private loginService: LoginService,
        private http: HttpClient
    ) { }


    protected getToken() {
        return this.cookieService.get('te_token')
    }

    getAuthHeader() {
        return new HttpHeaders({ Authorization: 'Bearer ' + this.loginService.token })
    }


    get() {
        return this.http
            .get(`${url}/user`, { headers: this.getAuthHeader() })
            .toPromise()
    }


    getOne(id: string) {
        return this.http
            .get(`${url}/user/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }

    activeAccount(activeToken: string) {
        return this.http
            .post(`${url}/user/activeAccount`, { token: activeToken })
            .toPromise()
    }

    delete(id: string) {
        return this.http
            .delete(`${url}/user/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }
}
