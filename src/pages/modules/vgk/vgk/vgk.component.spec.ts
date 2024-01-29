import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkComponent } from './vgk.component';

describe('VgkComponent', () => {
  let component: VgkComponent;
  let fixture: ComponentFixture<VgkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
