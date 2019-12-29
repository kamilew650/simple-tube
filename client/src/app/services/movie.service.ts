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
    }

    getNew() {
        return this.http
            .get(`${url}/movie/new`)
            .toPromise()
    }

    getNewForUser(userId: string) {
        return this.http
            .get(`${url}/movie/new/${userId}`, { headers: this.getAuthHeader() })
            .toPromise()
    }

    findByWord(word: string) {
        return this.http
            .get(`${url}/movie/find/${word}`, { headers: this.getAuthHeader() })
            .toPromise()
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
        const { title, description, _id } = movie

        return this.http
            .put(`${url}/movie`, { movieInput: { title, description, _id } }, { headers: this.getAuthHeader() })
            .toPromise()
    }

    delete(id: string) {
        return this.http
            .delete(`${url}/movie/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }
}
