import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoRecordingViewComponent } from './photo-recording-view.component';

describe('PhotoRecordingViewComponent', () => {
  let component: PhotoRecordingViewComponent;
  let fixture: ComponentFixture<PhotoRecordingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoRecordingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoRecordingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
