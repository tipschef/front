import {RecipeTemplate} from './recipe-template';

export interface Book {
  name?: string;
  description?: string;
  cover_path?: string;
  price_euro?: number;
  description_path?: string;
  cover_picture_path?: string;
  recipe_template?: RecipeTemplate[];
}
