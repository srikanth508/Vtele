import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrdersReportComponent } from './return-orders-report.component';

describe('ReturnOrdersReportComponent', () => {
  let component: ReturnOrdersReportComponent;
  let fixture: ComponentFixture<ReturnOrdersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnOrdersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
