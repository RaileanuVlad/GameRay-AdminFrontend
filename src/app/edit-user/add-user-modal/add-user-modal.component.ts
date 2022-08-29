import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent{
  @ViewChild('addUserModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  addUserForm: FormGroup;
  registerInvalid = false;
  registerMessage: Error;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(): void {
    this.registerInvalid = false;
    this.modal.show();
    this.initializeForm();
  }
  
  initializeForm() {
    this.addUserForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rpassword: [null, Validators.required],
      state: [0, Validators.required],
    });
  }

  addUser() {
    this.registerInvalid = false;
    this.addUserForm.value.state = Number(this.addUserForm.value.state)
    this.api.addUser(this.addUserForm.value).subscribe(() => {
      this.change.emit('user');
      this.modal.hide();
    },
      (error: Error) => {
        console.log('err', error)
        this.registerMessage = error;
        this.registerInvalid = true;
      });

  }
}
