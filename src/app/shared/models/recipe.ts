import {Media} from './media';
import {Step} from './step';
import {Ingredient} from './ingredient';

export interface Recipe {
  id?: number;
  min_tier?: number;
  name?: string;
  description?: string;
  thumbnail?: Media;
  video?: Media;
  steps?: Step[];
  creator_id?: number;
  creator_username?: string;
  creator_icon?: string;
  last_updated?: Date;
  created_date?: Date;
  portion_number?: number;
  portion_unit?: string;
  preparation_hours?: number;
  preparation_minutes?: number;
  cooking_hours?: number;
  cooking_minutes?: number;
  resting_hours?: number;
  resting_minutes?: number;
  difficulty?: number;
  cost?: number;
  recipe_category_id?: number;
  recipe_cooking_type_id?: number;
  can_be_seen?: boolean;
  medias?: Media[];
  ingredients?: Ingredient[];
}
