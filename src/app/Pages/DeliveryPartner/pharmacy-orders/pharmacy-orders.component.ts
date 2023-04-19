import { Component, OnInit } from '@angular/core';
import Labels from '../../Lables/deliverypartner/deliverypartnerlabel.json';
import { formatDate } from "@angular/common";
import { DeliveryService } from '../../services/delivery.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-pharmacy-orders',
  templateUrl: './pharmacy-orders.component.html',
  styleUrls: ['./pharmacy-orders.component.css']
})
export class PharmacyOrdersComponent implements OnInit {

  constructor(public deliveryService: DeliveryService) { }



  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public pharmacyid: any;
  public todaydate: any;
  public orderlist: any;
  public term: any;
  public allmedicines: any;
  public quantity: any;
  public listid: any;
  public list: any;
  public myarray = [];
  public languageid: any;
  public labels: any;
  public accpatientid: any;
  public accpharmacyname: any;
  public accdate: any;
  public accemail: any;
  public canpatientid: any;
  public canpharmacyname: any;
  public canemailID: any;
  public delipatientid: any;
  public deliemail: any;
  public delipharmacyname: any;
  public partnerlist: any;
  public deliverycompanyid: any;
  public pincode: any;
  public pincodecodearray: any;
  public filteredpincodes = [];
  options: any;
  bsRangeValue: Date[] | undefined;
  ngOnInit() {
    debugger;
    this.languageid = sessionStorage.getItem('LanguageID');
   // this.deliverycompanyid =24;
    this.deliverycompanyid= sessionStorage.getItem('deliveryid');
   // this.pincode =10001;
    this.pincode = sessionStorage.getItem('pincode');
   
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    var kkk = this.SDate.setDate(this.SDate.getDate() - 7);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);


    this.deliveryService.GetDeliveryPartnersByID(this.deliverycompanyid).subscribe(
      data => {

        this.partnerlist = data;
      }, error => {
      }
    )


    this.GetPharmacyOrders()
  }

  public GetPharmacyOrders() {
    debugger
    this.deliveryService.GetPatient_TextMedicineDetailsForDeliverCompany(this.startdate, this.enddate, this.languageid, this.pincode).subscribe(
      data => {
        debugger
        this.orderlist = data;
      }, error => {
      }
    )
  }
  public asssign(pid: any) {

    var entity = {
      'MedicineOrderID': this.orderid,
      'DeliveryCompanyID': this.deliverycompanyid,
      'PartnerID': pid,
      'Status': 'Attribué'
    }
    this.deliveryService.InsertDeliveryPartnerAssignedOrders(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
        this.GetPharmacyOrders()
      }
      else {
        Swal.fire('La commande a été attribuée au livreur');
        this.GetPharmacyOrders()

      }


    })

  }
  orderid: any;


  public getid(id: any) {
    debugger;
    this.orderid = id;
  }
  selectedDate(data: any) {


    // var sdate = data.split('-')
    // this.startdate= sdate[0]
    // this.enddate= sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetPharmacyOrders()
  }
  /* 
    public getlanguage() {
      this.deliveryService.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
        data => {
  
          this.labels = data;
        }, error => {
        }
      )
      this.deliveryService.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
        data => {
  
          this.labels1 = data;
        }, error => {
        }
      )
    }
  
    selectedDate(data) {
  
  
      // var sdate = data.split('-')
      // this.startdate= sdate[0]
      // this.enddate= sdate[1]
  
      this.startdate = data[0].toLocaleString().split(',')[0];
      this.enddate = data[1].toLocaleString().split(',')[0];
      this.GetPharmacyOrders()
    }
  
  
    
  
   
   */
}

