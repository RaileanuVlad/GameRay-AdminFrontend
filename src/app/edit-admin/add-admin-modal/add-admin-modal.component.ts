import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.css']
})
export class AddAdminModalComponent{
  @ViewChild('addAdminModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  addAdminForm: FormGroup;
  registerInvalid = false;
  registerMessage: Error;

  constructor(private fb: FormBuilder, private api: ApiService) { }


  show(): void {
    this.registerInvalid = false;
    this.modal.show();
    this.initializeForm();

  }

  initializeForm() {
    this.addAdminForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rpassword: [null, Validators.required],
      first: [null, Validators.required],
      last: [null, Validators.required],
      birth: [null, Validators.required],
      phone: [null, Validators.required],
      state: [0, Validators.required],
    });
  }

  addAdmin() {
    
    this.registerInvalid = false;
    this.addAdminForm.value.state = Number(this.addAdminForm.value.state)
    this.api.addAdmin(this.addAdminForm.value).subscribe(() => {
      this.change.emit('admin');
      this.modal.hide();
    },
      (error: Error) => {
        console.log('err', error);
        this.registerMessage = error;
        this.registerInvalid = true;
      });

  }
}
