import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../../shared/models/recipe";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RecipeService} from "../../../shared/services/recipe/recipe.service";
import {BookPurchaseService} from "../../../shared/services/book-purchase/book-purchase.service";
import {BookPurchase} from "../../../shared/models/book-purchase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-purchase',
  templateUrl: './book-purchase.component.html',
  styleUrls: ['./book-purchase.component.css']
})
export class BookPurchaseComponent implements OnInit, AfterViewInit {

  books: Array<BookPurchase> | null = [];

  displayedColumns: Array<string> | null = ['title', 'creator', 'price', 'date', 'download'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private bookPurchaseService: BookPurchaseService,private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.bookPurchaseService.getPurchaseHistory().subscribe(httpResponse => {
      if (httpResponse.body != null && httpResponse.body) {
        this.books = httpResponse.body;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  redirect(book): void {
    this.router.navigate([book.creator]);
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
