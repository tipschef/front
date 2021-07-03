import {MediaCategory} from './media-category';

export interface Media {
  id?: number;
  path?: string;
  is_deleted?: boolean;
  created_date?: Date;
  media_category?: MediaCategory;
  file?: File;
}
