import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AplicationErrorHandle extends ErrorHandler {
    constructor(private injector:Injector) {
        super();
    }
    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {            
            const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
            if (errorResponse.status == 400 && error.error[0] == 'token_expired') {
                this.goToLogin();
            }
        }
        super.handleError(errorResponse);
    }

    goToLogin() {
        localStorage.clear();
        const router = this.injector.get(Router);
        router.navigate(['/login']);
    }
}