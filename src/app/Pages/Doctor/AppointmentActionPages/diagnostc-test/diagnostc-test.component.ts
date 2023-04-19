import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-diagnostc-test',
  templateUrl: './diagnostc-test.component.html',
  styleUrls: ['./diagnostc-test.component.css'],
})
export class DiagnostcTestComponent implements OnInit {
  @Input() Details: any = [];

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();

  testsName: any;
  SerachtestOn: any;
  testsname: any;
  loader: boolean | undefined;
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  testList: any;
  showTest: any;
  tableCount: any;
  idcount: any;
  clinicalInfo: any;
  diagnosticArray: any = [];
  messageID: any;
  diagnosticTestName: any;
  diaManualtestArray: any = [];
  showManualtest: any;
  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}
  labels: any;
  checkPdfArray: any = [];
  currentUrl: any;

  ngOnInit(): void {
    // this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log('Appointment List', this.Details);

    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.getDiagnosticTests();
    this.idcount = 0;
    this.showTest = 0;
    this.diagnosticArray.length = 0;
    this.diaManualtestArray.length = 0;
    this.tableCount = 0;
    this.showManualtest = 0;
  }

  public getDiagnosticTests() {
    this.DoctorService.GetDiagnosticTestMasterByTestIDByLanguageID(
      1,
      this.languageID
    ).subscribe(
      (data) => {
        this.testList = data;
        this.testList[0]['checked'] = false;
      },
      (error) => {
        this.loader = false;
        this.StopLoader.emit();
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnosticTestMasterByTestIDByLanguageID',
          error
        );
      }
    );
  }

  public SearchTestname(testsName: any) {
    debugger;
    if (testsName == '') {
      this.SerachtestOn = 0;
      this.showTest = 0;
    } else {
      this.SerachtestOn = 1;
    }
  }

  testDatabase() {
    this.showTest = 1;
  }
  manuallyWritten() {
    this.showTest = 2;
  }

  public adddetails(code: any) {
    this.tableCount = 1;
    var entity = {
      Sno: this.idcount,
      DiagnosticTestTypeID: code.testtypeid,
      DiagnosticTestName: code.short,
      DiagnosticTestTypeName: code.name,
      TestName: code.short,
      TestID: code.id,
      ClinicalInfo: this.clinicalInfo,
    };
    this.diagnosticArray.push(entity);
    debugger;
    this.idcount = this.idcount + 1;
  }

  public delete(Sno: any) {
    for (let i = 0; i < this.diagnosticArray.length; i++) {
      if (Sno == this.diagnosticArray[i].Sno) {
        this.diagnosticArray.splice(i, 1);
      }
    }
  }

  insertDiagnostictDetails() {
    debugger;
    this.showLoader.emit();
    for (let i = 0; i < this.diagnosticArray.length; i++) {
      debugger;
      var entity = {
        DoctorID: this.doctorID,
        PateintID: this.patientID,
        DiagnosticTestTypeID: this.diagnosticArray[i].DiagnosticTestTypeID,
        DiagnosticTestName: this.diagnosticArray[i].DiagnosticTestName,
        LanguageID: this.languageID,
        AppointmentID: this.appointmentID,
        TestsID: this.diagnosticArray[i].TestID,
        ClinicalInfo: 0,
      };
      this.DoctorService.InsertDoctor_PatientDiagnostics(entity).subscribe(
        async (data) => {
          if (data != 0) {
            debugger;
          }
        },
        (error) => {
          this.StopLoader.emit();
        }
      );
    }
    this.SharedService.sendSms(this.Details[0], 41, 1);

    setTimeout(() => {
      this.generatepdff();
    }, 1000);

    this.diagnosticArray.length = 0;
    this.tableCount = 0;
    //  this.close.emit(this.messageID = 57);
  }

  generatepdff() {
    var entity = {
      prescription: false,
      diagnosticTest: true,
      soapNotes: false,
      medicalCertificate: false,
      doctorReferals: false,
      medicalQuestionare: false,
      TypeID: true,
    };
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }

  addManuallyTests() {
    this.showManualtest = 1;
    var entity = {
      Sno: this.idcount,
      DiagnosticTestTypeID: 0,
      DiagnosticTestName: this.diagnosticTestName,
      DiagnosticTestTypeName: '',
      TestName: this.diagnosticTestName,
      TestID: 0,
      ClinicalInfo: this.clinicalInfo,
    };
    this.diaManualtestArray.push(entity);
    this.idcount = this.idcount + 1;
  }

  public deleteDiagnostic(Sno: any) {
    for (let i = 0; i < this.diaManualtestArray.length; i++) {
      if (Sno == this.diaManualtestArray[i].Sno) {
        this.diaManualtestArray.splice(i, 1);
      }
    }
  }

  insertDignosticManualTest() {
    this.showLoader.emit();
    for (let i = 0; i < this.diaManualtestArray.length; i++) {
      var entity = {
        DoctorID: this.doctorID,
        PateintID: this.patientID,
        DiagnosticTestTypeID: 1,
        DiagnosticTestName: this.diaManualtestArray[i].DiagnosticTestName,
        LanguageID: this.languageID,
        AppointmentID: this.appointmentID,
        TestsID: 59,
        ClinicalInfo: 0,
      };
      this.DoctorService.InsertDoctor_PatientDiagnostics(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.StopLoader.emit();
        }
      );
    }

    this.diaManualtestArray.length = 0;
    this.tableCount = 0;
    this.SharedService.sendSms(this.Details[0], 41, 1);
    this.generatepdff();
    // this.close.emit(this.messageID = 57);
  }
}
