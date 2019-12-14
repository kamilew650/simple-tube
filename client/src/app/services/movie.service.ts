import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from 'ngx-cookie-service'
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { url } from '../congif';
import Movie from '../models/Movie';
import MovieForm from '../models/MovieForm';



@Injectable()
export class MovieService {

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
            .get(`${url}/movie`)
            .toPromise()
            .then((response) => {
                const movies = response
                return movies
            })
            .catch(error => {
                console.error(error)
            })
    }


    getOne(id: string) {
        return this.http
            .get(`${url}/movie/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }

    add(movie: MovieForm) {
        const { file, ...movieInput } = movie
        console.log(file)
        const formData: FormData = new FormData();
        formData.append('file', file)
        formData.append('movieInput', JSON.stringify(movieInput))

        return this.http
            .post(`${url}/movie`, formData, { headers: this.getAuthHeader() })
            .toPromise()
    }

    update(movie: Movie) {
        return this.http
            .put(`${url}/movie`, movie, { headers: this.getAuthHeader() })
            .toPromise()
            .then((response: Response) => {
                const movie = response.json()
                return movie
            })
            .catch(error => {
                console.error(error)
            })
    }

    delete(id: string) {
        return this.http
            .delete(`${url}/movie/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }
}
