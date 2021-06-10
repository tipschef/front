/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../../shared/models/recipe';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {RecipeCategory} from '../../../shared/models/recipe-category';
import {RecipeCookingType} from '../../../shared/models/recipe-cooking-type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  recipe: Recipe;
  recipeCategories: RecipeCategory[];
  recipeCookingTypes: RecipeCookingType[];
  medias: any[];
  ingredients: FormGroup[];
  steps: FormGroup[];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipe = this.recipeService.init_recipe();
    this.medias = [];
    this.ingredients = [];
    this.steps = [];
    this.recipeService.getAllRecipeCategories().subscribe(httpResponse => {
      this.recipeCategories = httpResponse.body;
    });

    this.recipeService.getAllRecipeCookingTypes().subscribe(httpResponse => {
      this.recipeCookingTypes = httpResponse.body;
    });

    this.firstFormGroup = this.formBuilder.group({
      min_tier: [0, [Validators.required, Validators.min(0), Validators.max(3)]],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      recipe_category_id: ['', Validators.required],
      recipe_cooking_type_id: ['', Validators.required],
      portion_number: [0, [Validators.required]],
      portion_unit: ['', Validators.required],
      preparation_hours: [0, [Validators.required]],
      preparation_minutes: [0, [Validators.required]],
      cooking_hours: [0, [Validators.required]],
      cooking_minutes: [0, [Validators.required]],
      resting_hours: [0, [Validators.required]],
      resting_minutes: [0, [Validators.required]],
      difficulty: [0, [Validators.required]],
      cost: [0, [Validators.required]],
    });
    this.ingredients.push(this.formBuilder.group({
      quantity: [0],
      ingredient_unit: ['', Validators.required],
      ingredient_name: ['', Validators.required]
    }));

    this.steps.push(this.formBuilder.group({
      content: ['', Validators.required],
    }));
  }

  counter(size: number): number[] {
    return Array.from({length: size}, (_, i) => i + 1);
  }

  print(): void {
    console.log(this.firstFormGroup);
    console.log(this.secondFormGroup);
    console.log(this.ingredients);
    console.log(this.steps);
  }

  addMedias(event: any): void {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    /*const mimeType = files[0].type;
    if (mimeType.match(/image\/!*!/) == null) {
      this.message = "Only images are supported.";
      return;
    }*/

    let reader;

    for (const key in files) {
      // skip loop if the property is from prototype
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      const file = files[key];
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.medias.push({'data': file, 'path': reader.result});
      };
    }
  }

  removeMedias(i: number): void {
    if (this.medias[i]) {
      this.medias.splice(i, 1);
    }
  }

  addIngredient(): void {
    this.ingredients.push(this.formBuilder.group({
      quantity: [0],
      ingredient_unit: ['', Validators.required],
      ingredient_name: ['', Validators.required]
    }));
  }

  deleteIngredient(i: number): void {
    if (this.ingredients[i]) {
      this.ingredients.splice(i, 1);
    }
  }

  addStep(): void {
    this.steps.push(this.formBuilder.group({
      content: ['', Validators.required],
    }));
  }

  deleteStep(i: number): void {
    if (this.steps[i]) {
      this.steps.splice(i, 1);
    }
  }

  createRecipe(): void {
    this.recipe.min_tier = this.firstFormGroup.value.min_tier;
    this.recipe.description = this.firstFormGroup.value.description;
    this.recipe.name = this.firstFormGroup.value.name;

    this.recipe.recipe_category_id = this.secondFormGroup.value.recipe_category_id;
    this.recipe.recipe_cooking_type_id = this.secondFormGroup.value.recipe_cooking_type_id;
    this.recipe.portion_number = this.secondFormGroup.value.portion_number;
    this.recipe.portion_unit = this.secondFormGroup.value.portion_unit;
    this.recipe.preparation_hours = this.secondFormGroup.value.preparation_hours;
    this.recipe.preparation_minutes = this.secondFormGroup.value.preparation_minutes;
    this.recipe.cooking_hours = this.secondFormGroup.value.cooking_hours;
    this.recipe.cooking_minutes = this.secondFormGroup.value.cooking_minutes;
    this.recipe.resting_hours = this.secondFormGroup.value.resting_hours;
    this.recipe.resting_minutes = this.secondFormGroup.value.resting_minutes;
    this.recipe.difficulty = this.secondFormGroup.value.difficulty;
    this.recipe.cost = this.secondFormGroup.value.cost;

    for (const ingredient of this.ingredients) {
      this.recipe.ingredients.push({
        quantity: ingredient.value.quantity,
        ingredient_name: ingredient.value.ingredient_name,
        ingredient_unit: ingredient.value.ingredient_unit
      });
    }

    let order = 1;
    for (const step of this.steps) {
      this.recipe.steps.push({
        order: order,
        content: step.value.content
      });
      order+=1;
    }

    this.recipeService.postRecipe(this.recipe).subscribe(httpReturn => {
      if (httpReturn.body.recipe_id){
        let mediaToAdd = [];
        for(let media of this.medias){
          mediaToAdd.push(media.data);
        }
        this.recipeService.postMedias(httpReturn.body.recipe_id, mediaToAdd).subscribe(httpReturn => {
          this.router.navigate(['/cook/recipe']);
        });
      }
    });
  }
}
