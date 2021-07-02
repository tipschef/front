import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../shared/services/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user/user.service';
import {CreatedBook} from '../../../shared/models/created-book';
import {BookPurchaseService} from "../../../shared/services/book-purchase/book-purchase.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: CreatedBook;
  bookId: number;
  user: User;
  isLoading: boolean= false;
  bought: boolean = false;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private bookPurchaseService: BookPurchaseService) {
  }

  ngOnInit(): void {
    this.loadBook();


  }

  loadBook(): void {
    this.bookId = parseInt(this.route.snapshot.paramMap.get('book_id'), 10);

    this.bookService.getBookById(this.bookId).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.book = httpReturn.body;
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    this.userService.getUserById(this.book.creator_id).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.user = httpReturn.body;
        this.show_button()
      }
    });
  }

  show_button(): void{
    this.bookPurchaseService.isAlreadyBought(this.book.id).subscribe(httpResponse => {
      if (httpResponse.body != null && httpResponse.body) {
        this.bought = httpResponse.body.is_bought;
      }
    });
  }

  buyBook(): void {
    this.isLoading = true;

    this.bookPurchaseService.buy_book(this.bookId).subscribe(httpResponse => {
      if (httpResponse.body != null && httpResponse.body) {
        console.log('bought')
        this.isLoading = false;
        this.bought = true;
      }
    }, error =>
    {
      this.isLoading = false;
      if(error.status == 400){
        this.router.navigate(['/cook/payment-information']);
      }
    });
  }

  redirect(): void {
    this.router.navigate(['/book-purchase']);
  }
}
