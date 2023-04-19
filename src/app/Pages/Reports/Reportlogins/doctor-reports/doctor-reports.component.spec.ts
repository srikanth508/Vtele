import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReportsComponent } from './doctor-reports.component';

describe('DoctorReportsComponent', () => {
  let component: DoctorReportsComponent;
  let fixture: ComponentFixture<DoctorReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
