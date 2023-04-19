import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
declare var window: any;
import Labels from '../../../Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  typeID: any;

  @Input() Details: any = [];
  languageID: any;
  doctorTemplateList: any;
  doctorID: any;
  sig: any;
  dispenseQuantity: any;
  howManyRefills: any;
  noteToPharmacist: any;
  saveAsTemplate: boolean | undefined;
  substistuePermitted: any;
  templateID: any;
  manuallyEnter: boolean | undefined;
  drugNameList: any;
  medicineName: any;
  medicineArray: any = [];
  showTable: boolean | undefined;
  idcount: Number | undefined;
  patientID: Number | undefined;
  appointmentID: Number | undefined;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  templateName: any;
  labels: any;
  checkPdfArray: any = [];
  labels1: any;
  pdfprslist: any;
  currentUrl:any;

  ngOnInit(): void {
    // this.loader = true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    debugger
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    debugger
    this.GetDoctorPrescrptionTemplates();
    this.GetDrugnamemaster();
    this.manuallyEnter = false;
    this.saveAsTemplate = false;
    this.idcount = 1;
this.substistuePermitted=1
  }



  public GetDoctorPrescrptionTemplates() {

    this.DoctorService.GetDoctorPrescrptionTemplates().subscribe(
      data => {
        this.doctorTemplateList = data.filter(x => x.doctorID == this.doctorID)
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorPrescrptionTemplates",error);
      }
    )
  }

  GetDoctorPrecriptioTemplateID(even: any) {

    if (even.target.value != 0) {
      this.templateID = even.target.value;
      var list = this.doctorTemplateList.filter((x: { id: any; }) => x.id == this.templateID);
      this.medicineName = list[0].drugName,
        this.dispenseQuantity = list[0].dispencequnatity,
        this.noteToPharmacist = list[0].noteToPharmacist
      this.howManyRefills = list[0].howManyRefils
      this.substistuePermitted = list[0].substainablenotPermitted
      this.sig = list[0].sig

    }
    else {
      this.medicineName = "";
      this.sig = "";
      this.noteToPharmacist = "";
      this.howManyRefills = "";
      this.dispenseQuantity = "";
      this.substistuePermitted = 0;
    }


  }


  public GetDrugnamemaster() {

    this.DoctorService.GetDrugNameMaster(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.drugNameList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDrugNameMaster",error);
      }
    )
  }



  SerachOn: any;
  public SerchDrugName(mediciName: any) {

    if (mediciName == "") {
      this.SerachOn = 0;
    }
    else {
      this.SerachOn = 1;
    }
  }


  public GetDrugID(code: any) {

    this.medicineName = code.medicinename;
    this.SerachOn = 0
  }



  addPrescription() {
    this.showTable = true;
    var entity = {
      'Sno': this.idcount,
      'MedicineName': this.medicineName,
      'SIG': this.sig,
      'DispenseQuantity': this.dispenseQuantity,
      'NoteToPharmasist': this.noteToPharmacist,
      'HowmanyRefills': this.howManyRefills,
      'SubstainablenotPermitted': this.substistuePermitted
    }
    this.medicineArray.push(entity);
    this.idcount = Number(this.idcount) + 1;
    if (this.saveAsTemplate == true) {
      this.AddDoctorPrescriptionTemplates()
    }
    this.saveAsTemplate = false;
    this.medicineName = "";
    this.sig = "";
    this.dispenseQuantity = "";
    this.noteToPharmacist = "";
    this.howManyRefills = "";
    this.substistuePermitted = ""
  }


  public deleteMedicines(Sno: any) {

    for (let i = 0; i < this.medicineArray.length; i++) {

      if (Sno == this.medicineArray[i].Sno) {

        this.medicineArray.splice(i, 1);
      }
    }
  }






  Prescription: any;
  async insertPrescription() {
    debugger
    this.showLoader.emit();
    this.Prescription = 1;
    this.showPopup = 0;
    debugger
    for (let i = 0; i < this.medicineArray.length; i++) {
      var entity = {
        'DoctorID': this.doctorID,
        'PateintID': this.patientID,
        'LanguageID': this.languageID,
        'Date': new Date(),
        'AppointmentID': this.appointmentID,
        'MedicineName': this.medicineArray[i].MedicineName,
        'SIG': this.medicineArray[i].SIG,
        'DispenseQuantity': this.medicineArray[i].DispenseQuantity,
        'NoteToPharmasist': this.medicineArray[i].NoteToPharmasist,
        'HowmanyRefills': this.medicineArray[i].HowmanyRefills,
        'LocalDoctorID': 0,
        'EndorseBit': 0,
        'SubstainablenotPermitted': this.medicineArray[i].SubstainablenotPermitted
      }
      this.DoctorService.InsertDoctor_PatientPrescription(entity).subscribe(data => {

      }, error => {
        this.loader = false;
        this.StopLoader.emit();
        this.SharedService.insertexceptions(this.currentUrl,"InsertDoctor_PatientPrescription",error);
      })
    }
    debugger

    debugger
    // this.DoctorService.GetBookAppointmentByAppID(this.languageID, this.appointmentID, 1).subscribe(async data => {
    //   this.pdfprslist = data;
    //   debugger

    // }, error => {
    //   this.loader = false;
    // })
    // this.generatepdff()
    this.medicineArray.length = 0;
    this.showTable = false;
    await this.SharedService.sendSms(this.Details[0], 40, 1);
 
    this.generatepdff();
    // this.close.emit(this.messageID = 52);
    // 

  }



  generatepdff() {
    var entity = {
      "prescription": true,
      "diagnosticTest": false,
      "soapNotes": false,
      "medicalCertificate": false,
      "doctorReferals": false,
      "medicalQuestionare": false,
      "TypeID": true
    }
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }



  public AddDoctorPrescriptionTemplates() {
    var entity = {
      'DoctorID': this.doctorID,
      'TemplateName': this.templateName,
      'MedicineTypeID': 0,
      'MedicineName': this.medicineName,
      'SIG': this.sig,
      'DrugName': this.medicineName,
      'UnitOfMeasure': 0,
      'Dosage': 0,
      'Duration': 0,
      'Dispencequnatity': this.dispenseQuantity,
      'NoteToPharmacist': this.noteToPharmacist,
      'Diagnosis': 0,
      'HowManyRefils': this.howManyRefills,
      'ICDCode': 0,
      'ICDDescription': 0,
      'ICDID': 0,
      'SubstainablenotPermitted': this.substistuePermitted
    }
    this.DoctorService.InsertDoctorPrescrptionTemplates(entity).subscribe(data => {
      if (data != 0) {
        this.GetDoctorPrescrptionTemplates()
      }
    },error=>{
      this.StopLoader.emit();
      this.SharedService.insertexceptions(this.currentUrl,"InsertDoctorPrescrptionTemplates",error);
    })
  }






  public getlanguage() {

    this.DoctorService.GetAdmin_DoctorMyAppointments_Label(this.languageID).subscribe(
      data => {

        this.labels1 = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAdmin_DoctorMyAppointments_Label",error);
      }
    )
  }
}
