import { TestBed } from '@angular/core/testing';

import { PhotoRecordingService } from './photo-recording.service';

describe('PhotoRecordingService', () => {
  let service: PhotoRecordingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoRecordingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
