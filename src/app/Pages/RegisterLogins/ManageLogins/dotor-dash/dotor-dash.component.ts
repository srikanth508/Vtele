import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-dotor-dash',
  templateUrl: './dotor-dash.component.html',
  styleUrls: ['./dotor-dash.component.css']
})
export class DotorDashComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  pinno: any;
  hospitalclinicid: any;
  currentpwd: any;
  countrymanaerid: any;
  showeditbutton: any;
  doctorloginlist: any;
  Showpassword: any;
  count: any;
  dummdcotorlogins: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  p: any;
  id: any;
  username: any;
  oldpassword: any;
  mypinno: any;
  password: any;
  pp: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  search: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  roleid: any;
  labels: any;
  currentUrl: any;
  showMsg:number=0;



  constructor(private RegisterService: RegisterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    this.getdoctorloginfordash();

    this.Showpassword = 1

  }

  public getdoctorloginfordash() {
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.doctorloginlist = data;
          console.log('doclist', this.doctorloginlist)
          this.count = this.doctorloginlist.length;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetDoctorLoginForDash", error);
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummdcotorlogins = data;
          this.doctorloginlist = this.dummdcotorlogins.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.doctorloginlist.length;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetDoctorLoginForDash", error);
        }
      )
    }
  }

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  public disabledoctor(docid: any) {
    this.showPopup = 0;
    this.loader = true;
    this.RegisterService.DisableDoctorLogin(docid).subscribe(
      data => {
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getdoctorloginfordash();
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "DisableDoctorLogin", error);
      }
    )
  }


  public enabledoctor(id: any) {
    this.loader = true;
    this.showPopup = 0;
    this.RegisterService.EnableDoctorLogin(id).subscribe(
      data => {
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getdoctorloginfordash();
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "EnableDoctorLogin", error);
      }
    )
  }

  public GetDeatsils(details: any) {

    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno

    this.Showpassword = 0;
  }

  public insertdetails() {
    this.showPopup = 0;
    if (this.password != undefined) {
      var valpassword = this.RegisterService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      }
      else {
        this.loader = true;
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }

        this.username = '';
        this.password = '';
        this.RegisterService.UpdateDoctorLogins(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          this.getdoctorloginfordash();
          document.getElementById('close')?.click();
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "UpdateDoctorLogins", error);
        })
      }
    }
  }



  //Checkpassword
  public CheckPasswordvalidate() {
    this.showPopup = 0;
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
      else {
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
      }

    }
  }


  //Update Details


  public Updatedetails() {

    var entity = {
      'ID': this.id,
      'FirstName': this.firstname,
      'LastName': this.lastname,
      'PhoneNo': this.phoneno,
      'Email': this.email,
      'UserName': this.username,
      'Password': this.password,
      'RoleID': this.roleid
    }
    this.RegisterService.UpdateUsers_RoleMapping(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "UpdateUsers_RoleMapping", error);
    })

  }

  //Get Password
  public getpassword(details: any) {
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
    this.Enteredpinno = "";
    this.entercurrentpwd = ""
  }




  sendmail(details: any) {
    this.showPopup = 0;
    this.SharedService.SendEmailSmsToProvider(
      details.pinno,
      details.userName,
      details.password,
      details.smsmobileno,
      details.emailID,
      details.doctorName
    );

    this.showPopup = 1;
    this.typeofPopUp = 1
    this.messageID = 76;

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
