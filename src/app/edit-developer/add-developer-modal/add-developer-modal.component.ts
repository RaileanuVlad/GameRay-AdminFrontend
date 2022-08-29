import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-developer-modal',
  templateUrl: './add-developer-modal.component.html',
  styleUrls: ['./add-developer-modal.component.css']
})
export class AddDeveloperModalComponent {
  @ViewChild('addDeveloperModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  addDeveloperForm: FormGroup;
  success: boolean;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(): void {
    this.modal.show();
    this.initializeForm();

  }

  initializeForm() {
    this.addDeveloperForm = this.fb.group({
      name: [null, Validators.required],
      website: [null, Validators.required],
      country: [null, Validators.required]
    });
  }

  addDeveloper() {

    this.api.addDeveloper(this.addDeveloperForm.value).subscribe(() => {

      this.addDeveloperForm.reset();
      this.success = true;
      this.change.emit('developer');
      this.modal.hide();
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log('err', error);
        this.addDeveloperForm.reset();
        this.success = false;
        this.modal.hide();
        window.alert("Something went wrong!");
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }
}
