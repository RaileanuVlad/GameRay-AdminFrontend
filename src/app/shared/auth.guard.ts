import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAdmin = this.authService.currentAdminValue;
        if (currentAdmin) {
            return true;
        }

        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}