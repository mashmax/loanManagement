import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedloanComponent } from './appliedloan.component';

describe('AppliedloanComponent', () => {
  let component: AppliedloanComponent;
  let fixture: ComponentFixture<AppliedloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
