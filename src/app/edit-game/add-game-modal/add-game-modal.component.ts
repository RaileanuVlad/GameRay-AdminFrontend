import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Developer } from 'app/shared/developer.model';
import { Category } from 'app/shared/category.model';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-add-game-modal',
  templateUrl: './add-game-modal.component.html',
  styleUrls: ['./add-game-modal.component.css']
})
export class AddGameModalComponent {
  @ViewChild('addGameModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  addGameForm: FormGroup;
  developers: Developer[] = [];
  categories: Category[] = [];
  success: boolean;
  progress1: number;
  url1: any;
  progress2: number;
  url2: any;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(): void {
    this.modal.show();
    this.getCategories();
    this.getDevelopers();
    this.initializeForm();
    this.progress1 = 0;
    this.progress2 = 0;
  }

  getDevelopers() {
    this.api.getDevelopers()
      .subscribe((data: Developer[]) => {
        this.developers = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
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

  initializeForm() {
    this.addGameForm = this.fb.group({
      name: [null, Validators.required],
      price: [0, Validators.required],
      description: [null, Validators.required],
      minReq: [null, Validators.required],
      recReq: [null, Validators.required],
      platform: [null, Validators.required],
      imgLink: [null, Validators.required],
      banLink: [null, Validators.required],
      sale: [0, Validators.required],
      developerId: [null, Validators.required],
      categoryId: this.fb.array([])
    });
  }

  onChange(id: number, isChecked: boolean) {
    const categories = (this.addGameForm.controls.categoryId as FormArray);

    if (isChecked) {
      categories.push(new FormControl(id));
    } else {
      const index = categories.controls.findIndex(x => x.value === id);
      categories.removeAt(index);
    }
  }

  addGame() {
    this.addGameForm.value.categoryId = this.addGameForm.value.categoryId.sort((a, b) => a - b);
    this.api.addGame(this.addGameForm.value).subscribe(() => {

      this.addGameForm.reset();
      this.success = true;
      this.change.emit('game');
      this.modal.hide();
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log('err', error);
        this.addGameForm.reset();
        this.success = false;
        this.modal.hide();
        window.alert("Something went wrong!");
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }


  uploadFileImg = (files) => {

    this.addGameForm.markAsDirty();
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.api.uploadFile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress1 = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {

          this.url1 = new Object({
            fileUrl: null
          });
          this.url1 = event.body;
          this.addGameForm.controls.imgLink.setValue(this.url1.fileUrl);
        }
      })

  }

  uploadFileBan = (files) => {

    this.addGameForm.markAsDirty();
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.api.uploadFile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress2 = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {

          this.url2 = new Object({
            fileUrl: null
          });
          this.url2 = event.body;
          this.addGameForm.controls.banLink.setValue(this.url2.fileUrl);
        }
      })

  }


  resetProgress1(): void {
    this.progress1 = 0;
  }

  resetProgress2(): void {
    this.progress2 = 0;
  }

}
