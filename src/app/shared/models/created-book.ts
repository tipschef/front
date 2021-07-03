import {Recipe} from './recipe';

export interface CreatedBook {
  price_euro?: number;
  id?: number;
  title?: string;
  description?: string;
  is_creating?: boolean;
  path?: string;
  number_of_recipe?: number;
  recipes?: Recipe[];
  creator_id?: number;
}
