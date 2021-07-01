import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {Pagination} from '../../../shared/models/pagination';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user/user.service';
import {BookService} from '../../../shared/services/book/book.service';
import {Book} from '../../../shared/models/book';


@Component({
  selector: 'app-profil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  user: User;
  books: Book[];

  pagination: Pagination;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private userService: UserService,
              private bookService: BookService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.loadUser();
    this.loadBooks();
    this.pagination = {
      items: [],
      isLoading: false,
      theEnd: false,
      page: 0,
      perPage: 10
    };
  }

  loadBooks(): void {
    this.bookService.getBookByUser(this.username).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.books = httpReturn.body;
      }
    });
  }
  loadUser(): void {
    this.userService.getUserByUsername(this.username).subscribe(httpReturn => {
      if (httpReturn?.body) {
        this.user = httpReturn.body;

      }
    }, error => {
      console.log('User does not exist');
    });
  }

  loadData(): void {
    this.pagination.isLoading = true;
    this.pagination.page = this.pagination.page + 1;
    this.recipeService.getRecipesFromUsername(this.username, this.pagination.perPage, this.pagination.page).subscribe(httpReturn => {
      if (httpReturn.body.length !== this.pagination.perPage) {
        this.pagination.theEnd = true;
      }
      this.pagination.items = [...this.pagination.items, ...httpReturn.body];
      this.pagination.isLoading = false;
    });
  }


  followUser(): void {
    // this.userService.followUser(this.username).subscribe()
    if (!this.user.following){
      this.userService.followUser(this.username).subscribe(httpReturn => {
        this.loadUser();
      });
    }else{
      this.userService.unfollowUser(this.username).subscribe(httpReturn => {
        this.loadUser();
      });
    }
  }

  subscribeUser(): void {
    this.router.navigate(['/subscribe/' + this.username]);
  }
}
