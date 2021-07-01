/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TemplateList} from '../../../shared/models/template-list';
import {BookService} from '../../../shared/services/book/book.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {Recipe} from '../../../shared/models/recipe';
import {MatTableDataSource} from '@angular/material/table';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  recipeFormGroups: FormGroup[];
  templates: TemplateList;
  isLoading: boolean;
  pdfUrl: string;
  htmlToDisplay: string;

  recipes: Array<Recipe> | null = [];

  coverPicture: {};

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private authService: AuthService,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.bookService.getBookTemplate().subscribe(httpReturn => {
      this.templates = httpReturn.body;
      this.isLoading = false;
    });

    this.recipeService.getAllRecipeCreatedByUser().subscribe(httpReturn => {
      if (httpReturn.body != null && httpReturn.body) {
        this.recipes = httpReturn.body;
      }
    });

    this.firstFormGroup = this.formBuilder.group({
      value: [0, Validators.required],
      name: ['', Validators.required],
      price_euro: [0, [Validators.required, Validators.min(5)]]
    });

    this.secondFormGroup = this.formBuilder.group({
      value: [0, Validators.required],
      description: ['', Validators.required]
    });

    this.recipeFormGroups = [];
    this.addRecipeFormGroup();


  }

  addRecipeFormGroup(): void {
    this.recipeFormGroups.push(
      this.formBuilder.group({
        recipe_id: [0, Validators.required],
        value: [0, Validators.required],
      })
    );
  }

  addCoverPicture(event: any): void {
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
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.coverPicture = {'data': file, 'path': reader.result, 'is_created':false};
      };
    }
  }

  previewCover():void {
    let html = this.templates.cover_pages[this.firstFormGroup.value.value].content;
    html = html.replace('BOOK_NAME', this.firstFormGroup.value.name);
    html = html.replace('COOK_USERNAME', this.authService.userRoles.username);

    html = html.replace('COVER_SOURCE', this.coverPicture['path']);
    this.htmlToDisplay = html;
  }

  previewDescription(): void {
    let html = this.templates.book_descriptions[this.secondFormGroup.value.value].content;
    html = html.replace('BOOK_DESCRIPTION', this.secondFormGroup.value.description);
    this.htmlToDisplay = html;
  }

  previewRecipe(index: number): void {
    let html = this.templates.recipes[this.recipeFormGroups[index].value.value].content;
    html = html.replace('RECIPE_NAME',      this.recipes[this.recipeFormGroups[index].value.recipe_id].name);
    html = html.replace('THUMBNAIL_PATH',   this.recipes[this.recipeFormGroups[index].value.recipe_id].thumbnail.path);
    html = html.replace('PORTION_NUMBER',   this.recipes[this.recipeFormGroups[index].value.recipe_id].portion_number.toString());
    html = html.replace('PORTION_UNIT',     this.recipes[this.recipeFormGroups[index].value.recipe_id].portion_unit);
    html = html.replace('TEMPS_TOTALE',     this.getTimeString(this.calcTotalTime(this.recipes[this.recipeFormGroups[index].value.recipe_id])));
    html = html.replace('INGREDIENT_LIST',  this.calcIngredientString(this.recipes[this.recipeFormGroups[index].value.recipe_id]));
    html = html.replace('INSTRUCTION_LIST', this.calcStepString(this.recipes[this.recipeFormGroups[index].value.recipe_id]));

    this.htmlToDisplay = html;
  }

  calcIngredientString(recipe: Recipe) : string {
    let val = '';
    for (let ingredient of recipe.ingredients){
      val += '<p> '+ ingredient.quantity +' '+ingredient.ingredient_unit+ ' ' +ingredient.ingredient_name +'</p>';
    }

    return val;
  }

  calcStepString(recipe: Recipe) : string {
    let val = '';
    for (let step of recipe.steps){
      val += '<p> '+ step.order+ ' - ' +step.content +'</p>';
    }

    return val;
  }

  calcTotalTime(recipe: Recipe): number {
    let total = 0;
    total += recipe.cooking_minutes;
    total += recipe.preparation_minutes;
    total += recipe.resting_minutes;
    total += recipe.cooking_hours * 60;
    total += recipe.preparation_hours * 60;
    total += recipe.resting_hours * 60;

    return total;
  }

  getTimeString(totalMin: number): string {
    let min = totalMin % 60;
    let hour = (totalMin - min ) / 60;
    if (hour !== 0){
      return hour + ' H '+ min + 'MIN';
    }else{
      return min + 'MIN';
    }
  }

  createBook(): void {
    let book = this.bookService.initBook();
    this.isLoading = true;

    this.bookService.postCover(this.coverPicture['data']).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body && httpReturn.body['url']) {
        book.name = this.firstFormGroup.value.name;
        book.price_euro = this.firstFormGroup.value.price_euro;
        book.description = this.secondFormGroup.value.description;
        book.cover_picture_path = httpReturn.body['url'];
        book.cover_path = this.templates.cover_pages[this.firstFormGroup.value.value].filename;
        book.description_path = this.templates.book_descriptions[this.secondFormGroup.value.value].filename;

        for ( let recipe of this.recipeFormGroups) {
          book.recipe_template.push({
            'recipe_id' : this.recipes[recipe.value.recipe_id].id,
            'template_path' : this.templates.recipes[recipe.value.value].filename,
            'recipe_name' : this.recipes[recipe.value.recipe_id].name,
            'thumbnail_path' : this.recipes[recipe.value.recipe_id].thumbnail.path,
            'portion_number' : this.recipes[recipe.value.recipe_id].portion_number.toString(),
            'portion_unit' : this.recipes[recipe.value.recipe_id].portion_unit,
            'total_time' : this.getTimeString(this.calcTotalTime(this.recipes[recipe.value.recipe_id])),
            'ingredient_list' : this.calcIngredientString(this.recipes[recipe.value.recipe_id]),
            'instruction_list' : this.calcStepString(this.recipes[recipe.value.recipe_id]),
          });
        }
        this.bookService.postBook(book).subscribe( httpReturn => {
          this.router.navigate(['/cook/book']);
        });
      }
    });
  }
}
