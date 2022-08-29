import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';
import { ApiService } from '../shared/api.service';
import { AddSaleModalComponent } from './add-sale-modal/add-sale-modal.component';
import { EditSaleModalComponent } from './edit-sale-modal/edit-sale-modal.component';
import * as XLSX from 'xlsx';
import { UserGame } from 'app/shared/userGame.model';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css']
})
export class EditSaleComponent implements OnInit {

  sales: UserGame[] = [];
  @ViewChild('editSaleModal') editSaleModal: EditSaleModalComponent;
  @ViewChild('addSaleModal') addSaleModal: AddSaleModalComponent;
  @ViewChild('exportSales') exportSales: ElementRef;
  rank: number;
  searchSale: string;
  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.currentAdminValue) {
      this.rank = this.authService.currentAdminValue.state;
    }
    else {
      this.rank = 0;
    }
    this.getSales();
  }

  getSales() {
    this.api.getUserGames()
      .subscribe((data: UserGame[]) => {
        this.sales = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  };

  deleteSale(id: number, email: string, name: string) {
    if (window.confirm("Are you sure you want to delete sale " + email + ": " + name + "?")) {
      this.api.deleteUserGame(id)
        .subscribe(() => {
          this.sales = [];
          this.getSales();
        },
          (error: Error) => {
            console.log('err', error);
          });
    }
  }

  addSale() {
    this.addSaleModal.show();
  }

  exportexcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.exportSales.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales');
    XLSX.writeFile(wb, 'Sales.xlsx');
  }

  showM1(id: number): void {
    this.editSaleModal.show(id);
  }

  changeE(event: string) {
    if (event === 'sale') {
      this.getSales();
    }
  }

}
