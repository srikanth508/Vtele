import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPartnerAppointmentsComponent } from './delivery-partner-appointments.component';

describe('DeliveryPartnerAppointmentsComponent', () => {
  let component: DeliveryPartnerAppointmentsComponent;
  let fixture: ComponentFixture<DeliveryPartnerAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPartnerAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPartnerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
