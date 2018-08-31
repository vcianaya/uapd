import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { GLOBAL } from "../services/global";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = GLOBAL.url.split('/');
        const token = atob(localStorage.getItem('token'));
        if (localStorage.getItem('token') && (requestUrl[2] = apiUrl[2])) {
            const newRequest = request.clone({ setHeaders: {'Authorization':`Bearer ${token}`} });
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}