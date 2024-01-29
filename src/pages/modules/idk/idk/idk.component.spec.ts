import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdkComponent } from './idk.component';

describe('IdkComponent', () => {
  let component: IdkComponent;
  let fixture: ComponentFixture<IdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
