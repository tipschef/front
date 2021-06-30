import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../../shared/services/book/book.service';
import {Book} from '../../../shared/models/book';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CreatedBook} from '../../../shared/models/created-book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  books: Array<CreatedBook> | null = [];

  displayedColumns: Array<string> | null = ['title', 'status', 'number_of_recipe', 'downloadPdf', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getMyBooks().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.books = httpReturn.body;
      }
    });
  }

  ngAfterViewInit(): void {
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
    this.bookService.getMyBooks().subscribe(httpReturn => {
      if (httpReturn.body != null && httpReturn.body) {
        this.books = httpReturn.body;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteBook(book: CreatedBook): void {
    this.bookService.deleteBook(book.id).subscribe(httpReturn => {
      this.loadData();
    });
  }

}
