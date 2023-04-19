import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { DoctorService } from '../../services/Doctor/doctor.service'
declare var window: any;
import { SharedService } from '../../services/shared.service';
import Lables from '../../Lables/Doctors/myAppointments.json';



@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],

})
export class MyAppointmentsComponent implements OnInit {
  p: any;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  bsRangeValue: Date[] | undefined;
  bsValue = new Date();
  maxDate = new Date();
  startdate: any;
  enddate: any;
  doctorID: any;
  languageID: any;
  loader: any;
  appointmentList: any;
  count: any;
  search: any;
  showModal: any;
  typeID: any;
  selectedAppointment: any;
  typeOfAction: any;
  formModal: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  earlyCallNotes: any;
  followupModal: any;
  uploadDocuments: any;
  labels: any;
  followupAppointmentTypeID: any;
  checkedList: any;
  showGeneratePdf: any;
  AllergiesModal: any;
  description: any;

  ngOnInit(): void {
    this.loader = true;
    this.typeID = 0;
    this.formModal = 0;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    )

    this.followupModal = new window.bootstrap.Modal(
      document.getElementById("followUp")
    )

    this.uploadDocuments = new window.bootstrap.Modal(
      document.getElementById("uploadDocuments")
    )

    this.showGeneratePdf = new window.bootstrap.Modal(
      document.getElementById("generatePDF")
    )
    this.AllergiesModal = new window.bootstrap.Modal(
      document.getElementById("AllergiesModal")
    )


