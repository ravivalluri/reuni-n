import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { DanceClassService } from './dance-class.service';

describe('DanceClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DanceClassService]
    });
  });

  it('should be created', inject([DanceClassService], (service: DanceClassService) => {
    expect(service).toBeTruthy();
  }));
});
