import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { CommonService } from 'src/app/Pages/services/common.service';




@Component({
  selector: 'app-upload-prescriptions',
  templateUrl: './upload-prescriptions.component.html',
  styleUrls: ['./upload-prescriptions.component.css']
})
export class UploadPrescriptionsComponent implements OnInit {
  loader: boolean | undefined;
  emailbody: any;
  emailsubject: any;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService, private CommonService: CommonService) { }
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() Message: EventEmitter<any> = new EventEmitter();
  @Input() Details: any = [];
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  typeID: any;
  foldername: any;
  attchmentURL: any = [];
  messageID: any;
  labels: any;
  currentUrl: any;
  emailattchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];
  files1: File[] = [];


  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    debugger
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    debugger
    this.attchmentURL.length = 0;
  }







  onSelect(event: any) {
    this.showLoader.emit()

    console.log(event);
    debugger
    this.files1.push(...event.addedFiles);
    this.uploadattachments1()

  }




  public uploadattachments1() {
    if (this.typeID == 1) {
      this.foldername = this.patientID + '/' + 'DiagnosticTests'
    }
    else if (this.typeID == 2) {
      this.foldername = this.patientID + '/' + 'SoapNotes'
    }
    else if (this.typeID == 3) {
      this.foldername = this.patientID + '/' + 'Prescriptions'
    }
    else if (this.typeID == 4) {
      this.foldername = this.patientID + '/' + 'Medical Certificate'
    }
    else if (this.typeID == 5) {
      this.foldername = this.patientID + '/' + 'Referal Letter'
    }
    this.DoctorService.UploadPatientDocuments(this.files1, this.foldername).subscribe(res => {

      this.attchmentURL.push(res);
      this.Message.emit(this.messageID = 11)
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UploadPatientDocuments", error);
    })

  }


  ondoctorPhotoRemove(event: any) {
    console.log(event);
    debugger
    this.attchmentURL.splice(this.attchmentURL.indexOf(event), 1);
    this.files1.splice(this.files1.indexOf(event), 1);
  }









  public InsertPrescrptionPhoto() {
    debugger
    this.showLoader.emit()
    if (this.attchmentURL.length == 0 || (this.attchmentURL == null)) {
      this.Message.emit(this.messageID == 59)
    }
    else {
      var entity = {
        'DoctorID': this.doctorID,
        'PateintID': this.patientID,
        'LanguageID': this.languageID,
        'AppointmentID': this.appointmentID,
        'NewPrescriptionPhotoUrl': this.attchmentURL[0],
      }
      debugger
      this.DoctorService.InsertDoctor_PatientPrescriptionPhotoUrl(entity).subscribe(data => {
        debugger
        if (data != 0) {
          this.close.emit(this.messageID = 52);
          this.SharedService.sendSms(this.Details, 11, this.languageID);
          this.checkLanguage(this.Details, this.languageID);
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertDoctor_PatientPrescriptionPhotoUrl", error);
      })
    }

    var entityTypeID = {
      'TypeID': this.typeID,
      'AppointmentID': this.appointmentID,
      'DoctorID': this.doctorID,
      'PatientID': this.patientID,
      'PhotoUrl': this.attchmentURL[0],
    }
    this.DoctorService.InsertDiagnostic_SoapNotesAttachments(entityTypeID).subscribe(data => {
      if (data != 0) {
        this.close.emit(this.messageID = 1);
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertDiagnostic_SoapNotesAttachments", error);
    })


  }

  public InsertDiagnostictestAndSoap() {
    this.showLoader.emit()
    if (this.attchmentURL.length == 0 || (this.attchmentURL == null)) {
      this.Message.emit(this.messageID = 60)
    }
    else {
      var entity = {
        'TypeID': this.typeID,
        'AppointmentID': this.appointmentID,
        'DoctorID': this.doctorID,
        'PatientID': this.patientID,
        'PhotoUrl': this.attchmentURL[0],
      }
      this.DoctorService.InsertDiagnostic_SoapNotesAttachments(entity).subscribe(data => {
        if (data != 0) {
          this.close.emit(this.messageID = 1);
          this.SharedService.sendSms(this.Details, 11, this.languageID);
          this.checkLanguage(this.Details, this.languageID);
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertDiagnostic_SoapNotesAttachments", error);
      })
    }
  }

  public checkLanguage(details: any, ltd: any) {
    if (ltd == 1) {
      if (this.typeID == 1) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "Document sent by healthcare provider",
          'emailbody': "Your healthcare provider " + details[0].doctorName + " has sent you a scanned copy of Lab test. Please book the test on Voiladoc app. Please contact Voiladoc support on the main menu of the app if you require any help.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }
      if (this.typeID == 2) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "Document sent by healthcare provider",
          'emailbody': "Your healthcare provider " + details[0].doctorName + " has sent you a scanned copy of the consultation notes. Please contact Voiladoc support on the main menu of the app if you require any help.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }
      if (this.typeID == 3) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "Document sent by healthcare provider",
          'emailbody': "Your healthcare provider " + details[0].doctorName + " has sent you a scanned copy of medicine prescription after your recent consultation. Please order them on Voiladoc app. Please contact Voiladoc support on the main menu of the app if you require any help. ",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }
      if (this.typeID == 4) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "Document sent by healthcare provider",
          'emailbody': "Your healthcare provider " + details[0].doctorName + " has sent you a scanned copy of medical certificate. Please contact Voiladoc support on the main menu of the app if you require any help.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }
      if (this.typeID == 5) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "Document sent by healthcare provider",
          'emailbody': "Your healthcare provider " + details[0].doctorName + " has sent you a scanned copy of referral letter. Please book on Voiladoc app or refer to an external provider. Please contact Voiladoc support on the main menu of the app if you require any help.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }
    } else {
      if (this.typeID == 1) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "prestataire de soins de santé vous a envoyé un document",
          'emailbody':  details[0].doctorName + " votre fournisseur de soins de santé vous a envoyé une copie numérisée de la prescription du test de laboratoire. Merci de réserver le test sur l'application Voiladoc. Veuillez contacter le support Voiladoc dans le menu principal de l'application si vous avez besoin d'aide.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }

      if (this.typeID == 2) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "prestataire de soins de santé vous a envoyé un document",
          'emailbody': "Votre " + details[0].doctorName + " de fournisseur de soins de santé vous a envoyé une copie numérisée des notes de consultation. Veuillez contacter le support Voiladoc dans le menu principal de l'application si vous avez besoin d'aide.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }

      if (this.typeID == 3) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "prestataire de soins de santé vous a envoyé un document",
          'emailbody': "Votre fournisseur de soins de santé " + details[0].doctorName + " vous a envoyé une copie numérisée de la prescription médicale après votre récente consultation. Veuillez les commander sur l'application Voiladoc. Veuillez contacter le support Voiladoc dans le menu principal de l'application si vous avez besoin d'aide.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }

      if (this.typeID == 4) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "prestataire de soins de santé vous a envoyé un document",
          'emailbody': "Votre " + details[0].doctorName + " de fournisseur de soins de santé vous a envoyé une copie numérisée du certificat médical. Veuillez contacter le support Voiladoc dans le menu principal de l'application si vous avez besoin d'aide.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }

      if (this.typeID == 5) {
        var entity = {
          'emailto': details[0].emailID,
          'emailsubject': "prestataire de soins de santé vous a envoyé un document",
          'emailbody': "Le " + details[0].doctorName + " de votre fournisseur de soins de santé vous a envoyé une copie numérisée de la lettre de recommandation. Merci de réserver sur l'application Voiladoc ou de vous référer à un prestataire externe. Veuillez contacter le support Voiladoc dans le menu principal de l'application si vous avez besoin d'aide.",
          'attachmenturl': [this.attchmentURL[0]],
          'cclist': [],
          'bcclist': []
        }
        this.CommonService.sendemail(entity).subscribe(data => {
        })
      }
    }
  }

}

