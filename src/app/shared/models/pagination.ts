import {Recipe} from './recipe';

export interface Pagination {
  items: Recipe[];
  isLoading: boolean;
  theEnd: boolean;
  perPage: number;
  page: number;
}
