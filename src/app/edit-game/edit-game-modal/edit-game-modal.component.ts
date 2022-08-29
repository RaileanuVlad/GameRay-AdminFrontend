import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Game } from '../../shared/game.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Developer } from 'app/shared/developer.model';
import { Category } from 'app/shared/category.model';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-game-modal',
  templateUrl: './edit-game-modal.component.html',
  styleUrls: ['./edit-game-modal.component.css']
})
export class EditGameModalComponent {
  @ViewChild('editGameModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editGameForm: FormGroup;
  currentGame = new Game();
  developers: Developer[] = [];
  categories: Category[] = [];
  checkedList: boolean[] = [];
  progress1: number;
  url1: any;
  progress2: number;
  url2: any;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(id: number): void {
    this.modal.show();
    this.getCategories();
    this.getDevelopers();
    this.api.getGame(id)
      .subscribe((data: Game) => {
        this.currentGame = data;
        this.currentGame.id = id;
        this.initializeForm(this.currentGame);
      },
        (error: Error) => {
          console.log('err', error);

        });
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

  initializeForm(currentGame: Game) {

    this.editGameForm = this.fb.group({
      name: [currentGame.name, Validators.required],
      price: [currentGame.price, Validators.required],
      description: [currentGame.description, Validators.required],
      minReq: [currentGame.minReq, Validators.required],
      recReq: [currentGame.recReq, Validators.required],
      platform: [currentGame.platform, Validators.required],
      imgLink: [currentGame.imgLink, Validators.required],
      banLink: [currentGame.banLink, Validators.required],
      sale: [currentGame.sale, Validators.required],
      developerId: [currentGame.developerId, Validators.required],
      categoryId: this.fb.array([])
    });

    this.checkedList = new Array(this.categories.length).fill(false);
    const categoriesInit = (this.editGameForm.controls.categoryId as FormArray);
    currentGame.categoryId.forEach((id) => {
      this.checkedList[this.categories.findIndex(c => c.id === id)] = true;
      categoriesInit.push(new FormControl(id));
    })
  }

  onChange(id: number, isChecked: boolean) {
    this.editGameForm.markAsDirty();
    const categoriesChange = (this.editGameForm.controls.categoryId as FormArray);

    if (isChecked) {
      categoriesChange.push(new FormControl(id));
    } else {
      const index = categoriesChange.controls.findIndex(x => x.value === id);
      categoriesChange.removeAt(index);
    }
  }

  editGame() {
    const editedGame = new Game({
      id: this.currentGame.id,
      name: this.editGameForm.value.name,
      price: this.editGameForm.value.price,
      description: this.editGameForm.value.description,
      minReq: this.editGameForm.value.minReq,
      recReq: this.editGameForm.value.recReq,
      platform: this.editGameForm.value.platform,
      imgLink: this.editGameForm.value.imgLink,
      banLink: this.editGameForm.value.banLink,
      sale: this.editGameForm.value.sale,
      views: this.currentGame.views,
      developerId: this.editGameForm.value.developerId,
      categoryId: this.editGameForm.value.categoryId
    });

    editedGame.categoryId = editedGame.categoryId.sort((a, b) => a - b);
    this.api.editGame(editedGame)
      .subscribe(() => {
        this.change.emit('game');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  uploadFileImg = (files) => {

    this.editGameForm.markAsDirty();
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
          this.editGameForm.controls.imgLink.setValue(this.url1.fileUrl);
        }
      })

  }

  uploadFileBan = (files) => {

    this.editGameForm.markAsDirty();
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
          this.editGameForm.controls.banLink.setValue(this.url2.fileUrl);
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
