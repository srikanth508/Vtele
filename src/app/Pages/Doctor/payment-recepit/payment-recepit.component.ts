import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Doctors/myAppointments.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-payment-recepit',
  templateUrl: './payment-recepit.component.html',
  styleUrls: ['./payment-recepit.component.css']
})
export class PaymentRecepitComponent implements OnInit {
  doctorID: any;
  languageID: any;
  patientID: any;
  appointmentID: any;
  appointmentDetails: any;
  month: any;
  labels:any;
  currentUrl:any;

  
  constructor(private DoctorService: DoctorService,private SharedService:SharedService) { }

  @Input() Details: any = [];
  @Output() closeReceipt: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();

  messageID: any;
  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    debugger
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;

    this.appointmentDetails = this.Details[0]





  }





  pdfContent: any;
  pdfurl: any;
  mailAttachmentUrl: any = [];
  cclist: any = []
  bcclist: any = []


  public SavePDF() {
    this.showLoader.emit()
    this.pdfContent = window.document.getElementById("Receipts");
    var doc = new jsPDF('p', 'mm', "a4");

    // html2canvas(this.pdfContent).then(canvas => {
    //   ;
    //   var imgData = canvas.toDataURL('image/jpeg', 1.0);

    //   doc.setFontSize(2);

    //   doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
    html2canvas(this.pdfContent).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft >= 0) {
        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.deletePage(1)
      var pdf = doc.output('blob');

      var file = new File([pdf], "DocReceipt" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);

      let foldername = this.patientID + '/' + 'Receipts'

      this.DoctorService.DoctorReports(file, foldername).subscribe(async res => {
        ;
        this.pdfurl = res;
        this.mailAttachmentUrl.push(res)
        await this.UpdateReceipt();
        await this.sendEmail()
        this.closeReceipt.emit(this.messageID = 64)
      });
    });
  }


  async UpdateReceipt() {
    this.showLoader.emit()
    var entity = {
      'AppointmentID': this.appointmentID,
      'ReceiptURL': this.pdfurl
    }
    this.DoctorService.UpdateBookAppoinmentReceiptUrl(entity).subscribe(async data => {

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateBookAppoinmentReceiptUrl",error);
    })
  }
// this.Details[0].pEmail


  async sendEmail() {
    debugger
    this.showLoader.emit()
    var entity = {
      'emailto': this.Details[0].pEmail,
      'emailsubject': "Payment Receipt",
      'emailbody': "Payment Recipt for Your Consulatation",
      'attachmenturl': this.mailAttachmentUrl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.DoctorService.sendemail(entity).subscribe(async data => {
      let res = data;
      if (res == 'Success') {
         this.closeReceipt.emit(this.messageID = 64)
        console.log("email", res);
      }

    }, error => {
       this.SharedService.insertexceptions(this.currentUrl,"sendemail",error);
    })
  }
}
