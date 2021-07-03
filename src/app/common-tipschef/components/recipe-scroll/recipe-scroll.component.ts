import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, Output} from '@angular/core';
import {RecipeCardComponent} from '../recipe-card/recipe-card.component';
import {RecipeService} from '../../../shared/services/recipe/recipe.service';
import {Recipe} from '../../../shared/models/recipe';
import { EventEmitter } from '@angular/core';
import {Pagination} from '../../../shared/models/pagination';



@Component({
  selector: 'app-recipe-scroll',
  templateUrl: './recipe-scroll.component.html',
  styleUrls: ['./recipe-scroll.component.css']
})
export class RecipeScrollComponent implements OnInit, AfterViewInit  {
  cardSize = 530;
  @Input() pagination: Pagination;

  @Output() loadData = new EventEmitter();



  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData.emit();
  }

  getEnd(): number{
    return this.cardSize * this.pagination.perPage * this.pagination.page;
  }


  @HostListener('window:scroll', ['$event'])
  checkPosition(event): void {
    if ( window.scrollY / this.getEnd() > 0.6 && this.pagination.isLoading === false && this.pagination.theEnd === false){
      this.loadData.emit();
    }
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
