import { Component, OnInit } from '@angular/core'; 
import Swal from 'sweetalert2';
import { DeliveryService } from '../../services/delivery.service';
import Labels from '../../Lables/deliverypartner/deliverypartnerlabel.json';
@Component({
  selector: 'app-partners-dashboard',
  templateUrl: './partners-dashboard.component.html',
  styleUrls: ['./partners-dashboard.component.css']
})
export class PartnersDashboardComponent implements OnInit {
  constructor(public docservice: DeliveryService) { }

  public dcid: any;
  public partnerlist: any;
  public term: any;

  public labels: any;
  public languageid: any;
  public pinno: any;
  public currentpwd: any;
  public Showpassword: any;
  ngOnInit() {
    this.dcid = sessionStorage.getItem('deliveryid');
    this.pinno = sessionStorage.getItem('Pinno');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentpwd = sessionStorage.getItem('Password');
    this.docservice.GetDeliveryPartnersByID(this.dcid).subscribe(
      data => {

        this.partnerlist = data;
      }, error => {
      }
    )
    this.languageid = sessionStorage.getItem('LanguageID');
  }

  id: any;
  username: any;
  password: any;
  mypinno: any;

  public GetDeatsils(details:any) {

    this.id = details.id,
      this.username = details.userName,
      this.password = details.password,
      this.mypinno = details.pinno,
      this.Showpassword = 0;
  }



  public Enteredpinno: any;
  public entercurrentpwd: any;

  public CheckPasswordvalidate() {

    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {

      if (this.languageid == 1) {
        Swal.fire('Please Enter Your Pin No && Current password')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
      else {
        Swal.fire("Nom d'utilisateur et mot de passe ne correspondent pas.");
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
    }
    else {

      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
      }
      else {

        if (this.languageid == 1) {
          Swal.fire('Please enter valid Pinno and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else {
          Swal.fire('Veuillez saisir un Pinno valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }

      }
    }
  }
}
