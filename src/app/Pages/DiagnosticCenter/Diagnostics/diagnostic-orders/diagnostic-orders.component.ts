import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CommonService } from 'src/app/Pages/services/common.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { SharedService } from 'src/app/Pages/services/shared.service';

import Swal from 'sweetalert2';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json'


@Component({
  selector: 'app-diagnostic-orders',
  templateUrl: './diagnostic-orders.component.html',
  styleUrls: ['./diagnostic-orders.component.css']
})
export class DiagnosticOrdersComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  count: any;
  search: any;
  user: any;
  diagnosticID: any;
  receptionID: any;
  languageID: any;
  diagnosticList: any;
  p: any;
  term: any;
  selectedOrder: any;
  typeID: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  homeSampleList: any;
  packageList: any;
  attchmentsPhotos: any;
  labels: any;


  constructor(private DiagnosticService: DiagnosticService, private SharedService: SharedService, private CommonService: CommonService) { }

  ngOnInit(): void {
    this.loader = true;
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.user = sessionStorage.getItem('user');
    this.diagnosticID = sessionStorage.getItem('diagnosticid');
    this.receptionID = sessionStorage.getItem('Receptionstid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.bsRangeValue = [start, end];
    this.getDiagnosticOrders()
  }



  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DiagnosticService.GetDates(data[0]);
    this.enddate = this.DiagnosticService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);

    this.oberserableTimer()
  }

  oberserableTimer() {
    const source = timer(1000, 4000);
    const abc = source.subscribe(val => {

      this.getDiagnosticOrders();
    })

  }



  public getDiagnosticOrders() {

    this.DiagnosticService.GetDiagnosticAppointmentsByDiagnosticID(this.diagnosticID, this.startdate, this.enddate, this.languageID).subscribe(
      data => {

        this.diagnosticList = data;
        this.count = this.diagnosticList.length
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    )
  }



  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }





  getTypeID(details: any, typeID: any) {
    this.selectedOrder = details;
    console.log("selectedOrder", this.selectedOrder)
    this.typeID = typeID;


    this.doSomething()
  }



  doSomething() {
    this.showPopup = 0;
    if (this.typeID == 1) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.DiagnosticService.UpdateDiagnosticAppointments(this.selectedOrder.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
            this.showPopup = 1;
            this.typeofPopUp = 1;
            this.messageID = 66;
            this.getDiagnosticOrders()

          })
        }
      })
    }
    else if (this.typeID == 2) {
      Swal.fire({
        title: this.labels.reasonForCancel,
        html: `<input type="text" id="Reason" class="swal2-input"  placeholder="Raison de l'annulation">`,
        confirmButtonText: this.labels.confirm,
        focusConfirm: false,
        preConfirm: () => {
          debugger
          this.loader = true;
          const Reason: any = document.getElementById('Reason') as HTMLElement
          var entity = {
            'ID': this.selectedOrder.id,
            'ReasonForCancel': Reason.value
          }
          this.DiagnosticService.UpdateDiagnosticAppointmentsReasonForCancel(entity).subscribe(async res => {
            let test = res;

            debugger
            console.log(res);
            await this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 67;
            this.typeofPopUp = 1;
            this.getDiagnosticOrders()

            this.loader = false;
          }, error => {
            this.loader = false;
            console.log("Error", error);
          })
        }

      })
    }

    else if (this.typeID == 3) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.patient,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText,
      }).then((result) => {
        if (result.isConfirmed) {
          this.DiagnosticService.UpdateDiagnosticAppointmentsNotVisitedBit(this.selectedOrder.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
            this.showPopup = 1;
            this.typeofPopUp = 1;
            this.messageID = 58;
            this.getDiagnosticOrders()

          })
        }
      })
    }
    else if (this.typeID == 4) {
      //Assign
      this.DiagnosticService.GetMyTeamAssainOrders(this.diagnosticID).subscribe(data => {
        this.homeSampleList = data;
        console.log("homesample", this.homeSampleList);
      })

    }
    else if (this.typeID == 5) {

    }

    else if (this.typeID == 6) {
      //tests
      this.GetDiaTests()
    }
    else if (this.typeID == 7) {
      this.GetPackageTests()
    }
    else if (this.typeID == 8) {
      this.DiagnosticService.GetDiagnosticAppointmentPhotos(this.selectedOrder.id).subscribe(data => {

        this.attchmentsPhotos = data;
      })
    }
    else if (this.typeID == 9) {
      Swal.fire({
        title: this.labels.amount,
        html: `<input type="text" id="Amount" class="swal2-input"  placeholder="Montant">`,
        confirmButtonText: this.labels.confirm,
        focusConfirm: false,
        preConfirm: () => {
          debugger
          this.loader = true;
          const Reason: any = document.getElementById('Amount') as HTMLElement

          this.DiagnosticService.UpdateDiagnosticAppointmentsByType(this.selectedOrder.id, Reason.value).subscribe(async res => {
            let test = res;
            debugger
            console.log(res);
            await this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 66;
            this.typeofPopUp = 1;
            this.getDiagnosticOrders()
            this.loader = false;
          }, error => {
            this.loader = false;
            console.log("Error", error);
          })
        }

      })
    }
    if(this.typeID==10){
       this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
    }
  }



  public GetPackageTests() {
    this.DiagnosticService.GetDiagnosticPackagesByAppointmentIDWeb(this.languageID, this.selectedOrder.id).subscribe(
      data => {

        this.packageList = data;
      }, error => {
      }
    )
  }


  testList: any;

  public GetDiaTests() {
    debugger
    this.DiagnosticService.GetDiagnosticTestsByAppointmentIDWeb(this.languageID, this.selectedOrder.id).subscribe(
      data => {
        debugger
        this.testList = data;
      }, error => {
      }
    )
  }










  public Insertdetails(list: any) {
    this.showPopup = 0;
    debugger
    var entity = {
      'OrderID': this.selectedOrder.id,
      'PatientID': this.selectedOrder.patientID,
      'DeliveryPatnerID': list.id
    }
    this.DiagnosticService.InsertDiagnostic_HomeSampleOrders(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 72;
      this.typeofPopUp = 1;

      var smsdesc = "Un nouveau rendez-vous a été attribué avec " + this.selectedOrder.patientName + ", " + this.selectedOrder.address + " à " + this.selectedOrder.slotTime + " , " + this.selectedOrder.appdate + " . Veuillez ouvrir votre application et vérifier les détails."
      var smsdesc1 = this.user + " a attribué le technicien de laboratoire " + list.name + " d'arriver à votre domicile pour prélever votre échantillon. Veuillez attendre d'autres mises à jour."
      this.sendingSMS(this.selectedOrder.smsmobileno, smsdesc)
      this.sendingSMS(list.smsmobileno, smsdesc1)
      this.sendEmail(this.selectedOrder.emailID, smsdesc, smsdesc)
      this.sendEmail(list.emailID, smsdesc1, smsdesc1)
      this.getDiagnosticOrders()
    })
  }






  async sendingSMS(smsMobileNo: any, smsDesc: any) {
    debugger
    // return true;
    this.CommonService.SendTwillioSMS(smsMobileNo, smsDesc).subscribe(async data => {
      console.log("Sms success", data)
      return true;


    }, error => {
      console.log("sms failure", error)
    })

  }






  emailattchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];

  public async sendEmail(email: any, sub: any, body: any) {
    var entity = {
      'emailto': email,
      'emailsubject': sub,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.CommonService.sendemail(entity).subscribe(async data => {
      console.log("email respone", data);
    }, error => {

    })
  }




  files: File[] = [];
  uploadAttchmentUrl: any = [];
  folderName: any;

  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.uploadAttchmentUrl.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/DiagnosticReports"
    this.DiagnosticService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.uploadAttchmentUrl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;

      this.loader = false;
    })
  }


  notes: any;



  public insertdiagnosticupload() {

    for (let i = 0; i < this.uploadAttchmentUrl.length; i++) {
      var entity = {
        'DiagnosticID': this.diagnosticID,
        'PatientID': this.selectedOrder.patientID,
        'FileURL': this.uploadAttchmentUrl[i],
        'Notes': this.notes,
        'AppointmentID': this.selectedOrder.id,
      }
      this.DiagnosticService.InsertPatient_DiagnosticUploads(entity).subscribe(async data => {

        if (data != 0) {
          await this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
          this.showPopup = 1;
          this.typeofPopUp = 1;
          this.messageID = 73;
          this.getDiagnosticOrders()
        }
      })
    }






  }







  //Available Test



  public async InsertAvailabletest() {
    this.showPopup = 0;
    var txtAmount = this.testList.filter((x: { fees: number; }) => x.fees == 0);
    if (txtAmount.length != 0) {
      if (this.languageID == 1) {
        Swal.fire("For available drugs, please make sure you have entered the price and ticked the box in the corresponding action column.");
      }
      else {
        Swal.fire("Pour les médicaments disponibles veuillez-vous assurer d'avoir renseigné le prix et coché la case dans la colonne d'action correspondante.");
      }
    }
    else {
      for (let i = 0; i < this.testList.length; i++) {
        var entity = {
          'ID': this.testList[i].bookediid,
          'Available': this.testList[i].available,
          'AppointmentID': this.selectedOrder.id,
          'Fees': this.testList[i].fees
        }
        this.DiagnosticService.UpdateDiagnosticBookedTests(entity).subscribe(data => {


        })


      }
      await this.SharedService.sendDiagnosticSMS(this.selectedOrder, this.typeID, 1)
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 34;
    }

  }




  public GetPdf(pdf: any) {
    location.href = "#/Shared/view/" + btoa(pdf)

  }

  closechatMessage() {
    this.typeID = 0
  }


  sendSms()
  {
    this.CommonService.SendTwillioSMS(0,0).subscribe(data=>{
      
    })
    
  }
}








