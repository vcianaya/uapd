import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from '../services/global';
import { Router } from '@angular/router';
@Injectable()
export class LogginService {
    url: string;
    constructor(private http: HttpClient, private router: Router) {
        this.url = GLOBAL.url;
    }

    login(credentials): Observable<any> {
        let params = JSON.stringify(credentials);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        // .set('Authorization', "Bearer "+this.getToken());
        return this.http.post(this.url + 'auth/login', params, { headers: headers });
    }

    logout(): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', "Bearer " + this.getToken());
        return this.http.get(this.url + 'auth/logout', { headers: headers });
    }
    refreshToken(): Observable<any> {        
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', "Bearer " + this.getToken());
        return this.http.post(`${this.url}auth/refresh`, { headers: headers });
    }
    
    setToken(data){
        localStorage.setItem('token', btoa(data.token));
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
    }

    getToken(){        
        return localStorage.getItem('token') ? atob(localStorage.getItem('token')) : false;
    }
    getUser() {
        return JSON.parse(atob(localStorage.getItem('user')));
    }

    isValid(){
        const token = this.getToken();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return payload.iss === `${this.url}auth/login` || payload.iss === `${this.url}auth/refresh` ? true : false;
            }
        }
        return false
    }

    payload(token){
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload){
        return JSON.parse(atob(payload));
    }
}