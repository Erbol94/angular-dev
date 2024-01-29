import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgkViewComponent } from './vgk-view.component';

describe('VgkViewComponent', () => {
  let component: VgkViewComponent;
  let fixture: ComponentFixture<VgkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VgkViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VgkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
