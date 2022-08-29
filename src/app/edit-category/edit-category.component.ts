import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';
import { ApiService } from '../shared/api.service';
import { Category } from '../shared/category.model';
import { Developer } from '../shared/developer.model';
import { Game } from '../shared/game.model';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categories: Category[] = [];

  @ViewChild('editCategoryModal') editCategoryModal: EditCategoryModalComponent;
  @ViewChild('addCategoryModal') addCategoryModal: AddCategoryModalComponent;
  rank: number;
  searchCategory: string;

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
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }
  
  deleteCategory(id: number, name: string) {
    if (window.confirm("Are you sure you want to delete category " + name + "?")) {
      this.api.deleteCategory(id)
        .subscribe(() => {
          this.getCategories();
        },
          (error: Error) => {
            console.log('err', error);
          });
    }
  }

  addCategory(){
    this.addCategoryModal.show();
  }

  showM3(id: number): void {
    this.editCategoryModal.show(id);
  }

  changeE(event: string) {

    if (event === 'category') {
      this.getCategories();
    }

  }

}
