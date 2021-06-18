import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../shared/models/recipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.recipe);
  }

  redirect(): void {
    if (this.recipe.can_be_seen){
      this.router.navigate(['/recipe/' + this.recipe.id]);
    }else {
      // TODO : Redirection vers la page de subscription
      this.router.navigate(['/home/' ]);
    }
  }
}
