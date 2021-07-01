import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowChartComponent } from './follow-chart.component';

describe('FollowChartComponent', () => {
  let component: FollowChartComponent;
  let fixture: ComponentFixture<FollowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
