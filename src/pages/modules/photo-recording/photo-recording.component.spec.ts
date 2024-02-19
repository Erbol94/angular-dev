import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoRecordingComponent } from './photo-recording.component';

describe('PhotoRecordingComponent', () => {
  let component: PhotoRecordingComponent;
  let fixture: ComponentFixture<PhotoRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoRecordingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