    // date.getFullYear(), date.getMonth(), 1
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 6, 0);

    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 6, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.doctorID = sessionStorage.getItem('userid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Lables["en"][0] : Lables["fr"][0];
    this.bsRangeValue = [start, end];

    this.oberserableTimer();


  }


  getTodayAppts() {

    debugger
    this.loader = true;
    var date = new Date();
    this.startdate = new Date();
    debugger
    var start = new Date();
    var end = new Date();
    this.bsRangeValue = [start, end];
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.startdate, format, locale);
    debugger
    this.oberserableTimer()
  }


  getAllAppts() {
    this.loader = true;
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 6, 0);

    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 6, 0);
    this.bsRangeValue = [start, end];
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    this.oberserableTimer()
  }


  oberserableTimer() {
    const source = timer(1000, 30000);
    const abc = source.subscribe(val => {
      this.showPopup = 0;
      this.getBookAppointmentByDoctorID();
    })
    const source1 = timer(1000, 2000);
    const abc1 = source1.subscribe(val => {
      this.showPopup = 0;

    })
  }
  public getBookAppointmentByDoctorID() {
    this.DoctorService.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageID).subscribe(
      data => {
        this.appointmentList = data.filter(x => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1);

        this.loader = false;
        this.count = this.appointmentList.length
        console.log("AppointmentList", this.appointmentList)
      })
  }


  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.getBookAppointmentByDoctorID();
  }



  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }




  //Child Component Functions

  close(messageid: any) {
    this.showPopup = 0;
    this.formModal.hide();
    this.uploadDocuments.hide();
    this.showPopup = 1;
    this.messageID = messageid
    this.typeofPopUp = 1
    this.loader = false;
    this.typeID = 0;
  }




  Message(messageid: any) {
    this.showPopup = 1;
    this.messageID = messageid
    this.typeofPopUp = 1
    this.loader = false;
  }

  closePopUp(description: any) {
    this.formModal.hide();
    this.description = description;
    this.AllergiesModal.show()
    this.typeID = 29



  }
  closeDocumentsModal() {
    this.formModal.hide()
  }
  showLoader() {
    this.loader = true;
  }

  StopLoader() {
    this.loader = false;
  }





  generatePDF(array: any) {

    debugger
    this.checkedList = array;
    // this.loader = false;
    this.uploadDocuments.hide();
    debugger
    this.typeID = 18;
    this.loader = false;
    this.showGeneratePdf.show();


  }


  closeGeneratePopUP(even: any) {
    this.showGeneratePdf.hide();
    this.showPopup = 1
    this.typeofPopUp = 1;
    this.messageID = even;
    this.loader = false;

  }


  closechatMessage() {
    debugger
    this.typeID = 0;
  }


  closeReceipt(messageID: any) {
    this.showGeneratePdf.hide();
    this.showPopup = 1
    this.typeofPopUp = 1;
    this.messageID = messageID;
    this.loader = false;
  }




  openAllergies(type: any) {
    this.formModal.hide()
    this.typeID = type
    this.AllergiesModal.show();

  }






  //select acceppt cancel

  getSelectedDetails(details: any, tyepOfAction: any) {
    // this.loader = true;
    debugger
    this.showPopup = 0;

    this.selectedAppointment = details;
    this.typeOfAction = tyepOfAction;


    this.doSomething()

  }







  //  End


  getTypeID(even: any, details: any) {

    debugger
    this.typeID = 0;
    this.typeID = even.target.value;
    this.selectedAppointment = details;

    if (this.typeID == 1 || this.typeID == 2 || this.typeID == 3 || this.typeID == 4 || this.typeID == 5) {
      this.formModal.show();
      console.log("details", details);


    }
    else if (this.typeID == 6) {
      // early Call Request
      debugger
      this.typeOfAction = 6;
      this.doSomething()
    }
    else if (this.typeID == 7) {
      // Refund Amount
      debugger
      this.typeOfAction = 7;
      this.doSomething()
    }
    else if (this.typeID == 8) {
      // Rejoin the Call
      debugger
      this.typeOfAction = 8;
      this.doSomething()
    }
    else if (this.typeID == 9) {
      //follow up Visit
      debugger
      this.followupModal.show();
      this.typeOfAction = 9;
    }
    else if (this.typeID == 10) {
      //Previous Prescriptions
      debugger
      this.formModal.show();
      this.typeOfAction = 10;
    }
    else if (this.typeID == 11) {
      //Previous Diagnostic Tests
      debugger
      this.formModal.show();
      this.typeOfAction = 11;
    }
    else if (this.typeID == 12) {
      //Previous SOap Notes
      debugger
      this.formModal.show();
      this.typeOfAction = 12;
    }
    else if (this.typeID == 13) {
      //Previous Medical Certificate
      debugger
      this.formModal.show();
      this.typeOfAction = 13;
    }
    else if (this.typeID == 14) {
      // not visited
      this.typeOfAction = 14;
      this.doSomething()
    }
    else if (this.typeID == 15) {
      // upload documents;

      this.uploadDocuments.show()
      this.typeOfAction = 15;

    }
    else if (this.typeID == 17) {
      this.uploadDocuments.show();

    }
    else if (this.typeID == 19) {
      this.showGeneratePdf.show();

    }
    else if (this.typeID == 22) {
      this.showGeneratePdf.show();

    }
    else if (this.typeID == 35) {
      // early Call Request
      debugger
      this.typeOfAction = 35;
      this.doSomething()
    }
  }






  //Accept reject

  doSomething() {
    if (this.typeOfAction == 1) {
      //Accept call

      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.warningText,
        icon: 'warning',
        customClass: 'swal-wide',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateAcceptedBitByDoctor(this.selectedAppointment.appointmentID).subscribe(res => {
            this.getBookAppointmentByDoctorID();
            this.SharedService.sendSms(this.selectedAppointment, this.typeOfAction, 1)
            let test = res;
            this.showPopup = 1;
            this.messageID = 50;
            this.typeofPopUp = 1;
          }, error => {
            this.loader = false;
          })
        }
      })
    }
    else if (this.typeOfAction == 2) {
      // Cancel Call 
      debugger;
      Swal.fire({
        title: this.labels.reasonForcancel,
        html: `<input type="text" id="Reason" class="swal2-input"  placeholder="Raison de l'annulation" >`,
        confirmButtonText: this.labels.submit,
        confirmButtonColor: '#f18235',
        focusConfirm: false,
        preConfirm: () => {
          debugger
          this.loader = true;

          const Reason: any = document.getElementById('Reason') as HTMLElement
          if (Reason.value == null || Reason.value == undefined || Reason.value == "") {
            this.showPopup = 1;
            this.messageID = 79;
            this.typeofPopUp = 2;
            this.loader = false;
          }
          else {
            var entity = {
              'ID': this.selectedAppointment.appointmentID,
              'ReasonForCancel': Reason.value
            }
            this.DoctorService.UpdateBookAppointmentReasonForCancel(entity).subscribe(res => {
              let test = res;
              this.getBookAppointmentByDoctorID();
              this.SharedService.sendSms(this.selectedAppointment, this.typeOfAction, 1)

              debugger
              console.log(res);
              this.showPopup = 1;
              this.messageID = 51;
              this.typeofPopUp = 1;

              this.loader = false;
            }, error => {
              this.loader = false;
              console.log("Error", error);
            })
          }

        }

      })
    }
    else if (this.typeOfAction == 6) {
      //Early call
      if (this.languageID == 1) {
        this.earlyCallNotes = this.selectedAppointment.doctorName + " is available at this moment. Do you want to start the call now ?Type : Video call."
      }
      else if (this.languageID == 6) {
        this.earlyCallNotes = this.selectedAppointment.doctorName + " est disponible plus tôt. Voulez-vous commencer l'appel maintenant ? Type : téléconsultation"
      }
      Swal.fire({
        title: this.labels.earlyCalltext,
        text: this.earlyCallNotes,
        // html: `<input type="textarea" id="earyCall" style="width:350px;height:200px"  class="swal2-input"  placeholder=" "> `,
        confirmButtonText: this.labels.submit,
        confirmButtonColor: '#f18235',
        focusConfirm: false,
        preConfirm: () => {
          debugger
          this.loader = true;
          this.DoctorService.GetBookAppointmentEarlyCallbit(this.selectedAppointment.appointmentID).subscribe(res => {
            let test = res;
            this.loader = false;
            this.SharedService.sendSms(this.selectedAppointment, this.typeOfAction, 1)
            debugger
            console.log(res);
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            this.getBookAppointmentByDoctorID();

          }, error => {
            this.loader = false;
            console.log("Error", error);
          })
        }

      })


    }
    else if (this.typeOfAction == 7) {
      //Refund  Amount
      debugger
      Swal.fire({
        title: this.labels.refundAmount,
        html: '<label>   Remboursement au patient : ' + this.selectedAppointment.paidAmount + '</label> <br> <input type="textarea" id="notes" style="width:350px;height:150px"  class="swal2-input"  placeholder="Notes">',
        confirmButtonText: this.labels.submit,
        focusConfirm: false,
        preConfirm: () => {
          debugger
          const notes: any = document.getElementById('notes') as HTMLElement
          this.loader = true;
          var entity = {
            'AppointmentID': this.selectedAppointment.appointmentID,
            'RefundComments': notes.value
          }
          this.DoctorService.UpdateBookAppointmentRefund(entity).subscribe(res => {
            let test = res;
            var entity1 = {
              'PatientID': this.selectedAppointment.patientID,
              'WalletAmount': this.selectedAppointment.paidAmount
            }
            this.DoctorService.UpdatePatientWalletAmountDetailsLoadWallet(entity1).subscribe(data => {
              this.loader = false;
              var entity = {
                'PatientID': this.selectedAppointment.patientID,
                'Date': this.serverDate,
                'Time': this.serverTime,
                'User': this.selectedAppointment.doctorName,
                'Reason': "Nous vous informons que le  Dr." + this.selectedAppointment.doctorName + " a remboursé " + this.selectedAppointment.paidAmount + " MAD . sur votre portefeuille Voiladoc.",
                'Amount': this.selectedAppointment.paidAmount,
                'DoctorID': this.doctorID,
                'AppointmentID': this.selectedAppointment.appointmentID,
                'PaymentType': 1,
                'TypeID': 1
              }
              this.DoctorService.InsertPatient_WalletLogWeb(entity).subscribe(data => {
                if (data != 0) {

                }
              })

              debugger
              this.SharedService.sendSms(this.selectedAppointment, this.typeOfAction, 1);
              console.log(res);
              this.showPopup = 1;
              this.messageID = 1;
              this.typeofPopUp = 1;
              this.getBookAppointmentByDoctorID();
            }, error => {
              this.loader = false;
              console.log("Error", error);
            })

          }, error => {
            this.loader = false;
            console.log("Error", error);
          })
        }

      })
    }
    else if (this.typeOfAction == 8) {
      //rejoin call
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.freeCallText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateBookVideoCallRejoinbit(this.selectedAppointment.appointmentID).subscribe(data => {
            this.loader = false;
            this.SharedService.sendSms(this.selectedAppointment, this.typeOfAction, 1);
            debugger
            console.log(data);
            this.showPopup = 1;
            this.messageID = 53;
            this.typeofPopUp = 1;
            this.getBookAppointmentByDoctorID();
          }, error => {

          })
        }
      })
    }
    else if (this.typeOfAction == 9) {
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.followUpText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateBookAppointmentFollowupVisit(this.selectedAppointment.appointmentID, this.followupAppointmentTypeID).subscribe(async data => {
            this.loader = false;
            console.log(data);
            this.DoctorService.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageID).subscribe(
              data => {
                this.appointmentList = data.filter(x => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1);
                this.loader = false;
                this.count = this.appointmentList.length
                console.log("AppointmentList", this.appointmentList)
                this.SharedService.sendSms(this.appointmentList[0], this.typeOfAction, 1);
                this.showPopup = 1;
                this.messageID = 1;
                this.typeofPopUp = 1;
              })


          }, error => {

          })
        }
      })
    }

    else if (this.typeOfAction == 14) {
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.patientNotVisited,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateBookAppointmentNoShow(this.selectedAppointment.appointmentID).subscribe(res => {
            let test = res;
            this.showPopup = 1;
            this.messageID = 58;
            this.typeofPopUp = 1;
            this.getBookAppointmentByDoctorID();
          }, error => {
            this.loader = false;
          })
        }
      })
    }
    else if (this.typeOfAction == 16) {

      this.formModal.show();
      this.typeID = 16;
    }

    else if (this.typeOfAction == 35) {
      //rejoin call
      Swal.fire({
        title: this.labels.areYouSure,
        text: this.labels.youwanttomark,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#322b6b',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.yes,
        cancelButtonText: this.labels.no,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.DoctorService.UpdateVisitedBitByDoctor(this.selectedAppointment.appointmentID).subscribe(data => {
            this.loader = false;

            debugger
            console.log(data);
            this.showPopup = 1;
            this.messageID = 53;
            this.typeofPopUp = 1;
            this.getBookAppointmentByDoctorID();
          }, error => {

          })
        }
      })

    }

  }

  closeModal() {
    this.formModal.show();
    this.followupModal.hide();
    this.typeID = 0;
  }


  dateList: any;
  serverTime: any;
  serverDate: any;

  public getServerDate() {
    this.DoctorService.GetServerDateAndTime().subscribe(
      async data => {

        this.dateList = data;
        this.serverTime = this.dateList.presentTime,
          this.serverDate = this.dateList.todaydate
        // this.availabletime = this.dateList.presentTime,
        // this.checktime = this.dateList.presentTime
      }, error => {
      }
    )
  }






  //start early call


  startEarlyVideoCall(details: any) {
    if (details.completed == 2) {
      Swal.fire(this.labels.sessionEnded)
    }
    else {
      sessionStorage.setItem("Details", btoa(JSON.stringify(details)))
      window.open("#/VideoCall", "_blank");
    }
  }


  async normalVideoCall(details: any) {
    this.showPopup = 0;
    await this.getServerDate()
    debugger
    if (details.completed == 2) {
      Swal.fire(this.labels.sessionEnded)
    }
    else {
      if (this.serverDate == details.appdate) {
        this.showPopup = 0;
        if (this.serverTime >= details.slots) {
          this.showPopup = 0;
          debugger
          if (this.serverTime <= details.endTime) {
            sessionStorage.setItem("Details", btoa(JSON.stringify(details)))
            window.open("#/VideoCall", "_blank");
          }
          else {

            this.showPopup = 1;
            this.messageID = 81;
            this.typeofPopUp = 2;

          }

        }
        else {
          this.showPopup = 1;
          this.messageID = 82;
          this.typeofPopUp = 2;
        }
      }
      else {
        this.showPopup = 1;
        this.messageID = 82;
        this.typeofPopUp = 2;
      }
    }
  }



  async onDemandVideo(details: any) {
    this.showPopup = 0;
    await this.getServerDate()

    if (details.completed == 2) {
      Swal.fire(this.labels.sessionEnded)
    }
    else {
      if (this.serverDate == details.appdate) {
        this.showPopup = 0;
        if (this.serverTime >= details.slots) {
          this.showPopup = 0;
          debugger
          if (this.serverTime <= details.endTime) {
            sessionStorage.setItem("Details", btoa(JSON.stringify(details)))
            window.open("#/VideoCall", "_blank");
          }
          else {
            // this.showPopup = 1;
            // this.messageID = 81;
            // this.typeofPopUp = 2;

          }

        }
        else {
          // this.showPopup = 1;
          // this.messageID = 82;
          // this.typeofPopUp = 2;
        }
      }
      else {
        // this.showPopup = 1;
        // this.messageID = 82;
        // this.typeofPopUp = 2;
      }
    }
  }



  // generatePDF(array: any) {
  //   this.typeID = 18;
  //   debugger
  //   this.checkedList = array;
  //   // this.loader = false;
  //   this.uploadDocuments.hide();
  //   debugger
  //   this.showGeneratePdf.show();
  //   this.loader = false;

  // }


  sendEmail(array: any) {
    debugger
    this.formModal.hide();
    this.typeID = 18;
    this.checkedList = array;
    this.showGeneratePdf.show();
    debugger
  }



  public getReport(pdf: any) {
    location.href = "#/Shared/view/" + btoa(pdf)

  }








  public getDiagnosticReport(reportURl: any) {



    location.href = "#/Shared/view/" + reportURl
  }

  showimages: any;


  public GetImagesID(id: any) {
    this.loader = true;
    this.DoctorService.GetPatient_Illnessphotos(id).subscribe(
      data => {

        this.showimages = data;
        this.loader = false;
      }, error => {
        this.loader = false;
      }

    )
  }

  showvedioes: any;

  public GetVedioID(id: any) {
    debugger
    this.loader = true;
    this.DoctorService.GetPatient_IllnessVedioes(id).subscribe(
      data => {

        this.showvedioes = data;

      }, error => {
        this.loader = false;
      }
    )
  }



  CloseVaccinePopUp(even: any) {
    this.AllergiesModal.hide();
    this.showPopup = 1;
    this.messageID = even;
    this.typeofPopUp = 1
  }






}