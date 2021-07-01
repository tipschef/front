import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSubscriptionComponent } from './gift-subscription.component';

describe('GiftSubscriptionComponent', () => {
  let component: GiftSubscriptionComponent;
  let fixture: ComponentFixture<GiftSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
