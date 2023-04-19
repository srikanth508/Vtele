import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';



@Component({
  selector: 'app-send-mails',
  templateUrl: './send-mails.component.html',
  styleUrls: ['./send-mails.component.css']
})
export class SendMailsComponent implements OnInit {
  dummpatientPatientlist: any;
  Patientlist: any;
  count: any;
  languageid: any;
  user: any;
  typeid: any;
  currentUrl: any;
  p: any;
  search: any;
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  mailphotourlurl: any = [];
  folderName: any;
  labels: any;
  filteredList: any;
  checkall: any;

  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.checkall = false;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
    this.GetPatientlist();
    this.typeid = 1;

    this.fromEmail = "info@voiladoc.com"
  }

  public GetPatientlist() {
    this.MenuService.GetPatientRegistrationForSendEmailsWeb(this.languageid).subscribe(
      data => {
        this.dummpatientPatientlist = data;
        this.Patientlist = this.dummpatientPatientlist.filter((x: { type: any; }) => x.type == this.typeid)
        this.filteredList = this.Patientlist;

        // this.Patientlist.array.forEach((i:any) => {
        //   this.Patientlist[i]['checked'] = false;
        // });
        for (let i = 0; i < this.Patientlist.length; i++) {
          this.Patientlist[i]['checked'] = false;
          console.log("Patientlist", this.Patientlist)
        }


        this.count = this.Patientlist.length;
        this.loader = false;
      },
      error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientRegistrationForSendEmailsWeb", error);
      }
    );
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //Get TYpeID

  public SelectTypeID(even: any) {
    this.typeid = even.target.value;
    this.Patientlist = this.dummpatientPatientlist.filter((x: { type: any; }) => x.type == this.typeid);
    this.filteredList = this.Patientlist;
    this.count = this.filteredList.length;

  }

  // sendemailpatients: any = [];

  //Selecting All Patients 

  public GetPatientSelectAll(even: any) {
    debugger
    var chkboxes = document.getElementsByClassName('chk_sendmailcheck')
    if (this.search != '' && this.search != undefined) {
      // this.sendemailpatients = this.filteredList;
      for (let i = 0; i < this.filteredList.length; i++) {
        if (even.target.checked) {
          this.filteredList[i]['checked'] = true;
        }
        else {
          this.filteredList[i]['checked'] = false;
        }
        console.log("Patientlist", this.Patientlist)
      }

    }
    else {
      if (even.target.checked == true) {
        this.checkall = true;
        this.filteredList = this.Patientlist;
        // console.log('sendsms', this.sendemailpatients)
        this.Patientlist.checked = true;

        for (let i = 0; i < this.Patientlist.length; i++) {
          this.Patientlist[i]['checked'] = true;
          console.log("Patientlist", this.Patientlist)
        }

      }
      else if (even.target.checked == false) {
        this.checkall = false;
        //  this.sendemailpatients = []

        for (let i = 0; i < this.Patientlist.length; i++) {
          this.Patientlist[i]['checked'] = false;
          console.log("Patientlist", this.Patientlist)
        }
      }
    }
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
    this.mailphotourlurl.splice(this.files.indexOf(event), 1);
  }

  uploadsAttchments() {
    this.folderName = "Images/mailphoto"
    this.MenuService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.mailphotourlurl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("mailphoto", this.mailphotourlurl);
      this.loader = false;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "AllFilesUploads", error);
    })
  }




  public GetPatientSendemailslist(even: any, list: any) {
    debugger
    if (even.target.checked) {
      debugger
      list.checked = true;
      // this.sendemailpatients.push(list);
      // list.selected=1;
    }
    else {
      debugger;
      list.checked = false;
      // this.sendemailpatients.splice(this.sendemailpatients.indexOf(list), 1);
      // list.selected=0;
    }
    this.checkall = this.filteredList.filter((x: { checked: any; }) => x.checked == true).length > 0 ? true : false;
  }
  showpatientemails: any;
  showmails: any;
  showtoemails: any;
  ccemails: any;
  cclistarray: any;
  showbccmails: any;
  fromEmail: any;
  public getpatientEmails() {
    debugger
    this.showpatientemails = "";
    this.showmails = [];
    this.cclist = "";
    this.bcclist = "";
    let mailstobesent = this.filteredList.filter((x: { checked: any; }) => x.checked != false);
    this.showtoemails = mailstobesent.map((x: { emailID: any; }) => x.emailID);
    this.showpatientemails = this.showtoemails.join(';');



    // this.ccemails = this.cclistarray.map(x => x.emailID);
    // this.cclist = this.ccemails.join(';');

    // this.showbccmails = this.bcclistarray.map(x => x.emailID);
    // this.bcclist = this.showbccmails.join(';');

  }



  message: any;
  Subject: any;
  attchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];
  emailidd: any;

  public SendEmail() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    for (let i = 0; i < this.filteredList.length; i++) {

      if (this.filteredList[i].checked) {
        var entity = {
          'emailto': this.filteredList[i].emailID,
          'emailsubject': this.Subject,
          'emailbody': this.message,
          'attachmenturl': this.mailphotourlurl,
          'cclist': this.cclist,
          'bcclist': this.bcclist
        }
        this.MenuService.sendemail(entity).subscribe(data => {

          var entity1 = {
            'PatientID': this.filteredList[i].id,
            'Subject': this.Subject,
            'Message': this.message,
            'SenderID': '1',
            'senderName': this.user,
            'ReceiverName': this.filteredList[i].patientName,
            'TypeID': this.typeid
          }
          this.MenuService.InsertPatientEmails(entity1).subscribe(data => {

            this.emailidd = data;
            for (let j = 0; j < this.mailphotourlurl.length; j++) {
              var entity2 = {
                'EmailID': this.emailidd,
                'AttachmentUrl': this.mailphotourlurl[j]
              }
              this.MenuService.InsertEmail_Attachments(entity2).subscribe(data => {

              }, error => {
                this.SharedService.insertexceptions(this.currentUrl, "InsertEmail_Attachments", error);
              })
            }
          })
        })
      }

    }
    this.showPopup = 1;
    this.messageID = 76;
    this.typeofPopUp = 1;
    location.href = "#/menus/EmailDashboard"
  }

  public ClearEmail() {
    this.fromEmail = "";
    this.showpatientemails = "";
    this.Subject = "";
    this.message = "";
    this.files = [];
  }


  Search() {
    debugger;
    this.search;

    this.filteredList = this.Patientlist.filter((x: { patientName: string }) =>
      x.patientName.includes(this.search));
  }


}
