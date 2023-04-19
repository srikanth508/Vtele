import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPatnerReportsComponent } from './delivery-patner-reports.component';

describe('DeliveryPatnerReportsComponent', () => {
  let component: DeliveryPatnerReportsComponent;
  let fixture: ComponentFixture<DeliveryPatnerReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPatnerReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPatnerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
