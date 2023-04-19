import { Component, OnInit } from '@angular/core';
 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-deliver-partner-profile',
  templateUrl: './deliver-partner-profile.component.html',
  styleUrls: ['./deliver-partner-profile.component.css']
})
export class DeliverPartnerProfileComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   constructor(public docservice: HelloDoctorService) { }
//   public companyname: any;
//   public contactname: any;
//   public phno: any;
//   public email: any;
//   public address: any;
//   public cityid: any;
//   public areaid: any;
//   public pincode: any;
//   public countrylist; any;
//   public countrydd: any;
//   public countryid:any;
//   public citydd:any;
//   public areadd:any;
//   public citylist: any;
//   public arealist: any;
//   public details:any;
//   public id:any;
//   public labels:any;
//   public languageid:any;
//   ngOnInit() {
//     this.id=localStorage.getItem('deliveryid')
//     this.languageid = localStorage.getItem('LanguageID');
//     this.GetCountryMaster();
//     this.GetDelivarycompany();


//     this.getlanguage();
//   }
  
//   public getlanguage()
//   {
//     this.docservice.GetAdmin_CompanyDetails_Label(this.languageid).subscribe(
//       data => {
       
//         this.labels = data;
//       }, error => {
//       }
//     )  
//   }

//   public GetCountryMaster() {
//     this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
//       data => {
       
//         this.countrylist = data;
       
//       }, error => {
//       }
//     )
//   }
//   public GetDelivarycompany()
//   {
//     this.docservice.GetDeliveryCompanyByIDAndLanguageID(this.id,this.languageid).subscribe(data=>{
//       this.details=data[0];
//       this.companyname=this.details.companyName,
//       this.contactname=this.details.contactPerson,
//       this.phno=this.details.phoneNo,
//       this.email=this.details.emailID,
//       this.address=this.details.address,
//       this.countryid=this.details.countryID,
//       this.cityid=this.details.cityID,
//       this.areaid=this.details.areaID,
//       this.pincode=this.details.pincode,
     
//       this.GetCountryMaster();
//       this.getareamaster()
//       this.getareamasterbyid();
      
//     },error=>{

//     })
//   }

//   public GetCountryID(even) {
   
//     this.countryid = even.target.value;
//     this.getareamaster()
   
//   }
// public getareamaster()
// {
//   this.docservice.GetCityMasterBYIDandLanguageID(this.countryid,this.languageid).subscribe(
//     data => {
     
//       this.citylist = data;

    
//     }, error => {
//     }
//   )

// }

//   public GetcityID(even) {
   
//     this.cityid = even.target.value
//     this.getareamasterbyid();
//   }
//   public getareamasterbyid() {
   
//     this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid,this.languageid).subscribe(
//       data => {
       
//         this.arealist = data;
       
//       }, error => {
//       }
//     )
//   }

//   public GetAreaID(even) {
   
//     this.areaid = even.target.value;
//     for (let i = 0; i < this.arealist.length; i++) {
     
//       if (this.arealist[i].id == this.areaid) {
       
//         this.pincode = this.arealist[i].pincode
//       }
//     }
//   }
//   public updatedetails() {
   
//     var entity = {
//       'LanguageID':this.languageid,
//       'ID':this.id,
//       'CompanyName': this.companyname,
//       'ContactPerson': this.contactname,
//       'PhoneNo': this.phno,
//       'EmailID': this.email,
//       'Address': this.address,
//       'CountryID': this.countryid,
//       'CityID': this.cityid,
//       'AreaID': this.areaid,
//       'Pincode': this.pincode
//     }
   
//     this.docservice.UpdateDeliveryCompany(entity).subscribe(data=>{
//       if(data!=undefined)
//       {
//         Swal.fire("Updated Successfully");
     
//       }
//     })

// }
}
