import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthBastion implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAdmin = this.authService.currentAdminValue;
        if (currentAdmin) {
            if (currentAdmin.state > 1) {
                return true;
            }
            else
            {
                this.router.navigate(['/editgames'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        }

        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}