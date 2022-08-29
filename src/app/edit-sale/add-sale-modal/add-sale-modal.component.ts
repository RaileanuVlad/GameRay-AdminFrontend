import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-sale-modal',
  templateUrl: './add-sale-modal.component.html',
  styleUrls: ['./add-sale-modal.component.css']
})
export class AddSaleModalComponent {
  @ViewChild('addSaleModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  addSaleForm: FormGroup;
  addSaleInvalid = false;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  show(): void {
    this.addSaleInvalid = false;
    this.modal.show();
    this.initializeForm();
  }

  initializeForm() {

    this.addSaleForm = this.fb.group({
      email: [null, Validators.required],
      name: [null, Validators.required],
      price: [0, Validators.required],
      gameKey: [null, Validators.required],
      date: [null, Validators.required],
      userId: [null, Validators.required],
      gameId: [null, Validators.required],
    });

  }


  addSale() {
    this.addSaleInvalid = false;
    this.api.addUserGame(this.addSaleForm.value).subscribe(() => {
      this.change.emit('sale');
      this.modal.hide();
    },
      (error: Error) => {
        console.log('err', error);
        this.addSaleInvalid = true;
      });

  }



}
