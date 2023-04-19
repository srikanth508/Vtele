import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';
declare var window: any;
import { SharedService } from 'src/app/Pages/services/shared.service';




@Component({
  selector: 'app-precriptions',
  templateUrl: './precriptions.component.html',
  styleUrls: ['./precriptions.component.css']
})
export class PrecriptionsComponent implements OnInit {
  p: any;

  constructor(private PharmacyService: PharmacyService, private SharedService: SharedService) { }

  pharmacyID: any;
  languageID: any;
  user: any;
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  ordersList: any;
  term: any;
  typeID: any;
  selectedOrder: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  formModal: any;
  count: any;
  labels: any;
  currentUrl: any;


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("medicines")
    )
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
    var date = new Date();
    this.startdate = new Date();
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var start = new Date();
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale2 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale2);
    this.bsRangeValue = [start, end];


    this.oberserableTimer()
  }

  oberserableTimer() {
    const source = timer(1000, 4000);
    const abc = source.subscribe(val => {

      this.GetPharmacyOrders()
    })

  }


  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.PharmacyService.GetDates(data[0]);
    this.enddate = this.PharmacyService.GetDates(data[1]);
    this.GetPharmacyOrders();
    this.loader = false;
  }




  public async GetPharmacyOrders() {

    this.PharmacyService.GetPatient_TextMedicineDetails(this.pharmacyID, this.startdate, this.enddate, this.languageID).subscribe(
      data => {
        this.ordersList = data;
        console.log("orders", this.ordersList);
        this.count = this.ordersList.length;
        this.loader = false;
      }, error => {
        console.log("Error", error);
        this.loader = false;
      }
    )
  }


  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



  getTypeID(details: any, typeID: any) {
    debugger
    this.typeID = typeID;
    this.selectedOrder = details;
    this.doSomething()
  }


  doSomething() {

    if (this.typeID == 1) {

      Swal.fire({
        title: this.labels.title,
        text: this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this.PharmacyService.ApprovedPatientMedicineDetails(this.selectedOrder.id).subscribe(async res => {
            let test = res;
            this.SharedService.sendPharmacySMS(this.selectedOrder, this.typeID, 1)
            this.showPopup = 1;
            this.messageID = 66;
            this.typeofPopUp = 1;
            this.GetPharmacyOrders();
            this.loader = false;

          }, error => {
            this.loader = false;
            this.SharedService.insertexceptions(this.currentUrl, "sendPharmacySMS", error);
          })

        }
      })

    }
    else if (this.typeID == 2) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.canceltitle,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.PharCancelledPatientMedicineDetails(this.selectedOrder.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendPharmacySMS(this.selectedOrder, this.typeID, 2)

            this.showPopup = 1;
            this.messageID = 67;
            this.typeofPopUp = 1;
            this.loader = false;
            this.GetPharmacyOrders();
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "sendPharmacySMS", error);
          })

        }

      })
    }
    else if (this.typeID == 3) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.orderconformation,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.UpdateOrderReadyBit(this.selectedOrder.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendPharmacySMS(this.selectedOrder, this.typeID, 3)
            this.showPopup = 1;
            this.messageID = 68;
            this.typeofPopUp = 1;
            this.loader = false;
            this.GetPharmacyOrders();
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "sendPharmacySMS", error);
          })

        }

      })
    }
    else if (this.typeID == 4) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.assignOrder,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.GetDeliveredPatnerAssignReadyForAvailable(this.selectedOrder.id).subscribe(async res => {
            let test = res;
            await this.SharedService.sendPharmacySMS(this.selectedOrder, this.typeID, 4)
            this.showPopup = 1;
            this.messageID = 69;
            this.typeofPopUp = 1;
            this.loader = false;
            this.GetPharmacyOrders();
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "sendPharmacySMS", error);
          })
        }
      })
    }
    else if (this.typeID == 5) {
      Swal.fire({
        title: this.labels.title,
        text: this.labels.deliverymsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C8D73',
        cancelButtonColor: '#D82E2F',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText: this.labels.cancelButtonText
      }).then((result) => {
        if (result.value) {
          this.PharmacyService.DeliveredPatientMedicineDetails(this.selectedOrder.id).subscribe(res => {
            let test = res;
            this.showPopup = 1;
            this.messageID = 70;
            this.typeofPopUp = 1;
            this.loader = false;
            this.GetPharmacyOrders();
          })
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DeliveredPatientMedicineDetails", error);
        this.loader = false;
      })
    }
    else if (this.typeID == 6) {

      this.formModal.show();
     


    }
    else if (this.typeID == 7) {
      this.formModal.show();

    }
    else if (this.typeID == 8) {
      this.formModal.show();

    }
  }



  closeModal() {
    this.typeID = 0;
  }


  showLoader() {
    this.loader = true;
  }

  error(messageid: any) {
    this.showPopup = 1;
    this.typeofPopUp = 2;
    this.messageID = messageid;
    this.loader = false;
  }


  close(messageID: any) {
    this.showPopup = 1;
    this.typeofPopUp = 1;
    this.messageID = messageID;
    this.loader = false;
    this.formModal.hide();
  }


  location: any;


  getAddress(address: any) {
    this.location = address;
  }

  closechatMessage() {
    this.typeID = 0
  }





}
