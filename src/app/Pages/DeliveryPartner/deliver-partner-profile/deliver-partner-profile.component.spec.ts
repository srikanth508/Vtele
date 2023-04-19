import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverPartnerProfileComponent } from './deliver-partner-profile.component';

describe('DeliverPartnerProfileComponent', () => {
  let component: DeliverPartnerProfileComponent;
  let fixture: ComponentFixture<DeliverPartnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverPartnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverPartnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
