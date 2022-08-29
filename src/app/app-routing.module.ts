import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditDeveloperComponent } from './edit-developer/edit-developer.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthShield } from './shared/auth.shield';
import { AuthBastion } from './shared/auth.bastion';
import { EditSaleComponent } from './edit-sale/edit-sale.component';

const routes: Routes = [
  { path: '', redirectTo: 'editgame'},
  { path: 'home', component: HomeComponent},
  { path: 'editgame', component: EditGameComponent, canActivate: [AuthGuard]},
  { path: 'editadmin', component: EditAdminComponent, canActivate: [AuthBastion]},
  { path: 'editsale', component: EditSaleComponent, canActivate: [AuthBastion]},
  { path: 'edituser', component: EditUserComponent, canActivate: [AuthShield]},
  { path: 'editcategory', component: EditCategoryComponent, canActivate: [AuthGuard]},
  { path: 'editdeveloper', component: EditDeveloperComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'editgame'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
