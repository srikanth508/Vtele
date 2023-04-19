import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import Labels from '../../Lables/deliverypartner/deliverypartnerlabel.json';
import * as XLSX from 'xlsx';
import { DeliveryService } from '../../services/delivery.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-return-orders-report',
  templateUrl: './return-orders-report.component.html',
  styleUrls: ['./return-orders-report.component.css']
})
export class ReturnOrdersReportComponent implements OnInit {
  options: any;
  constructor(public docservice: DeliveryService) { }


  public languageid: any;
  labels: any;
  public ordertype: any;
  public todaydate: any;
  public Ordertypeid: any;
  startdate: any;
  enddate: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  public deliverycompanyid: any;
  public orderlist: any;
  p: number = 1;
  term: any;
  ngOnInit() {
    this.deliverycompanyid = sessionStorage.getItem('deliveryid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.Ordertypeid = 0;
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 1);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale); 
    this.GetOrdersForDeliveryCompany()
  }
  

  public GetOrdersForDeliveryCompany() {
    this.docservice.GetOrdersForDeliveryCompany(this.startdate, this.enddate).subscribe(
      data => {
       
        let temp: any = data;
        this.orderlist = temp.filter((x: { returnBit: number; refundBit: number; }) => x.returnBit == 1 && x.refundBit == 1);
      }, error => {
      }
    )
  }
  selectedDate(data:any) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetOrdersForDeliveryCompany();
  }





  // public getglmasterexcel() {
  //   let hhh = this.tableToJson(document.getElementById('Appointment'));
  //   this.exportAsExcelFile(hhh, "Orders Reports");
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
  //     for (var j = 0; j < tableRow.cells.length - 1; j++) {
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


  public pageChanged(even:any) {
   
    let fgdgfgd = even;
    this.p = even;
  }
}
