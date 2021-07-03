/* tslint:disable */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../../shared/models/recipe';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {RecipeCategory} from '../../../shared/models/recipe-category';
import {RecipeCookingType} from '../../../shared/models/recipe-cooking-type';
import {ActivatedRoute, Router} from '@angular/router';
import {Step} from '../../../shared/models/step';
import {Media} from '../../../shared/models/media';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit, AfterViewInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  recipe: Recipe;
  recipeCategories: RecipeCategory[];
  recipeCookingTypes: RecipeCookingType[];
  medias: any[];
  ingredients: FormGroup[];
  steps: FormGroup[];
  is_update: boolean;
  isDataAvailable: boolean = false;
  mediaToDelete: Media[];

  is_loading: boolean;
  maxStep: number;
  currentStep: number;

  thumbnail: {};
  video: {};

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private recipeService: RecipeService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.is_update = !!this.route.snapshot.paramMap.get('recipe_id');

    this.is_loading = false;
    this.maxStep = this.is_update ? 6 : 5;
    this.currentStep = 0;

    this.medias = [];
    this.ingredients = [];
    this.steps = [];
    this.mediaToDelete = [];

    this.recipeService.getAllRecipeCategories().subscribe(httpResponse => {
      this.recipeCategories = httpResponse.body;
    });

    this.recipeService.getAllRecipeCookingTypes().subscribe(httpResponse => {
      this.recipeCookingTypes = httpResponse.body;
    });

    if (this.is_update) {
      this.init_update();
    } else {
      this.init_create();
    }
  }

  ngAfterViewInit(): void {

  }

  init_update(): void {
    this.recipeService.getRecipeById(parseInt(this.route.snapshot.paramMap.get('recipe_id'))).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.recipe = httpReturn.body;
        if (this.recipe.creator_id != this.authService.userRoles.id) {
          this.router.navigate(['/cook/recipe']);
        }
        this.fill_form();
      }
    });
  }

  fill_form(): void {
    this.firstFormGroup = this.formBuilder.group({
      min_tier: [this.recipe.min_tier, [Validators.required, Validators.min(0), Validators.max(3)]],
      name: [this.recipe.name, [Validators.required, Validators.maxLength(155)]],
      description: [this.recipe.description, [Validators.required, Validators.maxLength(155)]],
    });

    this.secondFormGroup = this.formBuilder.group({
      recipe_category_id: [this.recipe.recipe_category_id, Validators.required],
      recipe_cooking_type_id: [this.recipe.recipe_cooking_type_id, Validators.required],
      portion_number: [this.recipe.portion_number, [Validators.required]],
      portion_unit: [this.recipe.portion_unit, Validators.required],
      preparation_hours: [this.recipe.preparation_hours, [Validators.required]],
      preparation_minutes: [this.recipe.preparation_minutes, [Validators.required]],
      cooking_hours: [this.recipe.cooking_hours, [Validators.required]],
      cooking_minutes: [this.recipe.cooking_minutes, [Validators.required]],
      resting_hours: [this.recipe.resting_hours, [Validators.required]],
      resting_minutes: [this.recipe.resting_minutes, [Validators.required]],
      difficulty: [this.recipe.difficulty, [Validators.required]],
      cost: [this.recipe.cost, [Validators.required]],
    });

    for (let ingredient of this.recipe.ingredients) {
      this.ingredients.push(this.formBuilder.group({
        quantity: [ingredient.quantity],
        ingredient_unit: [ingredient.ingredient_unit, Validators.required],
        ingredient_name: [ingredient.ingredient_name, Validators.required]
      }));
    }

    this.recipe.steps.sort(this.compare);

    for (let step of this.recipe.steps) {
      this.steps.push(this.formBuilder.group({
        content: [step.content, Validators.required],
      }));
    }

    for (let media of this.recipe.medias) {
      this.medias.push({'data': media, 'path': media.path, 'is_created': true});
    }

    if (!!this.recipe.thumbnail) {
      this.thumbnail = {'data': this.recipe.thumbnail, 'path': this.recipe.thumbnail.path, 'is_created': true};
    }

    if (!!this.recipe.video) {
      this.video = {'data': this.recipe.video, 'path': this.recipe.video.path, 'is_created': true};
    }
    this.isDataAvailable = true;
  }

  compare(a: Step, b: Step) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

  init_create(): void {
    this.recipe = this.recipeService.init_recipe();

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
    this.isDataAvailable = true;
  }

  counter(size: number): number[] {
    return Array.from({length: size}, (_, i) => i + 1);
  }

  print(): void {
    console.log(this.recipe);
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

    let reader;
    for (const key in files) {
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      const file = files[key];

      let sum = 0;

      for (let media of this.medias){
        if (!media.is_created) {
          sum += (media['data'].size / 1024) / 1024;
        }
      }

      if ( ( sum +  (file.size / 1024) / 1024 )> 30) {
        this.snackBar.open('Le total des fichiers est trop volumineux, volume maximum maximal accepté 30Mo.', 'Fermer');
        return ;
      }
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.medias.push({'data': file, 'path': reader.result, 'is_created': false});
      };
    }
  }


  addThumbnail(event: any): void {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    let reader;

    for (const key in files) {
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      const file = files[key];
      if ( (file.size / 1024) / 1024 > 30) {
        this.snackBar.open('Fichier trop volumineux, taille maximum acceptée 30Mo', 'Fermer');
        return ;
      }
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.thumbnail = {'data': file, 'path': reader.result, 'is_created': false};
      };
    }
  }

  addVideo(event: any): void {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    let reader;

    for (const key in files) {
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      const file = files[key];
      if ( (file.size / 1024) / 1024 > 30) {
        this.snackBar.open('Fichier trop volumineux, taille maximum acceptée 30Mo', 'Fermer');
        return ;
      }

      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.video = {'data': file, 'path': reader.result, 'is_created': false};
      };
    }
  }

  removeMedias(i: number): void {
    if (this.medias[i]) {
      if (this.medias[i]['is_created'] == true) {
        this.mediaToDelete.push(this.medias[i].data);
      }
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
    this.currentStep = 0;
    this.is_loading = true;

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
    this.recipe.ingredients = [];
    for (const ingredient of this.ingredients) {
      this.recipe.ingredients.push({
        quantity: ingredient.value.quantity,
        ingredient_name: ingredient.value.ingredient_name,
        ingredient_unit: ingredient.value.ingredient_unit
      });
    }
    this.recipe.steps = [];
    let order = 1;
    for (const step of this.steps) {
      this.recipe.steps.push({
        order: order,
        content: step.value.content
      });
      order += 1;
    }

    this.currentStep += 1;
    if (this.is_update) {
      this.recipeService.updateRecipe(this.recipe).subscribe(httpReturn => {
        this.currentStep += 1;
        if (httpReturn.body['status']) {

          if (this.mediaToDelete.length != 0) {
            this.recipeService.deleteMedias(this.recipe.id, this.mediaToDelete).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }

          if (this.thumbnail && this.thumbnail['is_created'] == false) {
            this.recipeService.postThumbnail(this.recipe.id, this.thumbnail['data']).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }

          if (this.video && this.video['is_created'] == false) {
            this.recipeService.postVideo(this.recipe.id, this.video['data']).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }

          let mediaToAdd = [];
          for (let media of this.medias) {
            if (media['is_created'] == false) {
              mediaToAdd.push(media.data);
            }
          }

          if (mediaToAdd.length != 0) {
            this.recipeService.postMedias(this.recipe.id, mediaToAdd).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }
        }
      });
    } else {
      this.recipeService.postRecipe(this.recipe).subscribe(httpReturn => {
        this.currentStep += 1;
        if (httpReturn.body.recipe_id) {
          let mediaToAdd = [];
          for (let media of this.medias) {
            if (media['is_created'] == false) {
              mediaToAdd.push(media.data);
            }
          }

          if (this.thumbnail && this.thumbnail['is_created'] == false) {
            this.recipeService.postThumbnail(httpReturn.body.recipe_id, this.thumbnail['data']).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }

          if (this.video && this.video['is_created'] == false) {
            this.recipeService.postVideo(httpReturn.body.recipe_id, this.video['data']).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }

          if (mediaToAdd.length != 0) {
            this.recipeService.postMedias(httpReturn.body.recipe_id, mediaToAdd).subscribe(httpReturn => {
              this.currentStep += 1;
              if (this.currentStep == this.maxStep) {
                this.router.navigate(['/cook/recipe']);
              }
            });
          } else {
            this.currentStep += 1;
            if (this.currentStep == this.maxStep) {
              this.router.navigate(['/cook/recipe']);
            }
          }

        }
      });
    }

  }

  get difficultyArray(): {} {
    return this.recipeService.difficultyArray;
  }

  get costArray(): {} {
    return this.recipeService.costArray;
  }

}
