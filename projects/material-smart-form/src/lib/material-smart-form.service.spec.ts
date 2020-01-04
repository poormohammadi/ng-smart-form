import { TestBed } from '@angular/core/testing';

import { MaterialSmartFormService } from './material-smart-form.service';

describe('MaterialSmartFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialSmartFormService = TestBed.get(MaterialSmartFormService);
    expect(service).toBeTruthy();
  });
});
