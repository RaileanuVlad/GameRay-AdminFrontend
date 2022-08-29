import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth.service';
import { Admin } from 'app/shared/admin.model';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentAdmin: Admin;

  @ViewChild('loginModal') loginModal: LoginModalComponent;
  rank: number;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentAdmin.subscribe(x => this.currentAdmin = x);
  }

  ngOnInit() {
    if (this.authService.currentAdminValue) {
      this.rank = this.authService.currentAdminValue.state;
    }
    else {
      this.rank = 0;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  openLogin() {
    this.loginModal.show();
  }

}


