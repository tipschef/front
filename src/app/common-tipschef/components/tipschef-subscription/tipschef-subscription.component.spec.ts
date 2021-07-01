import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipschefSubscriptionComponent } from './tipschef-subscription.component';

describe('TipschefSubscriptionComponent', () => {
  let component: TipschefSubscriptionComponent;
  let fixture: ComponentFixture<TipschefSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipschefSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipschefSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
