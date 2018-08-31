import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogginService } from './loggin.service';
@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(this.logginService.isValid());
    authStatus = this.loggedIn.asObservable();
    constructor(private logginService: LogginService){

    }
    changeAuthStatus(value: boolean){
        this.loggedIn.next(value);
    }
}