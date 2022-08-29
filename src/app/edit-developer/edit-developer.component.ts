import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';
import { ApiService } from '../shared/api.service';
import { Category } from '../shared/category.model';
import { Developer } from '../shared/developer.model';
import { Game } from '../shared/game.model';
import { AddDeveloperModalComponent } from './add-developer-modal/add-developer-modal.component';
import { EditDeveloperModalComponent } from './edit-developer-modal/edit-developer-modal.component';

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.component.html',
  styleUrls: ['./edit-developer.component.css']
})
export class EditDeveloperComponent implements OnInit {

  developers: Developer[] = [];

  @ViewChild('editDeveloperModal') editDeveloperModal: EditDeveloperModalComponent;
  @ViewChild('addDeveloperModal') addDeveloperModal: AddDeveloperModalComponent;
  rank: number;
  searchDeveloper: string;

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
    this.getDevelopers();
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

  deleteDeveloper(id: number, name:string) {
    if (window.confirm("Are you sure you want to delete developer " + name + "?")) {
    this.api.deleteDeveloper(id)
      .subscribe(() => {
        this.getDevelopers();
      },
        (error: Error) => {
          console.log('err', error);
        });
      }
  }

  addDeveloper(){
    this.addDeveloperModal.show();
  }
  
  showM4(id: number): void {
    this.editDeveloperModal.show(id);
  }

  changeE(event: string) {
    if (event === 'developer') {
      this.getDevelopers();
    }

  }

}
