import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdkViewComponent } from './idk-view.component';

describe('IdkViewComponent', () => {
  let component: IdkViewComponent;
  let fixture: ComponentFixture<IdkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdkViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
