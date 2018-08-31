import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogginService } from '../authenticate/loggin.service';

@Injectable()
export class BeforeLoginGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // return !this.logginService.isValid();
        if (!this.logginService.isValid()) {
            // this.router.navigate(['login']);
            console.log('Redirigir Login');
            
            return true;
        }
        this.router.navigate(['list-beneficiarios']);
        console.log('Redirigir listado');
        return false;
    }

    constructor(private logginService: LogginService, private router: Router) {

    }
}
