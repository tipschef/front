import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../../shared/models/recipe';
import {UserService} from '../../../shared/services/user/user.service';
import {User} from '../../../shared/models/user.model';
import {Like} from '../../../shared/models/like';
import {Comment} from '../../../shared/models/comment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  user: User;
  likes: Like;
  error: any;
  comments: Comment[];
  firstFormGroup: FormGroup;



  constructor(private recipeService: RecipeService,
              private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.comments= []
    this.firstFormGroup = this.formBuilder.group({
      comment_content: ["", [Validators.required, Validators.maxLength(350), Validators.minLength(2)]],
    });
    this.recipeService.getRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'), 10)).subscribe(httpReturn => {
        if (httpReturn && httpReturn.body) {
          this.recipe = httpReturn.body;
          this.userService.getUserById(this.recipe.creator_id).subscribe(httpReturnUser => {
            if (httpReturnUser && httpReturnUser.body) {
              this.user = httpReturnUser.body;
            }
          });
          this.update_like();
          this.get_commentary();

        }
      },
      error => {
        this.error = error.error.detail;
      }, );
  }

  update_like(): void {
    this.recipeService.getLikesRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'), 10)).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.likes = httpReturnLikes.body;
        console.log(this.likes.like_count);
      }
    });
  }

  like(): void {
    this.recipeService.likeARecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'), 10)).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.update_like();
      }
    });
  }


  dislike(): void {
    this.recipeService.dislikeARecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'), 10)).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.update_like();
      }
    });
  }


  share(): void {

  }

  get_commentary(): void{
    this.recipeService.getCommentsFromRecipeId(this.recipe.id).subscribe(httpReturnComment => {
      if (httpReturnComment && httpReturnComment.body) {
        this.comments = httpReturnComment.body;
        console.log(this.comments);
      }
    });
  }

  commentARecipeById(content: string): void{
    this.recipeService.commentARecipeById(this.recipe.id, content).subscribe(httpReturnComment => {
      if (httpReturnComment && httpReturnComment.body) {
        this.get_commentary();
      }
    });
  }

  onSubmit(): void {
    const comment = this.firstFormGroup.value.comment_content;
    if(comment !== "")
      this.commentARecipeById(comment);
  }


  deleteCommentFromRecipeId(comment_id: number): void{
    this.recipeService.deleteCommentFromRecipeId(this.recipe.id, comment_id).subscribe(httpReturnComment => {
      if (httpReturnComment && httpReturnComment.body) {
        this.get_commentary();
      }
    });
  }
}
