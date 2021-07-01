import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../shared/services/book/book.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user/user.service';
import {CreatedBook} from '../../../shared/models/created-book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: CreatedBook;
  bookId: number;
  user: User;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(): void {
    this.bookId = parseInt(this.route.snapshot.paramMap.get('book_id'), 10);

    this.bookService.getBookById(this.bookId).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.book = httpReturn.body;
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    this.userService.getUserById(this.book.creator_id).subscribe( httpReturn => {
      if (httpReturn && httpReturn.body){
        this.user = httpReturn.body;
      }
    });
  }

}
