import {Media} from './media';
import {Step} from './step';

export interface Recipe {
  id?: number;
  min_tier?: number;
  name?: string;
  description?: string;
  thumbnail?: Media;
  video?: Media;
  steps?: Step[];
  creator_id?: number;
  last_updated?: Date;
  created_at?: Date;
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
  medias?: Media[];
}
