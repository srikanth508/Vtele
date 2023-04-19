import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-register-provider-sm-s',
  templateUrl: './register-provider-sm-s.component.html',
  styleUrls: ['./register-provider-sm-s.component.css'],
})
export class RegisterProviderSmSComponent implements OnInit {
  constructor(
    private SharedService: SharedService,
    private CommonService: CommonService
  ) {}
  languageID: any;
  data: any;
  emailSubject: any;
  smsDesc: any;
  emailattchementurl: any = [];
  cclist: any = [];
  bcclist: any = [];
  emailDesc: any;
  clickRegisterSmsService: Subscription | undefined;
  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
    this.clickRegisterSmsService =
      this.SharedService.getRegisterServiceEmailAndSms().subscribe(
        async (data) => {
          debugger;
          console.log(data);
          this.data = data;

          if (this.languageID == 1) {
            this.emailSubject = 'Welcome to Voiladoc';
            this.emailDesc =
              'Dear ' +
              this.data.name +
              ',' +
              '<br><br>' +
              'Thank You For Registering Voiladoc Plaform. Here are your login details. ' +
              '<br><br>' +
              'Voiladoc pro web link : https://maroc.voiladoc.org/' +
              '<br>' +
              'Pin code  : ' +
              this.data.Pinno +
              '<br>' +
              'UserName :' +
              this.data.userName +
              '<br>' +
              'Password : ' +
              this.data.password +
              '<br><br>' +
              'Please do not share your login credentials with anyone. Contact our helpline on +212522446145 or email us at support@voiladoc.ma' +
              '<br><br>' +
              'Regards,' +
              '<br>' +
              'Voiladoc Team' +
              '<br>' +
              'www.voiladoc.ma';
          } else {
            this.emailSubject = 'Bienvenue sur Voialdoc ';
            this.emailDesc =
              'Cher ' +
              this.data.name +
              ',' +
              '<br><br>' +
              'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion. ' +
              '<br><br>' +
              'Lien web Voiladoc pro : https://maroc.voiladoc.org/' +
              '<br>' +
              'Code PIN  : ' +
              this.data.Pinno +
              '<br>' +
              "Nom d'utilisateur :" +
              this.data.userName +
              '<br>' +
              'Mot de passe : ' +
              this.data.password +
              '<br><br>' +
              "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" +
              '<br><br>' +
              'Meilleures salutations,' +
              '<br>' +
              'Team Voiladoc' +
              '<br>' +
              'www.voiladoc.ma';
          }
          debugger;
          await this.sendEmail();
           await this.sendingSMS();
        }
      );
  }

  async sendEmail() {
    var entity = {
      emailto: this.data.email,
      emailsubject: this.emailSubject,
      emailbody: this.emailDesc,
      attachmenturl: this.emailattchementurl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.CommonService.sendemail(entity).subscribe(
      async (data) => {
        console.log('email respone', data);
      },
      (error) => {
        console.log('email respone', error);
      }
    );
  }

  async sendingSMS() {
    debugger;

    if (this.languageID == 1) {
      var sub =
        'Welcome to Voiladoc' +
        'Pin code  : ' +
        this.data.Pinno +
        'UserName :' +
        this.data.userName +
        'Password : ' +
        this.data.password;
    } else {
      var sub =
        'Bienvenue sur Voialdoc' +
        ' Code PIN  : ' +
        this.data.Pinno +
        '     Nom dutilisateur :' +
        this.data.userName +
        '     Mot de passe : ' +
        this.data.password;
    }
    debugger;

    // return true;
    this.CommonService.SendTwillioSMS(this.data.smsmobileno, sub).subscribe(
      async (data) => {
        debugger
        console.log('Sms success', data);
        return true;
        debugger;
      },
      (error) => {
        console.log('sms failure', error);
      }
    );
  }
}
