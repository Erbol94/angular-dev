import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdkAddComponent } from './idk-add.component';

describe('IdkAddComponent', () => {
  let component: IdkAddComponent;
  let fixture: ComponentFixture<IdkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdkAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
