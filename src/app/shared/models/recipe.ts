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
}
