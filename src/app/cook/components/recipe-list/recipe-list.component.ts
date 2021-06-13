import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {Recipe} from '../../../shared/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipeCreatedByUser().subscribe(httpReturn => {
      console.log(httpReturn);
    });
  }

}
