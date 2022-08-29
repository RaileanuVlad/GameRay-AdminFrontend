import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { User } from '../../shared/user.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {
  
  @ViewChild('editUserModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editUserForm: FormGroup;
  currentUser = new User();
  editInvalid = false;
  editMessage: Error;


  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(id: number): void {
    this.editInvalid = false;
    this.modal.show();
    this.api.getUser(id)
      .subscribe((data: User) => {
        this.currentUser = data;
        this.currentUser.id = id;
        this.initializeForm(this.currentUser);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeForm(currentUser: User) {
    this.editUserForm = this.fb.group({
      email: [currentUser.email, [Validators.required, Validators.email]],
      password: [null],
      rpassword: [null],
      state: [currentUser.state, Validators.required],
    });
  }

  editUser() {
    this.editInvalid = false;
    const editedUser = new User({
      id: this.currentUser.id,
      email: this.editUserForm.value.email,
      password: this.editUserForm.value.password,
      state: Number(this.editUserForm.value.state),
    });

    this.api.editUser(editedUser)
      .subscribe(() => {
        this.change.emit('user');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
          this.editMessage = error;
          this.editInvalid = true;
        });
  }


}
