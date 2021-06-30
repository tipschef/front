import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountInformationComponent } from './bank-account-information.component';

describe('BankAccountInformationComponent', () => {
  let component: BankAccountInformationComponent;
  let fixture: ComponentFixture<BankAccountInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
