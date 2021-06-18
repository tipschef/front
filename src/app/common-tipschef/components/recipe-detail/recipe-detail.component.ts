import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../../shared/services/recipe/recipe.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../../shared/models/recipe";
import {UserService} from "../../../shared/services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {Like} from "../../../shared/models/like";

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

  constructor(private recipeService: RecipeService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.getRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.recipe = httpReturn.body;
        this.userService.getUserById(this.recipe.creator_id).subscribe(httpReturn => {
          if (httpReturn && httpReturn.body) {
            this.user = httpReturn.body;
          }
        });
        this.update_like();
      }},
      error => {
        this.error = error.error["detail"];
      },)
  }

  update_like(): void{
    this.recipeService.getLikesRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.likes = httpReturnLikes.body
        console.log(this.likes.like_count)
      }})
  }

  like(): void{
    this.recipeService.likeARecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.update_like()
      }})
  }


  dislike(): void{
    this.recipeService.dislikeARecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.update_like()
      }})
  }


  share(): void{

  }

}
