import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';
@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.css']
})
export class InvitationFormComponent implements OnInit {
  
  constructor(private MenuService: MenuService, private SharedService: SharedService, private activatedroute: ActivatedRoute,) { }
  labels: any;
  messageID: any;
  typeofPopUp: any;
  loader: boolean | undefined;
  showPopup: any;
  noOfInstalations: any;
  amount: any;
  currentUrl: any;
  languageid: any;
  ID: any;
  list: any;
  showbutton: any;
  ngOnInit(): void {
    this.loader = false;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.activatedroute.params.subscribe(params => {
      if (  this.ID = params['id']) {
        this.showbutton = 0
      }
      else if (  this.ID! = params['id']) {
        this.showbutton = 1
        this.getpatientinvitations()
      }
    
    });
    this.getpatientinvitations() 
  }
   //Get Patient Invitation
   public getpatientinvitations() {
    this.MenuService.GetPatient_Invites_Master(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.list = data;
        var list = this.list.filter((x: { id: any; }) => x.id == this.ID);
        this.noOfInstalations=list[0].noOfInstalations;
        this.amount=list[0].amount
       // 'LicenseValidTill': new Date(),     
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_Invites_Master", error);
      }
    );
  }


  InsertDetails() {
    debugger;
    var entity = {
      "NoOfInstalations": this.noOfInstalations,
      "Amount": this.amount
    }
    this.MenuService.InsertPatient_Invites_Master(entity).subscribe(data => {
      let res = data;
      this.showPopup = 1;
      this.messageID = 1;
      this.typeofPopUp = 1;
      location.href = "#/menus/Invitationmaster"
    })
  }

  Updatedetails() {
    this.showPopup = 0;
    var entity = {
      'ID': this.ID,
      "NoOfInstalations": this.noOfInstalations,
      "Amount": this.amount
    }
    this.MenuService.UpdatePatientInvitesMaster(entity).subscribe(data => {
      let res = data;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/menus/Invitationmaster"
    })

  }
}


