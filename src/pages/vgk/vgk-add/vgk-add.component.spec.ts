import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkAddComponent } from './vgk-add.component';

describe('VgkAddComponent', () => {
  let component: VgkAddComponent;
  let fixture: ComponentFixture<VgkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
