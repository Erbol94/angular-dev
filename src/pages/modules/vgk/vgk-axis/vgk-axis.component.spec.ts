import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkAxisComponent } from './vgk-axis.component';

describe('VgkAxisComponent', () => {
  let component: VgkAxisComponent;
  let fixture: ComponentFixture<VgkAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkAxisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
