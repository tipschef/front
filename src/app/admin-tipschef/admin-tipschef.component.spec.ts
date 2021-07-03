import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipschefComponent } from './admin-tipschef.component';

describe('AdminTipschefComponent', () => {
  let component: AdminTipschefComponent;
  let fixture: ComponentFixture<AdminTipschefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTipschefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTipschefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
