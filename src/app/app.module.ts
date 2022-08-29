import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './header/login-modal/login-modal.component';
import { SearchPipe } from './shared/search.pipe';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditDeveloperComponent } from './edit-developer/edit-developer.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { EditGameModalComponent } from './edit-game/edit-game-modal/edit-game-modal.component';
import { EditAdminModalComponent } from './edit-admin/edit-admin-modal/edit-admin-modal.component';
import { EditUserModalComponent } from './edit-user/edit-user-modal/edit-user-modal.component';
import { EditCategoryModalComponent } from './edit-category/edit-category-modal/edit-category-modal.component';
import { EditDeveloperModalComponent } from './edit-developer/edit-developer-modal/edit-developer-modal.component';
import { AddAdminModalComponent } from './edit-admin/add-admin-modal/add-admin-modal.component';
import { AddUserModalComponent } from './edit-user/add-user-modal/add-user-modal.component';
import { AddCategoryModalComponent } from './edit-category/add-category-modal/add-category-modal.component';
import { AddDeveloperModalComponent } from './edit-developer/add-developer-modal/add-developer-modal.component';
import { AddGameModalComponent } from './edit-game/add-game-modal/add-game-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ErrorInterceptor } from './shared/error.interceptor';
import { EditSaleComponent } from './edit-sale/edit-sale.component';
import { EditSaleModalComponent } from './edit-sale/edit-sale-modal/edit-sale-modal.component';
import { AddSaleModalComponent } from './edit-sale/add-sale-modal/add-sale-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginModalComponent,
    EditAdminComponent,
    AddAdminModalComponent,
    EditAdminModalComponent,
    EditSaleComponent,
    EditSaleModalComponent,
    AddSaleModalComponent,
    EditUserComponent,
    AddUserModalComponent,
    EditUserModalComponent,
    EditCategoryComponent,
    AddCategoryModalComponent,
    EditCategoryModalComponent,
    EditDeveloperComponent,
    AddDeveloperModalComponent,
    EditDeveloperModalComponent,
    EditGameComponent,
    AddGameModalComponent,
    EditGameModalComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
