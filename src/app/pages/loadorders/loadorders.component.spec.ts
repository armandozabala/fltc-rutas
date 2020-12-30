import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadordersComponent } from './loadorders.component';

describe('LoadordersComponent', () => {
  let component: LoadordersComponent;
  let fixture: ComponentFixture<LoadordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
