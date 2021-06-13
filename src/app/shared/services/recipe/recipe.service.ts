/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {Recipe} from '../../models/recipe';
import {RecipeCategory} from '../../models/recipe-category';
import {Observable} from 'rxjs';
import {RecipeCookingType} from '../../models/recipe-cooking-type';
import {AuthService} from '../auth/auth.service';
import {Media} from '../../models/media';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) {
  }

  init_recipe(): Recipe {
    return {
      min_tier: 0,
      name: '',
      description: '',
      steps: [],
      portion_number: 0,
      portion_unit: '',
      preparation_hours: 0,
      preparation_minutes: 0,
      cooking_hours: 0,
      cooking_minutes: 0,
      resting_hours: 0,
      resting_minutes: 0,
      difficulty: 0,
      cost: 0,
      recipe_category_id: 0,
      recipe_cooking_type_id: 0,
      medias: [],
      ingredients: [],
    };
  }

  getAllRecipeCategories(): Observable<HttpResponse<Array<RecipeCategory>>> {
    const url = this.constantsService.getConstant('RECIPE_CATEGORY');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<RecipeCategory>>(url, {headers, observe: 'response'});
  }

  getAllRecipeCookingTypes(): Observable<HttpResponse<Array<RecipeCookingType>>> {
    const url = this.constantsService.getConstant('RECIPE_COOKING_TYPE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<RecipeCookingType>>(url, {headers, observe: 'response'});
  }

  postRecipe(recipe: Recipe): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('RECIPE');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.post<any>(url, recipe, {headers, observe: 'response'});
  }

  postMedias(recipeId: number, medias: File[]): Observable<HttpResponse<Array<Media>>> {
    const url = this.constantsService.getConstant('RECIPE_MEDIA');
    const headers = {
      'Authorization': `Bearer ${this.authService.authData.access_token}`
    };
    let formData: FormData = new FormData();
    for (const file of medias) {
      formData.append('files', file);
    }

    return this.http.post<Array<Media>>(url + recipeId +'/', formData, {headers, observe: 'response'});
  }

  getAllRecipeCreatedByUser(): Observable<HttpResponse<Array<Recipe>>> {
    const url = this.constantsService.getConstant('RECIPE_CREATOR');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<Recipe>>(url, {headers, observe: 'response'});
  }
}
