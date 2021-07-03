import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeScrollComponent } from './recipe-scroll.component';

describe('RecipeScrollComponent', () => {
  let component: RecipeScrollComponent;
  let fixture: ComponentFixture<RecipeScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
