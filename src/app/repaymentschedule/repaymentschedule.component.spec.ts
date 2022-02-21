import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentscheduleComponent } from './repaymentschedule.component';

describe('RepaymentscheduleComponent', () => {
  let component: RepaymentscheduleComponent;
  let fixture: ComponentFixture<RepaymentscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepaymentscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
