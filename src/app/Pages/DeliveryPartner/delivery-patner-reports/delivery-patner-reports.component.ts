import { Component, OnInit } from '@angular/core';
 
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
  
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
  

@Component({
  selector: 'app-delivery-patner-reports',
  templateUrl: './delivery-patner-reports.component.html',
  styleUrls: ['./delivery-patner-reports.component.css']
})
export class DeliveryPatnerReportsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // options: NgDateRangePickerOptions;
  // constructor(public docservice: HelloDoctorService) { }

  // value: any;
  // SDate = new Date();
  // EDate = new Date();
  // startdate: any;
  // enddate: any;
  // public pharmacyid: any;
  // public languageid: any;
  // labels: any;
  // labels1: any;
  // todaydate: any;
  // deliverycomapnyid: any;
  // term: any;
  // ngOnInit() {
  //   this.languageid = localStorage.getItem('LanguageID');
  //   this.startdate = localStorage.getItem('StartDate');
  //   this.enddate = localStorage.getItem('EndDate');
  //   this.deliverycomapnyid = localStorage.getItem('DeliveryComapnyID');
  //   this.getlanguage()
  //   this.GeTDeliveryPatnerReports();

  // }
  // public getlanguage() {
  //   this.docservice.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
  //     data => {

  //       this.labels = data;
  //     }, error => {
  //     }
  //   )
  //   this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
  //     data => {

  //       this.labels1 = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public selectedDate(data) {
  //   // this.monthstartdate = data[0].toLocaleString().split(',')[0];
  //   // this.monthenddate = data[1].toLocaleString().split(',')[0];


  //   this.startdate = this.docservice.GetDates(data[0])
  //   this.enddate = this.docservice.GetDates(data[1])
  //   this.GeTDeliveryPatnerReports()

  // }

  // dummchargelist: any;
  // DiagnosticChargeslist: any;

  // dummchargelist1: any;
  // count: any;
  // GrandTotal: any;

  // public GeTDeliveryPatnerReports() {
  //   debugger
  //   this.docservice.GetAllDeliveryPatnerDeliverReports(this.startdate, this.enddate, this.deliverycomapnyid).subscribe(
  //     data => {
  //       debugger
  //       this.dummchargelist = data;
  //       this.DiagnosticChargeslist = data;

  //       this.count = this.DiagnosticChargeslist.length;
  //       debugger
  //       this.GrandTotal = 0;
  //       for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
  //         this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].deliveryCharges;
  //       }

  //     }, error => {
  //     }
  //   )
  // }
  // paymenttypeid:any;


  // public GetPaymentTypeID(even) {
  //   if (even.target.value != 0) {
      
  //     this.paymenttypeid = even.target.value;
  //     this.DiagnosticChargeslist = this.dummchargelist.filter(x => x.paymentTypeID == this.paymenttypeid);
  //     this.count = this.DiagnosticChargeslist.length;
  //     this.GrandTotal = 0;
      
  //     for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
  //       this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].deliveryCharges;
  //     }

  //   }
  //   else {
  //     this.GeTDeliveryPatnerReports()
  //   }
  // }



    
  // public getglmasterexcel() {
  //   let hhh = this.tableToJson(document.getElementById('Doc'));
  //   this.exportAsExcelFile(hhh, "Delivery Reports");
  // }

  // public tableToJson(table) {

  //   var data = []; // first row needs to be headers
  //   var headers = [];
  //   for (var i = 0; i < table.rows[0].cells.length; i++) {
  //     headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
  //   }
  //   // go through cells 
  //   for (var i = 1; i < table.rows.length; i++) {
  //     var tableRow = table.rows[i];
  //     var rowData = {};
  //     for (var j = 1; j < tableRow.cells.length - 1; j++) {
  //       rowData[headers[j]] = tableRow.cells[j].innerHTML;
  //     } data.push(rowData);
  //   }
  //   return data;
  // }

  // public exportAsExcelFile(json: any[], excelFileName: string): void {

  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }
}
