import { TestBed } from '@angular/core/testing';

import { GoogleCalanderService } from './google-calander.service';

describe('GoogleCalanderService', () => {
  let service: GoogleCalanderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleCalanderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
