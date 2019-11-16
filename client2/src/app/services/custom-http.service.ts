import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class CustomHttpService {

    constructor(private http: HttpClient) { }

    get(url: string, token?: string, options?: any): Observable<any> {
        options = options || this.createRequestOptionsArgs(token)
        return this.http.get(url, options)
    }

    post(url: string, body: any, token?: string, options?: any): Observable<any> {
        options = options || this.createRequestOptionsArgs(token)
        return this.http.post(url, body, options)
    }

    put(url: string, body: any, token?: string, options?: any): Observable<any> {
        options = options || this.createRequestOptionsArgs(token)
        return this.http.put(url, body, options)
    }

    delete(url: string, token?: string, options?: any): Observable<any> {
        options = options || this.createRequestOptionsArgs(token)
        return this.http.delete(url, options)
    }

    private createRequestOptionsArgs(token?: string, withCredentials: boolean = true) {
        const headers = this.createHeaders(token)

        return { headers: headers, withCredentials: withCredentials } as any
    }

    private createHeaders(token?: string) {
        const headers = new Headers()

        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        if (token) {
            headers.append('Authorization', 'Bearer ' + token)
        }

        return headers
    }
}