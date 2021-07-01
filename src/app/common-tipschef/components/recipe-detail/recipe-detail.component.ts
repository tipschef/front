import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../../../shared/models/recipe';
import {UserService} from '../../../shared/services/user/user.service';
import {User} from '../../../shared/models/user.model';
import {Like} from '../../../shared/models/like';
import {Comment} from '../../../shared/models/comment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {BookService} from '../../../shared/services/book/book.service';
import {CreatedBook} from '../../../shared/models/created-book';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  user_creator: User;
  likes: Like;
  error: any;
  comments: Comment[];
  firstFormGroup: FormGroup;
  recipeId: number;
  books: CreatedBook[];


  constructor(private recipeService: RecipeService,
              private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.comments = [];
    this.recipeId = parseInt(this.route.snapshot.paramMap.get('recipe_id'), 10);
    this.loadBooks();
    this.firstFormGroup = this.formBuilder.group({
      comment_content: ['', [Validators.required, Validators.maxLength(350), Validators.minLength(2)]],
    });
    this.recipeService.getRecipeById(this.recipeId).subscribe(httpReturn => {
        if (httpReturn && httpReturn.body) {
          this.recipe = httpReturn.body;
          this.userService.getUserById(this.recipe.creator_id).subscribe(httpReturnUser => {
            if (httpReturnUser && httpReturnUser.body) {
              this.user_creator = httpReturnUser.body;
            }
          });
          this.update_like();
          this.get_commentary();

        }
      },
      error => {
        this.error = error.error.detail;
      }) ;
  }

  loadBooks(): void {
    this.bookService.getBookByRecipe(this.recipeId).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.books = httpReturn.body;
      }
    });
  }

  update_like(): void {
    this.recipeService.getLikesRecipeById(this.recipeId).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.likes = httpReturnLikes.body;
      }
    });
  }

  like(): void {
    this.recipeService.likeARecipeById(this.recipeId).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.update_like();
      }
    });
  }


  dislike(): void {
    this.recipeService.dislikeARecipeById(this.recipeId).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.update_like();
      }
    });
  }


  share(): void {

  }

  get_commentary(): void {
    this.recipeService.getCommentsFromRecipeId(this.recipe.id).subscribe(httpReturnComment => {
      if (httpReturnComment && httpReturnComment.body) {
        this.comments = httpReturnComment.body;
      }
    });
  }

  commentARecipeById(content: string): void {
    this.recipeService.commentARecipeById(this.recipe.id, content).subscribe(httpReturnComment => {
      if (httpReturnComment && httpReturnComment.body) {
        this.get_commentary();
      }
    });
  }

  onSubmit(): void {
    const comment = this.firstFormGroup.value.comment_content;
    if (comment !== '') {
      this.commentARecipeById(comment);
    }
  }


  deleteCommentFromRecipeId(commentId: number): void {
    this.recipeService.deleteCommentFromRecipeId(this.recipe.id, commentId).subscribe(httpReturnComment => {
      if (httpReturnComment && httpReturnComment.body) {
        this.get_commentary();
      }
    });
  }

  redirectBook(id: number): void {
    this.router.navigate(['/book/' + id]);
  }

  get username(): string {
    if (this.authService.userRoles && this.authService.userRoles.username){
      return this.authService.userRoles.username;
    }
    return '';
  }
}
