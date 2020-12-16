import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersnorouteComponent } from './customersnoroute.component';

describe('CustomersnorouteComponent', () => {
  let component: CustomersnorouteComponent;
  let fixture: ComponentFixture<CustomersnorouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersnorouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersnorouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
