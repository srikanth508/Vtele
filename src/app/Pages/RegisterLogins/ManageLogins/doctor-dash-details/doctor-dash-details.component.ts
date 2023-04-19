import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-doctor-dash-details',
  templateUrl: './doctor-dash-details.component.html',
  styleUrls: ['./doctor-dash-details.component.css'],
})
export class DoctorDashDetailsComponent implements OnInit {
  constructor(
    private RegisterService: RegisterService,
    private SharedService: SharedService
  ) { }

  doctorID: any;
  languageid: any;
  hospitalclinicid: any;
  doctorList: any;
  docdd: any;
  dummdoctorList: any;
  password: any;
  userName: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  labels: any;
  selectdoctor: any;
  search: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectdoctor = this.labels.selectDoctor;
    this.search = this.labels.search;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.hospitalclinicid == undefined) {
      debugger;
      this.RegisterService.GetDoctorRegistratingLogins(
        this.languageid
      ).subscribe(
        (data) => {
          debugger;
          this.doctorList = data;
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDoctorRegistratingLogins',
            error
          );
        }
      );
    } else if (this.hospitalclinicid != undefined) {
      debugger;
      this.RegisterService.GetDoctorRegistratingLogins(
        this.languageid
      ).subscribe(
        (data) => {
          debugger;
          this.dummdoctorList = data;
          this.doctorList = this.dummdoctorList.filter(
            (x: { hospitalClinicID: any }) =>
              x.hospitalClinicID == this.hospitalclinicid
          );

          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDoctorRegistratingLogins',
            error
          );
        }
      );
    }



    // this.getdoctorloginfordash();
  }

  public GetDoctorID(item2: any) {
    this.doctorID = item2.id;
  }

  public async insertDetails() {
    this.showPopup = 0;
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.doctorID == undefined) {
      this.showPopup = 1;
      this.messageID = 16;
      this.typeofPopUp = 2;
    } else {
      var entity = {
        DoctorID: this.doctorID,
        UserName: this.userName,
        Password: this.password,
      };
      this.RegisterService.InsertDoctorLogin(entity).subscribe(
        async (data) => {
          if (data != 0) {
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            await this.getdoctorloginfordash();
          } else {
            this.showPopup = 1;
            this.messageID = 15;
            this.typeofPopUp = 2;
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertDoctorLogin',
            error
          );
        }
      );
    }
  }

  pinno: any;
  email: any;
  doctorname: any;
  smsmobileno: any;
  async getdoctorloginfordash() {
    this.RegisterService.GetDoctorLoginForDash(this.languageid).subscribe(
      async (data) => {
        var list = data.filter(
          (x: { doctorID: any }) => x.doctorID == this.doctorID
        );
        (this.pinno = list[0].pinno),
          (this.email = list[0].emailID),
          (this.doctorname = list[0].doctorName),
          (this.smsmobileno = list[0].smsmobileno);
        // await this.sendmail();
        // await this.SendTwiliSms()

        this.SharedService.SendEmailSmsToProvider(
          this.pinno,
          this.userName,
          this.password,
          this.smsmobileno,
          this.email,
          this.doctorname
        );
        return true;
      },
      (error) => { }
    );
  }
}
