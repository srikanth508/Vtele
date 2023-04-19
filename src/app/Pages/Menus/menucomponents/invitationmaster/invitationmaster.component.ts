import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Labels from '../../../Lables/Report/reportlabels.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-invitationmaster',
  templateUrl: './invitationmaster.component.html',
  styleUrls: ['./invitationmaster.component.css']
})
export class InvitationmasterComponent implements OnInit {
  languageid: any;
  invitationsList: any;
  loader: boolean | undefined;
  currentUrl: any;
  p: any;
  search: any;
  count: any;
  labels: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getpatientinvitations();
  }


  //Get Patient Invitation
  public getpatientinvitations() {
    this.MenuService.GetPatient_Invites_Master(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.invitationsList = data;
        this.count = this.invitationsList.length;
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_Invites_Master", error);
      }
    );
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  public DeleteUsers(id: any) {
    debugger
      Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MenuService.DeletePatientInvitesMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
        this.typeofPopUp = 1;
      }
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "DeleteDoctorRegistration", error);
    })
  /*   this.MenuService.DeletePatientInvitesMaster(id).subscribe(
      data => {
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_Invites_Master", error);
      }
    ); */
  }
  edit(id: any) {
    debugger;
    location.href = "#/menus/invitationForm/" + id

  }


}
