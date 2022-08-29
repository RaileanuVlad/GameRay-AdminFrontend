import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../shared/category.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.css']
})
export class EditCategoryModalComponent {
  @ViewChild('editCategoryModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editCategoryForm: FormGroup;
  currentCategory = new Category();

  constructor(private fb: FormBuilder, private api: ApiService) {}

  show(id: number): void {

    this.modal.show();
    this.api.getCategory(id)
      .subscribe((data: Category) => {
        this.currentCategory = data;
        this.initializeForm(this.currentCategory);
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  initializeForm(currentCategory: Category) {
    this.editCategoryForm = this.fb.group({
      name: [currentCategory.name, Validators.required],
    });
  }

  editCategory() {
    const editedCategory = new Category({
      id: this.currentCategory.id,
      name: this.editCategoryForm.value.name,
    });

    this.api.editCategory(editedCategory)
      .subscribe(() => {
        this.change.emit('category');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });

  }

}
