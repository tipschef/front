import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../../shared/services/recipe/recipe.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../../shared/models/recipe";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  username: string;
  likes: any;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.authService.userRoles.
    this.username = this.route.snapshot.paramMap.get('username')
    this.recipeService.getRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.update_like()
        this.recipe = httpReturn.body;
      }})
  }

  update_like(): void{
    this.recipeService.getLikesRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturnLikes => {
      if (httpReturnLikes && httpReturnLikes.body) {
        this.likes = httpReturnLikes.body['like_count']
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
