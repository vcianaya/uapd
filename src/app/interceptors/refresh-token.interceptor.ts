import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GLOBAL } from '../services/global';
import { LogginService } from '../authenticate/loggin.service';
import { AuthService } from '../authenticate/auth.service';
import { Router } from '@angular/router';



@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    constructor(private logginService: LogginService, private authService: AuthService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401 && err.error.error == 'token_expired') {
                    this.logginService.refreshToken().subscribe(response=>{
                        localStorage.setItem('token', btoa(response.token));
                        this.authService.changeAuthStatus(true);
                        console.log(response);
                        const cloneRequest = request.clone({ setHeaders: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + response.token } });
                        return next.handle(cloneRequest);
                    },error=>{
                        console.log("Error de login");
                    })
                }
                // if (err.status === 500) {
                //     this.logginService.logout().subscribe(response => {
                //         this.authService.changeAuthStatus(false);
                //         localStorage.clear();
                //         this.router.navigate(['login']);
                //     })
                // }
                const error = err.error;
            return throwError(error);
            })
        )
    }
}