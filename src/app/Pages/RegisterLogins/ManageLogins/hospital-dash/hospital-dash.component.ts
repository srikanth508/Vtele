import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
declare var window: any;
@Component({
  selector: 'app-hospital-dash',
  templateUrl: './hospital-dash.component.html',
  styleUrls: ['./hospital-dash.component.css']
})
export class HospitalDashComponent implements OnInit {
  loader:boolean | undefined;
  languageid:any;
  pinno:any;
  currentpwd:any;
  countrymanaerid:any;
  hospitalclinicid:any;
  showeditbutton:any;
  sowadd:any;
  hsopitalloginList:any;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  p:any;
  id:any;
  username:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  Enteredpinno:any;
  password:any;
  pp:any;
  entercurrentpwd:any;
  search:any;
  count:any;
  firstname:any;
  lastname:any;
  phoneno:any;
  email:any;
  roleid:any;
  labels:any;
  currentUrl:any;
  errorModal1:any;

  showMsg:number=0;

  constructor(private RegisterService:RegisterService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    if (this.hospitalclinicid == undefined) {
      this.sowadd = 1
    }
    else {
      this.sowadd = 2
    }

    this.gethospitalclinicfordash();
    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
    )
  }

  //GetHospitalDashboard

  public gethospitalclinicfordash() {
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
        data => {
          this.loader=false;
          this.hsopitalloginList = data;
          this.count= this.hsopitalloginList.length;
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicLoginForDash",error);
        }
      )
    }
    else {
      this.RegisterService.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
        data => {
          this.loader=false;
          var list = data;
          this.hsopitalloginList = list.filter(x => x.hospital_ClinicID == this.hospitalclinicid);
          this.count= this.hsopitalloginList.length;
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicLoginForDash",error);
        }
      )
    }

  }

  //DisableHospital
  public disablehospital(id:any) {
    this.showPopup=0;
    this.RegisterService.DisableHospital_ClinicLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.gethospitalclinicfordash();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"DisableHospital_ClinicLogin",error);
      }
    )
  }

  //Enable
  public enablehospital(hosid:any) {
    this.showPopup=0;
    this.RegisterService.EnableHospital_ClinicLogin(hosid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.gethospitalclinicfordash();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"EnableHospital_ClinicLogin",error);
      }
    )
  }


  //Pagination

  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //Getdetails

  public GetDeatsils(details:any) {

    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno

    this.Showpassword = 0;
  }
  

  //Insert Details
  public insertdetails() {
    this.loader=true;
    this.showPopup = 0;
    if (this.password != undefined) {
      var valpassword = this.RegisterService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
        this.loader=false;
      }
      else {
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }
        this.username = '';
        this.password = '';
        this.RegisterService.UpdateHospitalClinicAdminRegistration(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          sessionStorage.clear();
          sessionStorage.clear();
          location.href = "#/login";
          location.reload();
          this.gethospitalclinicfordash()
        },error=>{
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"UpdateDoctorLogins",error);
        })
      }
    }
  }


  //checkpassword
    public CheckPasswordvalidate() {
     this.showPopup=0;
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      this.entercurrentpwd = "";
      this.Enteredpinno = "";

      this.showPopup = 1;
      this.messageID = 26;
      this.typeofPopUp = 2;
    }
    else {

      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
      }
      else{
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
       }

    }
  }
  
  

//Get Password
public getpassword(details:any) {
  this.oldpassword = details.password,
  this.mypinno = details.pinno,
  this.id = details.id,
  this.firstname = details.firstName,
  this.lastname = details.lastName,
  this.phoneno = details.phoneNo,
  this.email = details.email,
  this.username = details.userName,
  this.roleid = details.roleID
  this.Showpassword = 0;
}


removeHash(event: { which: any; keyCode: any; }): boolean {
  debugger
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode == 35||charCode == 38) {
    this.showMsg=1;

    return false;

  }
  this.showMsg=0;
  return true;
}



showPopUp() {
  var valpassword = this.RegisterService.strongpassword(this.password);
    if (valpassword == false) {
      this.pp = 1;

    }
    else {
      document.getElementById('close')?.click();
      this.errorModal1.show();
    }
}


hidePopUp()
{
  this.errorModal1.hide();
}


}
