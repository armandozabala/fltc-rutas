import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernoorderComponent } from './customernoorder.component';

describe('CustomernoorderComponent', () => {
  let component: CustomernoorderComponent;
  let fixture: ComponentFixture<CustomernoorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomernoorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomernoorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
