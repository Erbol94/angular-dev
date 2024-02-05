import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkVehicleTstkComponent } from './vgk-vehicle-tstk.component';

describe('VgkVehicleTstkComponent', () => {
  let component: VgkVehicleTstkComponent;
  let fixture: ComponentFixture<VgkVehicleTstkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkVehicleTstkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkVehicleTstkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
