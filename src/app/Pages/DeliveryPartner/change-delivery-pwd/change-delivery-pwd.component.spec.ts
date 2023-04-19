import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeliveryPwdComponent } from './change-delivery-pwd.component';

describe('ChangeDeliveryPwdComponent', () => {
  let component: ChangeDeliveryPwdComponent;
  let fixture: ComponentFixture<ChangeDeliveryPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDeliveryPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDeliveryPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
