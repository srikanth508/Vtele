import { Component, OnInit } from '@angular/core';
 
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
  
@Component({
  selector: 'app-delivery-revenue',
  templateUrl: './delivery-revenue.component.html',
  styleUrls: ['./delivery-revenue.component.css']
})
export class DeliveryRevenueComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // options: NgDateRangePickerOptions;
  // constructor(public docservice: HelloDoctorService) { }
  // SDate = new Date();
  // EDate = new Date();
  // startdate: any;
  // enddate: any;
  // value: any;
  // public todaydate: any;
  // public languageid: any;
  // public labels: any;
  // deliverychargeslist: any;
  // ngOnInit() {

  //   this.options = {
  //     theme: 'default',
  //     range: 'tm',
  //     dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
  //     dateFormat: 'yyyy/MM/dd',
  //     outputFormat: 'YYYY/MM/DD',
  //     startOfWeek: 1
  //   };

  //   let date = new Date();
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let newformat = hours >= 12 ? 'PM' : 'AM';
  //   // Find current hour in AM-PM Format 
  //   hours = hours % 12;
  //   // To display "0" as "12" 
  //   hours = hours ? hours : 12;
  //   minutes = minutes < 10 ? 0 + minutes : minutes;

  //   var kkk = this.SDate.setDate(this.SDate.getDate() - 30);
  //   var lll = this.EDate.setDate(this.EDate.getDate() + 30);

  //   const format = 'yyyy-MM-dd';
  //   const myDate = new Date();
  //   const locale = 'en-US';
  //   this.todaydate = formatDate(myDate, format, locale);


  //   this.startdate = formatDate(kkk, format, locale);
  //   this.enddate = formatDate(lll, format, locale);

  //   this.languageid = localStorage.getItem('LanguageID');
  //   this.getlanguage();
  //   this.GetAllDeliveryChargesList();
  // }
  // public getlanguage() {
  //   this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
  //     data => {

  //       this.labels = data;

  //     }, error => {
  //     }
  //   )
  // }
  // public GetAllDeliveryChargesList() {
  //   this.docservice.GetALlDeliveryChargesByCompany(this.languageid, this.startdate, this.enddate).subscribe(
  //     data => {

  //       this.deliverychargeslist = data;

  //     }, error => {
  //     }
  //   )
  // }

  // selectedDate(data) {
  //   // var sdate = data.split('-')
  //   // this.startdate = sdate[0]
  //   // this.enddate = sdate[1]
  //   this.startdate = this.docservice.GetDates(data[0])
  //   this.enddate = this.docservice.GetDates(data[1])
  //   this.GetAllDeliveryChargesList();

  // }

  // public GetDeliveryID(deliveryid) {
  //   localStorage.setItem('DeliveryComapnyID', deliveryid)
  //   localStorage.setItem('StartDate', this.startdate);
  //   localStorage.setItem('EndDate', this.enddate)
  // }

}
