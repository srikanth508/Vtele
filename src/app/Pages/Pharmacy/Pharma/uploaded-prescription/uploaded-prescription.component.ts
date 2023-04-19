import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';


@Component({
  selector: 'app-uploaded-prescription',
  templateUrl: './uploaded-prescription.component.html',
  styleUrls: ['./uploaded-prescription.component.css']
})
export class UploadedPrescriptionComponent implements OnInit {


  @Input() OrdersList: any;
  @Input() typeID: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  details: any;
  pharmacyID: any;
  languageID: any;
  medicineList: any;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  photosList: any;
  typeOfAttchment: any;
  comments: any;
  amount: any;
  labels:any;
  currentUrl:any;

  
  constructor(private PharmacyService: PharmacyService, private SharedService: SharedService) { }

  ngOnInit(): void {
    debugger
    this.loader = true;
    this.currentUrl=window.location.href;
    this.pharmacyID = sessionStorage.getItem('pharmacyid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    debugger
    console.log("orders", this.OrdersList);
    this.details = this.OrdersList;

    if (this.typeID == 8) {
      this.getPhotos()
    }
  }



  getPhotos() {
    this.PharmacyService.GetPharmacyAppointmentPhotos(this.details.id).subscribe(data => {
      this.loader = false;
      this.photosList = data;
      this.typeOfAttchment = data[0].typeID
    },error=>{
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyAppointmentPhotos",error);
    })
  }

  openNewwindow(photo: any) {
    location.href = "#/Shared/view/" + btoa(photo)

  }





  files: File[] = [];
  attchmentUrl: any = [];
  folderName: any;

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
    this.attchmentUrl.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/SupportPhoto"
    this.PharmacyService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.attchmentUrl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("supportphoto", this.attchmentUrl);
      this.loader = false;
    })
  }



  public updateamount() {
    this.showLoader.emit();
    var entity = {
      'ID': this.details.id,
      'PhotoPrescriptionAmount': this.amount,
      'SubPhotoUrl': this.attchmentUrl[0],
      'SubRemarks': this.comments
    }
    this.PharmacyService.UpdatePatient_TextMedicineDetailsPhotoAmount(entity).subscribe(data => {
      this.close.emit(this.messageID = 34);
      this.SharedService.sendPharmacySMS(this.details, 6, 1)
    }, error => {
       this.SharedService.insertexceptions(this.currentUrl,"UpdatePatient_TextMedicineDetailsPhotoAmount",error);
    })
  }
}
