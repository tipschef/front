import {RecipeTemplate} from './recipe-template';

export interface Book {
  name?: string;
  description?: string;
  cover_path?: string;
  description_path?: string;
  cover_picture_path?: string;
  recipe_template?: RecipeTemplate[];
}
