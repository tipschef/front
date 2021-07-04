import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminTipschefService} from '../../../shared/services/admin/admin-tipschef.service';
import {UserAdmin} from '../../../shared/models/user-admin';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit, AfterViewInit {

  users: Array<UserAdmin> | null = [];

  isLoading: boolean;

  displayedColumns: Array<string> | null = ['id', 'username', 'email', 'is_filled_banking_info',
                                            'admin', 'partner', 'highlight'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminTipschefService: AdminTipschefService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.loadData();
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

  loadData(): void {
    this.adminTipschefService.getUsers().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.users = httpReturn.body;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }
    });
  }


  setAdmin(user: UserAdmin): void {
    this.isLoading = true;
    this.adminTipschefService.setAdmin(user.id).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.loadData();
      }
    });
  }

  setPartner(user: UserAdmin): void {
    this.isLoading = true;
    this.adminTipschefService.setPartner(user.id).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.loadData();
      }
    });
  }

  setHighlighted(user: UserAdmin): void {
    this.isLoading = true;
    this.adminTipschefService.setHighlighted(user.id).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.loadData();
      }
    });
  }

  removeHighlighted(user: UserAdmin): void {
    this.isLoading = true;
    this.adminTipschefService.removeHighlighted(user.id).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.loadData();
      }
    });
  }
}
