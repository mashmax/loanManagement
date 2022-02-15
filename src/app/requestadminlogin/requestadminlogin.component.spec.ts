import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestadminloginComponent } from './requestadminlogin.component';

describe('RequestadminloginComponent', () => {
  let component: RequestadminloginComponent;
  let fixture: ComponentFixture<RequestadminloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestadminloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestadminloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
