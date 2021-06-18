import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {Pagination} from '../../../shared/models/pagination';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  user: User;

  pagination: Pagination;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }


  ngOnInit(): void {
    this.pagination = {
      items: [],
      isLoading: false,
      theEnd: false,
      page: 0,
      perPage: 10
    };
  }

  loadData(): void {
    this.pagination.isLoading = true;
    this.pagination.page = this.pagination.page + 1;
    this.recipeService.getRecipesWall(this.pagination.perPage, this.pagination.page).subscribe(httpReturn => {
      if (httpReturn.body.length !== this.pagination.perPage) {
        this.pagination.theEnd = true;
      }
      this.pagination.items = [...this.pagination.items, ...httpReturn.body];
      this.pagination.isLoading = false;
    });
  }
}
