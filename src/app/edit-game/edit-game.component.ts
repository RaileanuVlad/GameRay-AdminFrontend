import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';
import { Developer } from 'app/shared/developer.model';
import { ApiService } from '../shared/api.service';
import { Game } from '../shared/game.model';
import { AddGameModalComponent } from './add-game-modal/add-game-modal.component';
import { EditGameModalComponent } from './edit-game-modal/edit-game-modal.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  games: Game[] = [];
  developers: Developer[] = [];
  @ViewChild('editGameModal') editGameModal: EditGameModalComponent;
  @ViewChild('addGameModal') addGameModal: AddGameModalComponent;
  @ViewChild('exportGames') exportGames: ElementRef;
  rank: number;
  searchGame: string;
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
    this.getGames();
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

  getGames() {
    this.api.getGames()
      .subscribe((data: Game[]) => {
        this.games = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  };

  deleteGame(id: number, name: string) {
    if (window.confirm("Are you sure you want to delete game " + name + "?")) {
      this.api.deleteGame(id)
        .subscribe(() => {
          this.games = [];
          this.getGames();
        },
          (error: Error) => {
            console.log('err', error);
          });
    }
  }

  addGame(){
    this.addGameModal.show();
  }

  exportexcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.exportGames.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Games');
    XLSX.writeFile(wb, 'Games.xlsx');
  }
  showM1(id: number): void {
    this.editGameModal.show(id);
  }

  changeE(event: string) {
    if (event === 'game') {
      this.getGames();
    }
  }

}
