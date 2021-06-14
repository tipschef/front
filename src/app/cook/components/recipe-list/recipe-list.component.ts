import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {Recipe} from '../../../shared/models/recipe';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {RecipeCategory} from '../../../shared/models/recipe-category';
import {RecipeCookingType} from '../../../shared/models/recipe-cooking-type';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, AfterViewInit {

  recipes: Array<Recipe> | null = [];

  displayedColumns: Array<string> | null = ['name', 'difficulty', 'cost', 'recipe_category_id', 'recipe_cooking_type_id', 'created_date', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  recipeCategories: RecipeCategory[];
  recipeCookingTypes: RecipeCookingType[];

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipeCategories().subscribe(httpResponse => {
      this.recipeCategories = httpResponse.body;
    });

    this.recipeService.getAllRecipeCookingTypes().subscribe(httpResponse => {
      this.recipeCookingTypes = httpResponse.body;
    });
  }

  recipeCat(val: number): string {
    for (const recipeCategory of this.recipeCategories) {
      if (recipeCategory.id === val) {
        return recipeCategory.name;
      }
    }
    return '';
  }

  recipeCookingType(val: number): string {
    for (const cookingType of this.recipeCookingTypes) {
      if (cookingType.id === val) {
        return cookingType.name;
      }
    }
    return '';
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.recipeService.getAllRecipeCreatedByUser().subscribe(httpReturn => {
      if (httpReturn.body != null && httpReturn.body) {
        this.recipes = httpReturn.body;
        this.dataSource = new MatTableDataSource(this.recipes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource != null) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator != null) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  updateRecipe(recipe): void {
    // tslint:disable-next-line:object-literal-shorthand
    this.router.navigate(['/cook/recipe-create', {recipe_id: recipe.id}]);
  }

  deleteRecipe(recipe): void {
    this.recipeService.deleteRecipe(recipe.id).subscribe(httpReturn => {
      this.loadData();
    });
  }
}
