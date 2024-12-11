import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualexpensesComponent } from './annualexpenses.component';

describe('AnnualexpensesComponent', () => {
  let component: AnnualexpensesComponent;
  let fixture: ComponentFixture<AnnualexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualexpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
