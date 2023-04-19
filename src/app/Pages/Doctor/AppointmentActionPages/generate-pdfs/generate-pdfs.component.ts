import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/generatepdf/generate.json';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';

@Component({
  selector: 'app-generate-pdfs',
  templateUrl: './generate-pdfs.component.html',
  styleUrls: ['./generate-pdfs.component.css'],
})
export class GeneratePdfsComponent implements OnInit {
  country: any;
  cityname: any;
  doctcityID: any;
  doctTypeID: any;
  showname: any;
  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService,
    private MasterService: MasterService
  ) { }
  @Input() Details: any = [];
  @Input() checkedList: any = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() closeGeneratePopUP: EventEmitter<any> = new EventEmitter();

  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  loader: boolean | undefined;
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  pdfprslist: any;
  labels: any;
  Prescription: any | undefined;
  soappdf: any | undefined;
  Test: any;
  medical: any;
  referals: any;
  medicalcertificate: any;
  pdfurl: any;
  pdfContent: any;
  data: any;
  reportURL: any = [];
  emailURL: any;
  messageID: any;
  typeID: any;
  cclist: any = [];
  bcclist: any = [];
  subject: any;
  description: any;
  currentUrl: any;
  signatureUrl: any;

  async ngOnInit(): Promise<void> {
    this.loader = true;
    this.currentUrl = window.location.href;
    debugger;
    // this.loader = true;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log('Appointment List', this.Details);
    debugger;
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.signatureUrl = this.Details[0].signatureURL;
    debugger;
    console.log('Details', this.Details);
    console.log('checked List', this.checkedList[0][0]);
    this.Test = this.checkedList[0][0].diagnosticTest;
    this.Prescription = this.checkedList[0][0].prescription;
    this.medical = this.checkedList[0][0].medicalQuestionare;
    this.referals = this.checkedList[0][0].doctorReferals;
    this.medicalcertificate = this.checkedList[0][0].medicalCertificate;
    this.soappdf = this.checkedList[0][0].soapNotes;
    this.typeID = this.checkedList[0][0].TypeID;
    this.doctcityID = this.Details[0].docCityID,
      this.doctTypeID = this.Details[0].docDoctorType

    if (this.Test == true) {
      debugger;
      this.subject = this.Details[0].doctorName + this.labels.addedTest;
      this.description = this.labels.healthcare + "" +
        this.Details[0].doctorName +
        this.labels.testdesc +
        '<br><br><br>' +
        this.labels.bestwishes;
    } else if (this.Prescription == true) {
      this.subject = this.labels.Addprescription;
      this.description =
        this.labels.prescriptiondesc +
        this.Details[0].doctorName +
        '<br><br><br>' +
        this.labels.bestwishes;
      // this.description = "Following your consultation with Dr " + this.Details[0].doctorName + " added prescription for you"
    } else if (this.referals == true) {
      this.subject = this.Details[0].doctorName + this.labels.docRefer;
      this.description =

        this.labels.docrefdesc + this.Details[0].doctorName +
        '<br><br>' +
        this.labels.bestwishes;
    } else if (this.medicalcertificate == true) {
      this.subject = this.Details[0].doctorName + this.labels.medicalsub;
      this.description =
        this.labels.medicaltext +
        this.Details[0].doctorName
      '<br><br>' +
        this.labels.bestwishes;
    }

    if (this.typeID == true) {
      debugger;
      await this.generatePDF();
      // // const myTimeout = setTimeout(this.SavePdf, 5000);
      // document.getElementById("sendMail")?.click();
      this.convetToPDF1();
    } else {
      await this.generatePDF();
    }
    this.getprobincelist();
  }

  public convetToPDF1() {
    setTimeout(() => {
      this.SavePdf();
    }, 3000);
  }

  // public getlanguage() {

  //   this.DoctorService.GetAdmin_DoctorMyAppointments_Label(this.languageID).subscribe(
  //     data => {
  //       this.labels = data;

  //     }, error => {
  //     }
  //   )
  // }

  generatePDF() {
    if (this.typeID == true) {
      debugger;
      this.DoctorService.GetBookAppointmentByAppID(
        this.languageID,
        this.appointmentID,
        1
      ).subscribe(
        async (data) => {
          this.pdfprslist = data;
          console.log('pdflist', this.pdfprslist);
          debugger;
          return true;
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByAppID',
            error
          );
        }
      );
    } else {
      this.DoctorService.GetBookAppointmentByAppID(
        this.languageID,
        this.appointmentID,
        1
      ).subscribe(
        async (data) => {
          this.pdfprslist = data;
          debugger;
          this.loader = false;
          console.log('pdflist1', this.pdfprslist);
          return true;
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByAppID',
            error
          );
        }
      );
    }
  }

  public SavePdf() {
    // this.spinner.show()
    // this.loader = true;
    debugger;
    // this.loader=false;
    this.data = document.getElementById('htmlData');
    this.closeGeneratePopUP.emit((this.messageID = 1));
    // this.StopLoader.emit()
    html2canvas(this.data).then(
      (canvas) => {
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var doc = new jsPDF('p', 'mm', 'a4');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 0;
        while (heightLeft >= 0) {
          const contentDataURL = canvas.toDataURL('image/png');
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.deletePage(1);
        var pdf = doc.output('blob');
        var file = new File([pdf], 'Report' + '.pdf');
        let body = new FormData();
        body.append('Dan', file);
        debugger;
        let folder = this.patientID + '/' + 'Consulation Report';

        this.DoctorService.DoctorReports(file, folder).subscribe(
          async (res) => {
            this.reportURL.push(res);
            let a = this.reportURL[0].slice(2);

            let b = 'https://maroc.voiladoc.org' + a;
            this.emailURL = b;

            // this.SendMailReport()
            // this.updateReport();
            this.sendEmailPdf();
          },
          (error) => {
            this.loader = false;
            this.SharedService.insertexceptions(
              this.currentUrl,
              'getElementById',
              error
            );
          }
        );

        // doc.save('Prescriptions.pdf');
      },
      (error) => {
        this.loader = false;
        console.log('error with canvas', error);
      }
    );
  }

  public updateReport() {
    debugger;
    var entity = {
      ApointmentID: this.appointmentID,
      ReportPdfsUrl: this.reportURL[0],
    };
    this.DoctorService.UpdateBookAppointmentReportPdfsUrl(entity).subscribe(
      (data) => { },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateBookAppointmentReportPdfsUrl',
          error
        );
      }
    );
  }

  public sendEmailPdf() {
    debugger;
    var entity = {
      emailto: this.Details[0].pEmail,
      emailsubject: this.subject,
      emailbody: this.description,
      attachmenturl: this.reportURL,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        if (data == 'Success') {
          // this.closeGeneratePopUP.emit(this.messageID = 1)
          console.log('email Sent Succesfully');
          this.loader = false;
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.Details[0].pEmail,
          'Email Erroe',
          error
        );
        this.loader = false;
      }
    );
  }

  public GeneratePDf() {
    // this.spinner.show()
    this.loader = true;
    debugger;
    this.data = document.getElementById('htmlData');

    html2canvas(this.data).then(
      (canvas) => {
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var doc = new jsPDF('p', 'mm', 'a4');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 0;
        while (heightLeft >= 0) {
          const contentDataURL = canvas.toDataURL('image/png');
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        this.StopLoader.emit();
        doc.deletePage(1);
        var pdf = doc.output('blob');
        var file = new File([pdf], 'Report' + '.pdf');
        let body = new FormData();
        body.append('Dan', file);
        debugger;
        let folder = this.patientID + '/' + 'Consulation Report';
        // doc.save('Prescriptions.pdf');

        this.DoctorService.DoctorReports(file, folder).subscribe(
          (res) => {
            this.reportURL.push(res);
            let a = this.reportURL[0].slice(2);

            let b = 'https://maroc.voiladoc.org' + a;
            this.emailURL = b;

            // this.SendMailReport()
            this.updateReport();
            this.SendGenaratedReport();
          },
          (error) => {
            this.loader = false;
          }
        );

        // doc.save('Prescriptions.pdf');
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'getElementById',
          error
        );
        console.log('error with canvas', error);
      }
    );
  }

  public SendGenaratedReport() {
    debugger
    if (this.languageID == 1) {
      var sub = 'Consultation report summary';
      var emaildesc =
        'Health professional  ' +
        this.Details[0].doctorName +
        ' has sent you a summary of the consultation report. It is now available in the "My medical report" menu under consultation report.' +
        '<span class="highlightText">' +
        this.emailURL +
        '</span>' +
        '<br><br>' +
        'Regards,' +
        '<br>' +
        'Voiladoc Team';
    } else {
      var sub = 'Résumé du rapport de consultation';
      var emaildesc =
        "La professionnelle de santé " +
        this.Details[0].doctorName +
        ' vous a adressé un résumé du rapport de consultation. Il est désormais disponible dans le menu "Mon rapport médical" sous « Rapport de consultation' +
        '<span class="highlightText">' +
        this.emailURL +
        '</span>' +
        '<br><br>' +
        'Cordialement,' +
        '<br>' +
        'Voiladoc Team';
    }
    debugger;
    var entity = {
      emailto: this.Details[0].pEmail,
      emailsubject: sub,
      emailbody: emaildesc,
      attachmenturl: this.reportURL,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        this.closeGeneratePopUP.emit((this.messageID = 1));
        console.log('email Sent Succesfully');
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.Details[0].pEmail,
          'Email Erroe',
          error
        );
        this.loader = false;
        console.log('Email Failed');
      }
    );
  }

  public getprobincelist() {
    debugger;
    this.MasterService.GetCityMasterByLangID(this.languageID).subscribe(
      data => {
        let provincelist = data;
        var list = provincelist.filter((x: { id: any; }) => x.id == this.doctcityID);
        if (this.doctTypeID == 1) {
          this.showname = list[0].short
        }
        else {
          this.showname = list[0].country
        }
        this.country = list[0].country,
          this.cityname = list[0].short

      }, error => {

      }
    )
  }

  // send() {
  //   debugger
  //   this.data = document.getElementById('htmlData');
  //   console.log("data",this.data);
  //   console.log("html",document.getElementById('htmlData')?.innerHTML)

  //   var htmlText=document.getElementById('htmlData')?.innerHTML

  //   var entity={
  //     'Text':htmlText
  //   }
  //   debugger
  //   this.DoctorService.SendMailPrescription(entity).subscribe(data => {
  //     debugger
  //   })
  // }
}
