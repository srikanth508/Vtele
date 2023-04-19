import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-medicalcertificate',
  templateUrl: './medicalcertificate.component.html',
  styleUrls: ['./medicalcertificate.component.css']
})
export class MedicalcertificateComponent implements OnInit {
  @Input() Details: any = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  patientName: any;
  mobileNumber: any;
  emailID: any;
  languageID: any;
  doctorID: any;
  loader: boolean | undefined;
  patientID: any;
  appointmentID: any;
  startDate: any;
  endDate: any;
  leaveTyepe: any;
  Scholldata: any;
  notes: any;
  todayDate: any;
  leavefor: any;
  messageID: any;
  startdate: any;
  enddate: any;
  checkPdfArray: any = [];
  popup: number = 0;
  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  labels: any;
  currentUrl: any;
  desc: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);

    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.startdate = this.labels.startDate;
    this.enddate = this.labels.endDate;
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.patientName = this.Details[0].pName;
    this.mobileNumber = this.Details[0].pMobileNo;
    this.emailID = this.Details[0].pEmail;
    this.loader = false;
  }


  getStartDate(startDate: any) {
    this.startDate = this.DoctorService.GetDates(startDate);
  }

  getendDate(endDate: any) {
    this.endDate = this.DoctorService.GetDates(endDate);
  }



  Getscholladate() {
    debugger
    debugger
    if (this.languageID == 6) {
      if (this.leaveTyepe == 1) {
        this.leavefor = 'École'
        this.Scholldata = 'Arrêt maladie (Ecole).'
      }
      if (this.leaveTyepe == 2) {
        debugger
        this.leavefor = 'Travail'
        this.Scholldata = 'un arrêt de travail.'
      }
    }
    else if (this.languageID == 1) {
      debugger
      if (this.leaveTyepe == 2) {
        this.leavefor = 'School'
        this.Scholldata = 'School'
      }
      if (this.leaveTyepe == 2) {
        this.leavefor = 'Office'
        this.Scholldata = 'Office'
      }
    }
  }


  formatdata() {
    this.popup = 1;

    if (this.languageID == 1) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>";
    }
    else {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + '</b></p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + this.leavefor + ' Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.Scholldata + '<br><br>' + 'Date de commencement : ' + this.startDate + ',<br><br>Date de fin : ' + this.endDate + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
    }
  }


  generateMedicalCertificate() {
    this.showLoader.emit();
    if (this.languageID == 1) {
      // </p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.' + this.notes;
    }
    else {
      // + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + '</b></p><p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + this.leavefor + ' Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.Scholldata + '<br><br>' + 'Date de commencement : ' + this.startDate + ',<br><br>Date de fin : ' + this.endDate + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.notes;
    }
    var entity = {
      'PatientID': this.patientID,
      'Ailment': this.notes,
      'FromDate': this.startDate,
      'ToDate': this.endDate,
      'SickSlipDate': this.todayDate,
      'Description': this.desc,
      'AppointmentID': this.appointmentID,
      'DoctorID': this.doctorID,
      'LeaveFor': this.Scholldata,
      'Mobiledescription': this.desc,
      'LanguageID': this.languageID
    }
    this.DoctorService.InsertSickSlipGenarator(entity).subscribe(data => {
      // this.close.emit(this.messageID = 1);
      this.generatepdff()
    }, error => {
      this.StopLoader.emit()
    })
  }





  generatepdff() {
    var entity = {
      "prescription": false,
      "diagnosticTest": false,
      "soapNotes": false,
      "medicalCertificate": true,
      "doctorReferals": false,
      "medicalQuestionare": false,
      "TypeID": true
    }
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }


}



