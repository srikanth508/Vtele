import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';

@Component({
  selector: 'app-doctor-referals',
  templateUrl: './doctor-referals.component.html',
  styleUrls: ['./doctor-referals.component.css']
})
export class DoctorReferalsComponent implements OnInit {
  doctCountryID: any;
  doctcityID: any;
  doctTypeID: any;
  cityname: any;
  country: any;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService, private MasterService: MasterService) { }
  @Input() Details: any = [];

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() Message: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  patientName: any;
  mobileNumber: any;
  emailID: any;
  languageID: any;
  doctorID: any;
  loader: boolean | undefined;
  patientID: any;
  appointmentID: any;
  todayDate: any;
  referaltypeid: any;
  departmentid: any;
  departmentList: any;
  referDoctorList: any;
  docdd = {};
  referDoctorID: any;
  doctorName: any;
  doctorMobileNumber: any;
  doctorEmailID: any;
  referalNotes: any;
  hospitalClinicName: any;
  labels: any;
  selectdoctor: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  checkPdfArray: any = [];

  ngOnInit(): void {
    // this.loader = true;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    debugger
    this.todayDate = formatDate(myDate, format, locale);
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectdoctor = this.labels.selectDoctor;
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.patientName = this.Details[0].pName;
    this.mobileNumber = this.Details[0].pMobileNo;
    this.emailID = this.Details[0].pEmail;
    this.hospitalClinicName = this.Details[0].hospital_ClinicName,
      this.doctorName = this.Details[0].doctorName,
      this.doctorMobileNumber = this.Details[0].docMobileNumber,
      this.doctCountryID = this.Details[0].docCountryID,
      this.doctcityID = this.Details[0].docCityID,
      this.doctTypeID = this.Details[0].docDoctorType
    this.departmentid = 0;
    this.getDepartmentMaster();
    this.getDoctors();
    this.getprobincelist()


    if (this.languageID == 1) {
      this.referalNotes = " DATE: " + this.todayDate + "<br><p>SUBJECT : Referral To " + this.doctorName + "</p > <p>RE: Mr. " + this.patientName + "<p>&nbsp;</p> <p>i am referring my patient " + this.patientName + " for review of his new onset.<p>&nbsp;</p > <p>Thank you In advance for attending to the patients's health needs</p><p>" + this.doctorName + "<br>" + this.doctorMobileNumber + "</p><p>Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientName + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todayDate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorName + "<br>" + this.doctorMobileNumber + "<br>" + this.hospitalClinicName + "</p>"
    }
    else if (this.languageID == 6) {
      this.referalNotes = " DATE :" + this.todayDate + "OBJET : Lettre de recommandation <br> Cher(e) confrère (consœur), Je vous réfère le patient  " + this.patientName + "<p>Pour le(s) motif(s) et diagnostic(s) suivant(s) : " + "<p>Vous remerciant, je vous prie d’agréer, mon cher confrère (consœur) mes salutations les meilleures.<br><br>" + this.doctorName + "<br>" + this.doctorMobileNumber + "<br>" + this.hospitalClinicName + "</p>"
    }
  }

  dummrefelist: any

  getDoctors() {
    this.DoctorService.GetDoctorForAdminByLanguageID(this.languageID).subscribe(
      data => {

        this.referDoctorList = data.filter((x: { referealBit: number; }) => x.referealBit == 1)
        this.dummrefelist = data.filter((x: { referealBit: number; }) => x.referealBit == 1)

        this.docdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',

          allowSearchFilter: true,
          searchPlaceholderText: this.labels.search,
          closeDropDownOnSelection: true

        };
      }, error => {

      }
    )
  }



  public getDepartmentMaster() {

    this.DoctorService.GetDepartmentMasterByLanguageID(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.departmentList = data;
      }, error => {
      }
    )
  }


  public GetReferencetypeID(even: any) {

    this.referaltypeid = even.target.value;
    if (this.referaltypeid == '2') {
      // this.doctorname = "",
      //   this.doctoremail = "",
      //   this.docphoneno = ""
      this.doctorName = "";
      this.doctorEmailID = "";
      this.doctorMobileNumber = "";
    }
  }


  public GetDepartmentID(even: any) {
    debugger;
    this.departmentid = even.target.value;

    this.referDoctorList = this.dummrefelist.filter((x: { departmentID: any; }) => x.departmentID == this.departmentid)
  }

  public GetDoctorID(item: any) {

    this.referDoctorID = item.id
  }




  files1: File[] = [];
  attchmentUrl: any = [];
  onSelectAttchment(event: any) {
    // this.showLoader.emit();
    // this.loader = true;
    console.log(event);
    debugger
    this.files1.push(...event.addedFiles);
    this.uploadAttachments()

  }


  public uploadAttachments() {
    let folder = this.patientID + '/' + 'SoapNotes'
    this.DoctorService.UploadPatientDocuments(this.files1, folder).subscribe(res => {

      this.attchmentUrl.push(res);
      // this.loader = false;
      this.Message.emit(11);
    }, error => {
      this.StopLoader.emit()
    })
    // this.sendattachment();
  }

  mobilereferalnotes: any;
  onAttachmentRemove(event: any) {
    console.log(event);
    this.attchmentUrl.splice(this.files1.indexOf(event), 1);
  }


  insertReferals() {
    debugger
    let doc = document.getElementById("qwerty") as HTMLElement;
    doc.innerHTML = this.referalNotes;
    debugger
    this.mobilereferalnotes = doc.innerText;
    debugger
    this.showLoader.emit()
    var entity = {
      'ReferalTypeID': this.referaltypeid,
      'AppointmentID': this.appointmentID,
      'PatientID': this.patientID,
      'PatientName': this.patientName,
      'DoctorID': this.referDoctorID,
      'DoctorName': this.doctorName,
      'DoctorEmail': this.doctorEmailID,
      'DoctorPhNo': this.doctorMobileNumber,
      'ReferalNotes': this.referalNotes,
      'AssignDoctorID': this.doctorID,
      'MobileReferalNotes': this.mobilereferalnotes,
      'soapbit': 0,
      'Hospital_ClinicID': this.Details[0].hospital_ClinicID,
      'DoctorHospitalDetailsID': this.Details[0].doctorHospitalDetailsID,
      'LanguageID': this.languageID
    }
    this.DoctorService.InsertDoctorReferals(entity).subscribe(async data => {
      if (data != 0) {
        await this.SharedService.sendSms(this.Details[0], 44, 1);
        await this.InsertDoctorRefererlas();
        await this.sendmail1();
        //this.close.emit(this.messageID = 1);
        this.generatepdff()

      }
    }, error => {
      this.StopLoader.emit()
    })
  }





  async InsertDoctorRefererlas() {
    for (let i = 0; i < this.attchmentUrl.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentID,
        'PatientID': this.patientID,
        'AttachmentUrl': this.attchmentUrl[i],
      }
      this.DoctorService.InsertDoctorReferalAttachments(entity).subscribe(async data => {

        if (data != 0) {

        }
      }, error => {
        this.StopLoader.emit()
      })
    }

  }




  generatepdff() {
    var entity = {
      "prescription": false,
      "diagnosticTest": false,
      "soapNotes": false,
      "medicalCertificate": false,
      "doctorReferals": true,
      "medicalQuestionare": false,
      "TypeID": true
    }
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }



  cclist: any = [];
  bcclist: any = [];


  public sendmail1() {
    if (this.languageID == 1) {
      var desc = this.referalNotes + "<br>" + "Welcome to Voiladoc. If you would like to know more about Voiladoc and wish to join the Voiladoc network as a provider, please click on this link, https://voiladoc.ma/professionnel-de-sante/ or call 522446145."

    }
    else {
      var desc = this.referalNotes + "<br>" + "Bienvenue sur Voiladoc. Si vous souhaitez en savoir plus sur Voiladoc et souhaitez rejoindre le réseau Voiladoc en tant que prestataire, veuillez cliquer sur ce lien, https://voiladoc.ma/professionnel-de-sante/ ou appeler le 522446145."

    }
    var entity = {
      'emailto': this.doctorEmailID,
      'emailsubject': '' + this.doctorName,
      'emailbody': desc + "<br><br>",
      'attachmenturl': this.attchmentUrl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.DoctorService.sendemail(entity).subscribe(async data => {

    }, error => {
      this.StopLoader.emit()
    })
  }




  valid: boolean | undefined

  public isValidEmail(emailString: string): boolean {
    debugger
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      this.valid = pattern.test(emailString);
      debugger
      return this.valid;


    } catch (TypeError) {
      return false;
    }
  }
  public getprobincelist() {
    debugger;
    this.MasterService.GetCityMasterByLangID(this.languageID).subscribe(
      data => {
        let provincelist = data;
        var list = provincelist.filter((x: { id: any; }) => x.id == this.doctcityID);
        this.country = list[0].country,
        this.cityname = list[0].short

      }, error => {

      }
    )
  }
}
