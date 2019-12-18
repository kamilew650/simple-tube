import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpService } from './custom-http.service';
import { CookieService } from 'ngx-cookie-service'
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { url } from '../congif';
import Movie from '../models/Movie';
import MovieForm from '../models/MovieForm';
import CommentForm from '../models/CommentForm';
import Comment from '../models/Comment';



@Injectable()
export class CommentService {

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


    get(movieId) {
        return this.http
            .get(`${url}/comment`, { params: { movieId } })
            .toPromise()
    }


    getOne(id: string) {
        return this.http
            .get(`${url}/comment/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }

    add(commentForm: CommentForm) {
        return this.http
            .post(`${url}/comment`, { commentInput: { ...commentForm } }, { headers: this.getAuthHeader() })
            .toPromise()
    }

    update(comment: Comment) {

        return this.http
            .put(`${url}/comment`, {
                commentInput: { movieId: comment.movie, content: comment.content, _id: comment._id }
            }, { headers: this.getAuthHeader() })
            .toPromise()
    }

    delete(id: string) {
        return this.http
            .delete(`${url}/comment/${id}`, { headers: this.getAuthHeader() })
            .toPromise()
    }
}
