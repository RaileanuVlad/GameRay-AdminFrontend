import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpEventType } from '@angular/common/http';
import { UserGame } from 'app/shared/userGame.model';

@Component({
  selector: 'app-edit-sale-modal',
  templateUrl: './edit-sale-modal.component.html',
  styleUrls: ['./edit-sale-modal.component.css']
})
export class EditSaleModalComponent {
  @ViewChild('editSaleModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editSaleForm: FormGroup;
  currentSale = new UserGame();
  saleInvalid = false;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(id: number): void {
    this.saleInvalid = false;
    this.modal.show();
    this.api.getUserGame(id)
      .subscribe((data: UserGame) => {
        this.currentSale = data;
        this.currentSale.id = id;
        this.initializeForm(this.currentSale);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeForm(currentSale: UserGame) {
    this.editSaleForm = this.fb.group({
      email: [currentSale.email, Validators.required],
      name: [currentSale.name, Validators.required],
      price: [currentSale.price, Validators.required],
      gameKey: [currentSale.gameKey, Validators.required],
      date: [currentSale.date, Validators.required],
      userId: [currentSale.userId, Validators.required],
      gameId: [currentSale.gameId, Validators.required],
    });

  }

  editSale() {
    this.saleInvalid = false;
    const editedSale = new UserGame({
      id: this.currentSale.id,
      email: this.editSaleForm.value.email,
      name: this.editSaleForm.value.name,
      price: this.editSaleForm.value.price,
      gameKey: this.editSaleForm.value.gameKey,
      date: this.editSaleForm.value.date,
      userId: this.editSaleForm.value.userId,
      gameId: this.editSaleForm.value.gameId
    });

    this.api.editUserGame(editedSale)
      .subscribe(() => {
        this.change.emit('sale');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
          this.saleInvalid = true;
        });
  }

}
