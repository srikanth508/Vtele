import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyReturnordersComponent } from './pharmacy-returnorders.component';

describe('PharmacyReturnordersComponent', () => {
  let component: PharmacyReturnordersComponent;
  let fixture: ComponentFixture<PharmacyReturnordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyReturnordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyReturnordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
