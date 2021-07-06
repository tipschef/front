import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LikeChartComponent} from './like-chart.component';

describe('AnnualSalesChartComponent', () => {
  let component: LikeChartComponent;
  let fixture: ComponentFixture<LikeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
