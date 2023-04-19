import { Component, OnInit } from '@angular/core'; 
import Swal from 'sweetalert2';
import Labels from '../../Lables/deliverypartner/deliverypartnerlabel.json'; 
import { DeliveryService } from '../../services/delivery.service';
@Component({
  selector: 'app-delivery-partner-appointments',
  templateUrl: './delivery-partner-appointments.component.html',
  styleUrls: ['./delivery-partner-appointments.component.css']
})
export class DeliveryPartnerAppointmentsComponent implements OnInit {
  labels: any;
  languageid: any;
  value: any;
  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetOrdersForDeliveryCompany();
  }

  constructor(public docservice: DeliveryService) { }

  public deliverycompanyid: any;
  public orderlist: any;
  public term: any;
  p: number = 1;
  public cancelid: any;
  public reason: any;
  public partnerlist: any;
  public medicalorderid: any;
  public ordertype: any;
  public todaydate: any;
  labels1:any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  // ngOnInit() {
  //   this.Ordertypeid = 0;
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

  //   var kkk = this.SDate.setDate(this.SDate.getDate() - 1);
  //   var lll = this.EDate.setDate(this.EDate.getDate() + 7);

  //   const format = 'yyyy-MM-dd';
  //   const myDate = new Date();
  //   const locale = 'en-US';
  //   this.todaydate = formatDate(myDate, format, locale);
  //   this.startdate = formatDate(kkk, format, locale);
  //   this.enddate = formatDate(lll, format, locale);
  //   this.deliverycompanyid = localStorage.getItem('deliveryid');
  //   this.languageid = localStorage.getItem('LanguageID');
  //   this.GetOrdersForDeliveryCompany();
  //   this.docservice.GetDeliveryPartnersByID(this.deliverycompanyid).subscribe(
  //     data => {
       
  //       this.partnerlist = data;
  //     }, error => {
  //     }
  //   )

  //   this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
  //     data => {
       
  //       this.labels1 = data;
  //     }, error => {
  //     }
  //   )

  //   this.getlanguage();
  // }

  // public getlanguage() {
  //   this.docservice.Getadmin_DeliveryLoginsOrdersEmployee_Label(this.languageid).subscribe(
  //     data => {
       
  //       this.labels = data;
  //     }, error => {
  //     }
  //   )
  // }




  public pageChanged(even:any) {
   
    let fgdgfgd = even;
    this.p = even;
  }

  public GetOrdersForDeliveryCompany() {
    debugger;
    this.docservice.GetOrdersForDeliveryCompany(this.startdate, this.enddate).subscribe(
      data => {
       
        let temp: any = data;
        this.orderlist = temp.filter((x: { deliveredBit: number; }) => x.deliveredBit != 1);
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


  public acceptdelete(type:any, medicalOrderID:any, ar:any, id:any) {


    if (type == 1) {
      this.docservice.AccpetMedicineDeliveryByDeliveryCompany(medicalOrderID, ar, id).subscribe(
        data => {
         
          Swal.fire('Complete', 'Action Completed');
          this.GetOrdersForDeliveryCompany();
        }, error => {
        }
      )
    }
    else {
      this.docservice.AccpetShoppingDeliveryByDeliveryCompany(ar, id).subscribe(
        data => {
         
          Swal.fire('Complete', 'Action Completed');
          this.GetOrdersForDeliveryCompany();
        }, error => {
        }
      )
    }


  }


  public getid(type:any, mid:any) {
    this.ordertype = type;
    this.medicalorderid = mid;
  }

  public asssign(pid:any) {
   
    if (this.ordertype == 1) {
      var entity = {
        'MedicineOrderID': this.medicalorderid,
        'DeliveryCompanyID': this.deliverycompanyid,
        'PartnerID': pid,
        'Status': 'Assigned'
      }
      this.docservice.InsertDeliveryPartnerAssignedOrders(entity).subscribe(res => {
        let test = res;
        Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
        this.GetOrdersForDeliveryCompany();
      })
    }
    else {
     
      var entitytwo = {
        'OrderID': this.medicalorderid,
        'DeliveryCompanyID': this.deliverycompanyid,
        'PartnerID': pid,
        'Status': 'Assigned'
      }
      this.docservice.InsertDeliveryPartnerAssignedShoppingOrders(entitytwo).subscribe(res => {
        let test = res;
        Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
        this.GetOrdersForDeliveryCompany();
      })
    }
  }
  // Ordertypeid
  // public GetOrdertypeidID(event) {
  //   this.Ordertypeid = event.target.value;
  //   if (this.Ordertypeid == 0) {
  //     this.GetOrdersForDeliveryCompany();
  //   }
  //   else {
  //     this.docservice.GetOrdersForDeliveryCompany(this.startdate, this.enddate).subscribe(
  //       data => {
         
  //         let temp: any = data;
  //         this.orderlist = temp.filter(x => x.deliveredBit != 1 && x.ordertypeid == this.Ordertypeid);
  //       }, error => {
  //       }
  //     )
  //   }
  // }

}
