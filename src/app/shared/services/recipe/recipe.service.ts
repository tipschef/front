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

  postThumbnail(recipeId: number, thumbnail: File): Observable<HttpResponse<Media>> {
    const url = this.constantsService.getConstant('RECIPE_THUMBNAIL');
    const headers = {
      'Authorization': `Bearer ${this.authService.authData.access_token}`
    };
    let formData: FormData = new FormData();
    formData.append('thumbnail', thumbnail);

    return this.http.post<Media>(url + recipeId +'/', formData, {headers, observe: 'response'});
  }

  postVideo(recipeId: number, video: File): Observable<HttpResponse<Media>> {
    const url = this.constantsService.getConstant('RECIPE_VIDEO');
    const headers = {
      'Authorization': `Bearer ${this.authService.authData.access_token}`
    };
    let formData: FormData = new FormData();
    formData.append('video', video);

    return this.http.post<Media>(url + recipeId +'/', formData, {headers, observe: 'response'});
  }


  deleteMedias(recipeId: number, medias: Media[]): Observable<HttpResponse<any>>{
    const url = this.constantsService.getConstant('RECIPE_MEDIA');
    const headers = {
      'Authorization': `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.put<any>(url + recipeId + '/', medias, {headers, observe: 'response'});
  }

  getAllRecipeCreatedByUser(): Observable<HttpResponse<Array<Recipe>>> {
    const url = this.constantsService.getConstant('RECIPE_CREATOR');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<Recipe>>(url, {headers, observe: 'response'});
  }

  updateRecipe(recipe: Recipe): Observable<HttpResponse<Recipe>> {
    const url = this.constantsService.getConstant('RECIPE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.patch<Recipe>(url + recipe.id+'/', recipe, {headers, observe: 'response'});
  }

  getRecipeById(recipe_id: number) : Observable<HttpResponse<Recipe>>{
    const url = this.constantsService.getConstant('RECIPE');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<Recipe>(url + recipe_id + '/', {headers, observe: 'response'});
  }

  deleteRecipe(recipe_id: number): Observable<HttpResponse<any>>{
    const url = this.constantsService.getConstant('RECIPE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.delete<any>(url + recipe_id, {headers, observe: 'response'});
  }

  getRecipesFromUsername(username: string, per_page: number, page: number): Observable<HttpResponse<Array<Recipe>>>{
    const url = this.constantsService.getConstant('USER');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<Recipe>>(url + username+'/recipes/?per_page='+per_page+'&page='+page, {headers,observe: 'response'});
  }
}
