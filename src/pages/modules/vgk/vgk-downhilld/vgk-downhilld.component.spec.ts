import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkDownhilldComponent } from './vgk-downhilld.component';

describe('VgkDownhilldComponent', () => {
  let component: VgkDownhilldComponent;
  let fixture: ComponentFixture<VgkDownhilldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkDownhilldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkDownhilldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
