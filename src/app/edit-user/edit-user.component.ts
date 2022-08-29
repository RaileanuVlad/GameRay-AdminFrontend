import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/user.model';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  users: User[] = [];

  @ViewChild('editUserModal') editUserModal: EditUserModalComponent;
  @ViewChild('addUserModal') addUserModal: AddUserModalComponent;
  rank: number;
  searchUser: string;
  

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
    this.getUsers();
  }

 

  getUsers() {
    this.api.getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  deleteUser(id: number, email:string) {
    if(window.confirm("Are you sure you want to delete user "+email+"?")) {
      this.api.deleteUser(id)
      .subscribe(() => {
        this.users = [];
        this.getUsers();
      },
        (error: Error) => {
          console.log('err', error);
        });
    }
    
  }

  addUser(){
    this.addUserModal.show();
  }
  
  showM3(id: number): void {
    this.editUserModal.show(id);
  }


  changeE(event: string) {
    if (event === 'user') {
      this.getUsers();
    }
   

  }

}
