import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})
export class AddCategoryModalComponent{
  @ViewChild('addCategoryModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  addCategoryForm: FormGroup;
  success: boolean;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(): void {
    this.modal.show();
    this.initializeForm();

  }

  initializeForm() {
    this.addCategoryForm = this.fb.group({
      name: [null, Validators.required]
    });
  }

  addCategory() {

    this.api.addCategory(this.addCategoryForm.value).subscribe(() => {

      this.addCategoryForm.reset();
      this.success = true;
      this.change.emit('category');
      this.modal.hide();
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log('err', error);
        this.addCategoryForm.reset();
        this.success = false;
        this.modal.hide();
        window.alert("Something went wrong!");
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }
}
