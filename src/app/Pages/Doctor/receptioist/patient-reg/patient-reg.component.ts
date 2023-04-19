import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Doctors/myAppointments.json';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {
  languageID: any;
  doctorid: any;
  hospitalid: any;
  countryList: any;
  regionList: any;
  regiondd = {};
  countryID: any;
  cityid: any;
  citylist: any;
  areaid: any;
  arealist: any;
  pincode: any;
  identityphoto: any = [];
  insurancePhoto: any = [];
  folderName: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  cityList: any;
  loader: boolean | undefined;
  patientname: any;
  mobileno: any;
  email: any;
  gender: any;
  address: any;
  nationalidentitycardno: any;
  lastname: any;
  dateofbirth: any;
  knownalrregies: any;
  insurancename: any;
  patientid: any;
  currentUrl: any;
  areadd = {}
  countrydd = {}
  citydd = {};
  regionID: any;
  cityID: any;
  areaList: any;
  areaID: any;
  pinCode: any;
  id: any;
  showbit: any;
  patientslist: any;
  showidproof: any;
  showphoto: any;
  attachmentsurl: any;
  idproofurl: any;
  identityPhoto: any;
  showInsurancePhoto: any;
  labels: any;
  selectregion: any;
  selectprovince: any;
  selectcity: any;
  typeID: any;
  dummpatientList: any;
  patientdd = {}
  relationShipID: any;
  relationPatientID: any;
  select: any;
  relation: any;
  roleID: any;
  constructor(private DoctorService: DoctorService, private SharedService: SharedService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem("LanguageID");
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.select = this.labels.select
    this.roleID = sessionStorage.getItem("roleid");
    this.selectregion = this.labels.selectRegion;
    this.selectprovince = this.labels.selectProvince;
    this.selectcity = this.labels.selectCity;
    this.doctorid = sessionStorage.getItem('userid');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.showbit = 0;
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      } else {
        debugger
        this.id = atob(this.id)
        this.showbit = 1;
        this.Getregisterdpatients();
      }
    })
    this.getCountryMaster();
    this.getAllPatients();
    this.getCountryCodeNew()

    this.countryCode = "212"

  }
  countryCodeList: any;

  getphoneNumber(num: any) {
    debugger
    this.showPopup = 0;
    this.mobileno = num;
    var splitArray = num.split("")
    if (splitArray[0] == "0") {
      this.showPopup = 1;
      this.messageID = 84;
      this.typeofPopUp = 2;
      console.log("0 is not allowed to enter");
      this.mobileno = ""
      splitArray = ""



    }



    console.log()

  }

  countryCode: any;

  getCountryCode(even: any) {
    this.countryCode = even.target.value;



  }

  getCountryCodeNew() {
    this.DoctorService.GetCountryCodeMasterWeb().subscribe(data => {
      this.countryCodeList = data;
    }, error => {
      console.log(error)
    })
  }

  getAllPatients() {
    this.DoctorService.GetPatientRegistration('2020-01-01', '2060-01-01', this.languageID).subscribe(
      data => {

        // this.patientslist = 
        // this.dummlist.filter(x => x.doctorID == this.doctorid)
        this.patientslist = data;
        this.dummpatientList = data;
        this.patientdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'patientName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: 'Rechercher'
        };

      },
      error => { }
    );
  }



  public GetPatientID(item: any) {
    this.relationPatientID = item.id;
    var list = this.dummpatientList.filter((x: { id: any; }) => x.id == this.relationPatientID)
    this.email = list[0].emailID,
      this.mobileno = list[0].mobileNumber

  }

  // getCountry 

  public getCountryMaster() {
    this.DoctorService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      data => {
        this.countryList = data;
        this.loader = false;
        console.log("CountryList", this.countryList)
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }


  //getRegion

  public getCountryID(even: any) {

    this.countryID = even.target.value;
    this.DoctorService.GetRegionMasterWeb(this.countryID).subscribe(
      data => {

        this.regionList = data;

        this.regiondd = {
          singleSelection: true,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          noDataAvailablePlaceholderText: "ad"

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetRegionMasterWeb", error);
      }
    )
  }

  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id

    this.DoctorService.GetCityMasterBYIDandLanguageID(this.regionID, this.languageID).subscribe(
      data => {

        this.cityList = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
      }
    )
  }


  //GetAreaMaster

  public GetCityID(item1: any) {
    this.cityID = item1.id;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {

    this.DoctorService.GetAreaMasterByCityIDAndLanguageID(this.cityID, this.languageID).subscribe(
      data => {

        this.areaList = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,

        };
      }, error => {
      }
    )
  }
  public GetAreaID(item3: any) {

    this.areaID = item3.id;
    for (let i = 0; i < this.areaList.length; i++) {

      if (this.areaList[i].id == this.areaID) {

        this.pinCode = this.areaList[i].pincode
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
    this.identityphoto.splice(this.identityphoto.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/IdentityPhoto"
    this.DoctorService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.identityphoto.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("identityphoto", this.identityphoto);
      this.loader = false;
    })
  }

  files2: File[] = [];

  onSelect1(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files2.push(...event.addedFiles);
    this.uploadsAttchments1();
  }

  onRemove1(event: any) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
    this.insurancePhoto.splice(this.insurancePhoto.indexOf(event), 1);
  }

  uploadsAttchments1() {
    this.folderName = "Images/insurancePhoto"
    this.DoctorService.AllFilesUploads(this.files2, this.folderName).subscribe(res => {
      this.insurancePhoto.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("InsurancePhoto", this.insurancePhoto);
      this.loader = false;
    })
  }


  dateofBirth(dateofbirth: any) {
    this.dateofbirth = this.DoctorService.GetDates(dateofbirth);
  }




  public insertdetails() {
    debugger
    this.showPopup = 0;

    var entity = {
      'PatientName': this.patientname,
      'MobileNumber': this.mobileno,
      'EmailID': this.email,
      'Password': 123,
      'OTP': 123,
      'GenderID': this.gender,
      'Address': this.address,
      'CountryID': this.countryID,
      'CityID': this.cityID,
      'AreaID': this.areaID,
      'NationalIdentityNo': this.nationalidentitycardno,
      'DoctorID': this.doctorid,
      'HospitalID': this.hospitalid,
      'LastName': this.lastname,
      'DateOfBirth': this.dateofbirth,
      'KnownAllergies': this.knownalrregies,
      'InsurancePhotoUrl': this.insurancePhoto[0],
      'NationIDPhotoUrl': this.identityphoto[0],
      'InsuranceName': this.insurancename,
      'PatientID': this.typeID == 1 ? 0 : this.relationPatientID,
      'RelationshipTypeID': this.typeID == 1 ? 1 : 7,
      'AdultBit': this.typeID == 1 ? 1 : 0,
      'CountryCodeNew': this.countryCode
    }
    this.DoctorService.InsertPatientRegistration(entity).subscribe(data => {
      this.patientid = data;
      if (data != 0) {
        this.patientwalletdetails();
        this.Insertfamilytredetail();
        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.messageID = 1;
        location.href = "#/Doctor/PatientRedDash";
      }
      else {
        this.showPopup = 1;
        this.typeofPopUp = 2;
        this.messageID = 46;

      }
    })
  }


  public patientwalletdetails() {
    debugger
    if (this.typeID == 1) {
      var entity = {
        'PatientID': this.patientid,
        'WalletAmount': 0
      }
      this.DoctorService.InsertPatientWalletDetails(entity).subscribe(data => {

      })
    }

  }

  public Insertfamilytredetail() {
    debugger
    var entity = {
      'PatientRelationTypeID': this.typeID == 1 ? 1 : 7,
      'PatientID': this.typeID == 1 ? this.patientid : this.relationPatientID,
      'PR_FirstName': this.patientname,
      'PR_LastName': this.lastname,
      'PR_EmailID': this.email,
      'PR_MobileNumber': this.countryCode + '' + this.mobileno,
      'PR_GenderID': this.gender,
      'PR_BloodGroupID': 0,
      'PR_Height': 0,
      'PR_Weight': 0,
      'PR_KnownAllergies': this.knownalrregies,
      'PR_ProfilePic': null,
      'DateOfBirth': this.dateofbirth,
      'NewDesc': this.relation,
      'PR_BMI': 0
    }
    this.DoctorService.InsertPatientRelation_FamilyTree_Web(entity).subscribe(data => {
      if (this.typeID == 2) {
        if (this.roleID == 24) {
          this.SharedService.sendAssistanceSMS(entity, 1, this.languageID);
        }
        else {
          this.SharedService.sendAssistanceSMS(entity, 2, this.languageID);
        }
      }
    })

  }



  public Getregisterdpatients() {
    this.DoctorService.GetPatientRegistration('2021-01-01', '2090-01-01', this.languageID).subscribe(
      data => {
        debugger
        this.patientslist = data;
        var list = this.patientslist.filter((x: { id: any; }) => x.id == this.id)
        this.patientname = list[0].pname,
          this.lastname = list[0].lastName,
          this.mobileno = list[0].mobileNumber,
          this.email = list[0].emailID,

          this.nationalidentitycardno = list[0].nationalIdentityNo,
          this.insurancename = list[0].insuranceName,
          this.identityPhoto = list[0].nationIDPhoto,
          this.showInsurancePhoto = list[0].insurancePhoto
        this.insurancePhoto[0] = list[0].insurancePhotoUrl,
          this.identityphoto[0] = list[0].nationIDPhotoUrl,
          this.address = list[0].address,
          this.dateofbirth = this.DoctorService.GetDates(list[0].dateOfBirth)
        this.knownalrregies = list[0].knownAllergies,
          this.gender = list[0].genderID
        this.lastname = list[0].lastName
        debugger
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientRegistration", error);
      }
    );
  }


  public updatedetails() {
    this.showPopup = 0;
    debugger
    var entity = {
      'ID': this.id,
      'PatientName': this.patientname,
      'MobileNumber': this.mobileno,
      'EmailID': this.email,
      'Password': 123,
      'OTP': 123,
      'GenderID': this.gender,
      'Address': this.address,
      'CountryID': this.countryID,
      'CityID': this.cityid,
      'AreaID': this.areaid,
      'NationalIdentityNo': this.nationalidentitycardno,
      'DoctorID': this.doctorid,
      'HospitalID': this.hospitalid,
      'LastName': this.lastname,
      'DateOfBirth': this.dateofbirth,
      'KnownAllergies': this.knownalrregies,
      'InsurancePhotoUrl': this.insurancePhoto[0],
      'NationIDPhotoUrl': this.identityphoto[0],
      'InsuranceName': this.insurancename,
      'CountryCodeNew': this.countryCode
    }
    this.DoctorService.UpdatePatientRegistrationForWeb(entity).subscribe(data => {
      this.patientid = data;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Doctor/PatientRedDash";
    })
  }

  cancel() {
    if (this.doctorid == undefined) {
      location.href = "#/Diagnostic/PatientRegDash";
    }
    else {
      location.href = "#/Doctor/PatientRedDash";
    }
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }



  valid: boolean | undefined

  public isValidEmail(emailString: string): boolean {
    debugger
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      this.valid = pattern.test(emailString);
      debugger
      return this.valid;


    } catch (TypeError) {
      return false;
    }
  }







}
