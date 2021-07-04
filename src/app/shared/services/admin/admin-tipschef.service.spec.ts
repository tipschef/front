import { TestBed } from '@angular/core/testing';

import { AdminTipschefService } from './admin-tipschef.service';

describe('AdminTipschefService', () => {
  let service: AdminTipschefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTipschefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
