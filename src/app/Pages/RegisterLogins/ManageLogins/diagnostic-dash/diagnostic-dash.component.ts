import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-dash',
  templateUrl: './diagnostic-dash.component.html',
  styleUrls: ['./diagnostic-dash.component.css']
})
export class DiagnosticDashComponent implements OnInit {
  loader:boolean | undefined;
  search:any;
  count:any;
  languageid:any;
  pinno:any;
  currentpwd:any;
  countrymanaerid:any;
  showeditbutton:any;
  diagnoticloginList:any;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  p:any;
  id:any;
  username:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  password:any;
  pp:any;
  Enteredpinno:any;
  entercurrentpwd:any;  
  firstname:any;
 lastname:any;
 phoneno:any;
 email:any;
 roleid:any;
 labels:any;
 currentURl:any;
 showMsg:number=0;


  constructor(private RegisterService:RegisterService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentURl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    this.getdiagnosticloginfordash();
  }
 
  public getdiagnosticloginfordash() {
    this.RegisterService.GetDiagnosticLoginForDash(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.diagnoticloginList = data;
        this.count=this.diagnoticloginList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentURl,"GetDiagnosticLoginForDash",error);
      }
    )
  }

  public disablediagnostic(docid:any) {
    this.showPopup=0;
    this.RegisterService.DisableDiagnosticLogin(docid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
          this.getdiagnosticloginfordash();
      }, error => {
        this.SharedService.insertexceptions(this.currentURl,"DisableDiagnosticLogin",error);
      }
    )
  }

  public enablediagnostic(id:any) {
    this.showPopup=0;
    this.RegisterService.EnableDiagnosticLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getdiagnosticloginfordash();
      }, error => {
        this.SharedService.insertexceptions(this.currentURl,"EnableDiagnosticLogin",error);
      }
    )
  }

  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }

  public GetDeatsils(details:any) {

    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno

    this.Showpassword = 0;
  }
  
  public insertdetails() {
    this.showPopup = 0;
    this.loader=true;
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
        this.RegisterService.UpdateDiagnosticCenterAdminRegistrationWeb(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          this.getdiagnosticloginfordash()
        },error=>{
          this.SharedService.insertexceptions(this.currentURl,"UpdateDiagnosticCenterAdminRegistrationWeb",error);
        })
      }
    }
  }


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

        // this.showPopup = 1;
        // this.messageID = 27;
        // this.typeofPopUp = 2;

      }
      else
      {
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




}
