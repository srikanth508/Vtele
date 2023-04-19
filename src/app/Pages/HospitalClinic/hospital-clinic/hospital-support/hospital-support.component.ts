import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-hospital-support',
  templateUrl: './hospital-support.component.html',
  styleUrls: ['./hospital-support.component.css']
})
export class HospitalSupportComponent implements OnInit {
  description:any;
  issuename:any;
  showPopup:any;
  issuephotourl:any=[];
  messageID:any;
  typeofPopUp:any;
  removetgdescription:any;
  hospitalid:any;
  user:any;
  languageid:any;
  loader:boolean | undefined;
  folderName:any;
  labels:any;
  currentUrl:any;


  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.description = ""
    this.user = sessionStorage.getItem('user');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.loader=false;
  }

  files: File[] = [];
  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.issuephotourl.splice(this.files.indexOf(event), 1);
  }


;

  //Upload Attachments

  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.DoctorService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.issuephotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("supportphoto", this.issuephotourl);
      this.loader = false;
    })
  }



  
//to insert details
public insertdetails() {
  debugger
  this.showPopup = 0;
  if (this.issuephotourl == null && this.issuephotourl.length == 0 && this.issuephotourl == undefined) {
    this.showPopup = 1;
    this.messageID = 41;
    this.typeofPopUp = 2;
  }
  else {
    debugger
    var entity = {
      'Issue': this.issuename,
      'Description': this.removetgdescription,
      'Photo': this.issuephotourl[0],
      'TypeID': 5,
      'DoctorID': 0,
      'NurseID': 0,
      'PhysioID': 0,
      'MidWifeID': 0,
      'HospitalID': this.hospitalid,
      'ReceptionID': 0,
      'UserName': this.user,
      'LanguageID': this.languageid
    }
    this.DoctorService.InsertSupportForWeb(entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 42;
        this.typeofPopUp = 1;
        location.href = "#/HospitalClinic/HospitalSupportdash";
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertSupportForWeb",error);
    })
  }
}



}
