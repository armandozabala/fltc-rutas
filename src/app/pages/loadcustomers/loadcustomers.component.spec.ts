import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadcustomersComponent } from './loadcustomers.component';

describe('LoadcustomersComponent', () => {
  let component: LoadcustomersComponent;
  let fixture: ComponentFixture<LoadcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
