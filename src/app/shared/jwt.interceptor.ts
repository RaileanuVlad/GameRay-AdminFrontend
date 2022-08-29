import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentAdmin = this.authService.currentAdminValue;
        if (currentAdmin && currentAdmin.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentAdmin.token}`
                }
            });
        }

        return next.handle(request);
    }
}