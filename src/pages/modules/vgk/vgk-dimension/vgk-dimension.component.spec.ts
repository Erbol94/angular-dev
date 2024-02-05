import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkDimensionComponent } from './vgk-dimension.component';

describe('VgkDimensionComponent', () => {
  let component: VgkDimensionComponent;
  let fixture: ComponentFixture<VgkDimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkDimensionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
