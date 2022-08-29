import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Category } from '../shared/category.model';
import { Developer } from '../shared/developer.model';
import { Admin } from '../shared/admin.model';
import { EditAdminModalComponent } from './edit-admin-modal/edit-admin-modal.component';
import { AddAdminModalComponent } from './add-admin-modal/add-admin-modal.component';
import { AuthService } from 'app/shared/auth.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})

export class EditAdminComponent implements OnInit {
  admins: Admin[] = [];


  @ViewChild('editAdminModal') editAdminModal: EditAdminModalComponent;
  @ViewChild('addAdminModal') addAdminModal: AddAdminModalComponent;
  rank: number;
  searchAdmin: string;

  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.currentAdminValue)
    {
      this.rank = this.authService.currentAdminValue.state;
    }
    else
    {
      this.rank = 0;
    }
    this.getAdmins();
  }



  getAdmins() {
    this.api.getAdmins()
      .subscribe((data: Admin[]) => {
        this.admins = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  deleteAdmin(id: number, email: string) {
    if (window.confirm("Are you sure want to delete admin " + email + "?")) {
      this.api.deleteAdmin(id)
        .subscribe(() => {
          this.getAdmins();
        },
          (error: Error) => {
            console.log('err', error);
          });
    }
  }

  addAdmin() {
    this.addAdminModal.show();
  }

  showM5(id: number): void {
    this.editAdminModal.show(id);
  }

  changeE(event: string) {
    if (event === 'admin') {
      this.getAdmins();
    }

  }

}
