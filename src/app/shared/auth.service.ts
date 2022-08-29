import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../shared/api.service';
import { Admin } from '../shared/admin.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentAdminSubject: BehaviorSubject<Admin>;
    public currentAdmin: Observable<Admin>;

    constructor(private http: HttpClient, private api: ApiService) {
        this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentGRAdmin')));
        this.currentAdmin = this.currentAdminSubject.asObservable();
    }

    public get currentAdminValue(): Admin {
        return this.currentAdminSubject.value;
    }

    public getAdmin(): Observable<Admin | null> {
        return this.currentAdmin;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.api.baseUrl}/admin/authenticate`, { email, password })
            .pipe(map(admin => {
                localStorage.setItem('currentGRAdmin', JSON.stringify(admin));
                this.currentAdminSubject.next(admin);
                location.reload();
                return admin;
            }));
    }

    logout() {
        localStorage.removeItem('currentGRAdmin');
        this.currentAdminSubject.next(null);
        location.reload();
    }
}