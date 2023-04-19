import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRevenueComponent } from './delivery-revenue.component';

describe('DeliveryRevenueComponent', () => {
  let component: DeliveryRevenueComponent;
  let fixture: ComponentFixture<DeliveryRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
