import { Component, OnInit } from '@angular/core';
 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-delivery-pwd',
  templateUrl: './change-delivery-pwd.component.html',
  styleUrls: ['./change-delivery-pwd.component.css']
})
export class ChangeDeliveryPwdComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // constructor(public docservice: HelloDoctorService) { }

  // public physiologinlist: any;
  // public id: any;
  // public term: any;
  // p: number = 1;
  // public labels: any;
  // public languageid: any;
  // public pinno: any;
  // public Showpassword: any;
  // public deliverycompanyid: any;
  // currentpwd: any;
  // ngOnInit() {
  //   this.languageid = localStorage.getItem('LanguageID');
  //   this.pinno = localStorage.getItem('Pinno');

  //   this.currentpwd = localStorage.getItem('Password');
  //   this.deliverycompanyid = localStorage.getItem('deliveryid');
  //   this.GetDeliveryCompanyLoginAdmin();

  //   this.getlanguage();
  // }

  // public getlanguage() {
  //   this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
  //     data => {

  //       this.labels = data;
  //     }, error => {
  //     }
  //   )
  // }
  // dummphysiologinlist: any;

  // public GetDeliveryCompanyLoginAdmin() {
  //   this.docservice.GetDeliveryCompanyLoginAdmin(this.languageid).subscribe(
  //     data => {

  //       this.dummphysiologinlist = data;

  //       this.physiologinlist = this.dummphysiologinlist.filter(x => x.deliveryCompanyID == this.deliverycompanyid)


  //     }, error => {
  //     }
  //   )
  // }


  // public pageChanged(even) {

  //   this.p = even;
  // }





  // public username: any;
  // public password: any;
  // public mypinno: any;


  // public GetDeatsils(details) {

  //   this.id = details.id,
  //     this.username = details.userName,
  //     this.password = details.password,
  //     this.mypinno = details.pinno,


  //     this.Showpassword = 0;
  // }

  // public pp: any;

  // public insertdetails() {
  //   if (this.password != undefined) {
  //     var valpassword = this.docservice.strongpassword(this.password);
  //     if (valpassword == false) {

  //       this.pp = 1;
  //     }
  //     else {
  //       var entity = {
  //         'ID': this.id,
  //         'UserName': this.username,
  //         'Password': this.password
  //       }
  //       this.username = '';
  //       this.password = '';
  //       this.docservice.UpdateDeliveryCompanyLogin(entity).subscribe(data => {
  //         if (data != 0) {
  //           if (this.languageid == 1) {
  //             Swal.fire('Success', 'Password Updated successfully', 'success');
  //             this.pp = 0;
  //             this.GetDeliveryCompanyLoginAdmin();
  //             document.getElementById('close').click();
  //           }
  //           else {
  //             Swal.fire('', 'Mis à jour avec succés', 'success');
  //             this.pp = 0;
  //             this.GetDeliveryCompanyLoginAdmin();
  //             document.getElementById('close').click();
  //           }

  //         }
  //         else {
  //           Swal.fire('Success', 'User Name Already Exists', 'success');
  //           this.pp = 0;
  //           this.GetDeliveryCompanyLoginAdmin();
  //           document.getElementById('close').click();
  //         }
  //       })
  //     }
  //   }
  // }

  // public Enteredpinno: any;

  // public entercurrentpwd: any;

  // public CheckPasswordvalidate() {

  //   if (this.Enteredpinno == "" || this.entercurrentpwd == "") {

  //     if (this.languageid == 1) {
  //       Swal.fire('Please Enter Your Pin No && Current password')
  //       this.entercurrentpwd = "";
  //       this.Enteredpinno = "";
  //     }
  //     else {
  //       Swal.fire("Nom d'utilisateur et mot de passe ne correspondent pas.");
  //       this.entercurrentpwd = "";
  //       this.Enteredpinno = "";
  //     }
  //   }
  //   else {

  //     if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //       this.entercurrentpwd = "";
  //     }
  //     else {

  //       if (this.languageid == 1) {
  //         Swal.fire('Please enter valid Pinno and valid password')
  //         this.Enteredpinno = ""
  //         this.currentpwd = ""
  //       }
  //       else {
  //         Swal.fire('Veuillez saisir un Pinno valide et un mot de passe valide')
  //         this.Enteredpinno = ""
  //         this.currentpwd = ""
  //       }

  //     }
  //   }
  // }
}
