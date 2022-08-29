import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Developer } from '../../shared/Developer.model';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-edit-developer-modal',
  templateUrl: './edit-developer-modal.component.html',
  styleUrls: ['./edit-developer-modal.component.css']
})
export class EditDeveloperModalComponent {
  @ViewChild('editDeveloperModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editDeveloperForm: FormGroup;
  currentDeveloper = new Developer();

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(id: number): void {
    this.modal.show();
    this.api.getDeveloper(id)
      .subscribe((data: Developer) => {
        this.currentDeveloper = data;
        this.initializeForm(this.currentDeveloper);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeForm(currentDeveloper: Developer) {
    this.editDeveloperForm = this.fb.group({
      name: [currentDeveloper.name, Validators.required],
      website: [currentDeveloper.website, Validators.required],
      country: [currentDeveloper.country, Validators.required],
    });
  }

  editDeveloper() {
    const editedDeveloper = new Developer({
      id: this.currentDeveloper.id,
      name: this.editDeveloperForm.value.name,
      website: this.editDeveloperForm.value.website,
      country: this.editDeveloperForm.value.country,
    });

    this.api.editDeveloper(editedDeveloper)
      .subscribe(() => {
        this.change.emit('developer');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

}



