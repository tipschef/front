import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookPurchase} from "../../../shared/models/book-purchase";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PayslipService} from "../../../shared/services/payslip/payslip.service";
import {Payslip} from "../../../shared/models/payslip";

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit, AfterViewInit {

  payslips: Array<Payslip> | null = [];

  displayedColumns: Array<string> | null = ['amount', 'date'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private payslipService: PayslipService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.payslipService.getPayslipsHistory().subscribe(httpResponse => {
      if (httpResponse.body != null && httpResponse.body) {
        this.payslips = httpResponse.body;
        this.dataSource = new MatTableDataSource(this.payslips);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource != null) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator != null) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

}
