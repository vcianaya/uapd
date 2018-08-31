import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogginService } from '../authenticate/loggin.service';

@Injectable()
export class AfterLoginGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean>{        
        if (this.logginService.isValid()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

    constructor(private logginService: LogginService, private router: Router){

    }
}
