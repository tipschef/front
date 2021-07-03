import {Component, Input, OnInit} from '@angular/core';
import {CreatedBook} from '../../../shared/models/created-book';
import {BookService} from '../../../shared/services/book/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: CreatedBook;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  redirectBook(id: number): void {
    this.router.navigate(['/book/' + id]);
  }

}
