import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Admin } from '../../shared/admin.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-admin-modal',
  templateUrl: './edit-admin-modal.component.html',
  styleUrls: ['./edit-admin-modal.component.css']
})
export class EditAdminModalComponent {
  @ViewChild('editAdminModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editAdminForm: FormGroup;
  currentAdmin = new Admin();
  editInvalid = false;
  editMessage: Error;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(id: number): void {
    this.editInvalid = false;
    this.modal.show();
    this.api.getAdmin(id)
      .subscribe((data: Admin) => {
        this.currentAdmin = data;
        this.currentAdmin.id = id;
        this.initializeForm(this.currentAdmin);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeForm(currentAdmin: Admin) {
    this.editAdminForm = this.fb.group({
      email: [currentAdmin.email, [Validators.required, Validators.email]],
      password: [null],
      rpassword: [null],
      first: [currentAdmin.first, Validators.required],
      last: [currentAdmin.last, Validators.required],
      birth: [currentAdmin.birth, Validators.required],
      phone: [currentAdmin.phone, Validators.required],
      state: [currentAdmin.state, Validators.required]
    });
  }

  editAdmin() {
    this.editInvalid = false;
    const editedAdmin = new Admin({
      id: this.currentAdmin.id,
      email: this.editAdminForm.value.email,
      password: this.editAdminForm.value.password,
      first: this.editAdminForm.value.first,
      last: this.editAdminForm.value.last,
      birth: this.editAdminForm.value.birth,
      phone: this.editAdminForm.value.phone,
      state: Number(this.editAdminForm.value.state)
    });

    this.api.editAdmin(editedAdmin)
      .subscribe(() => {
        this.change.emit('admin');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
          this.editMessage = error;
          this.editInvalid = true;
        });
  }


}
