import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkPhotoComponent } from './vgk-photo.component';

describe('VgkPhotoComponent', () => {
  let component: VgkPhotoComponent;
  let fixture: ComponentFixture<VgkPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkPhotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
