import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-physiotherapist-registration',
  templateUrl: './physiotherapist-registration.component.html',
  styleUrls: ['./physiotherapist-registration.component.css'],
})
export class PhysiotherapistRegistrationComponent implements OnInit {
  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) { }

  files: File[] = [];
  name: any;
  phoneNumber: any;
  email: any;
  gender: any;
  address: any;
  slotDurationID: any;
  experience: any;
  education: any;
  spokenLanguages: any;
  professionalProfile: any;
  taxIdentification: any;
  businessID: any;
  commercialCity: any;
  taxProfessional: any;
  socialSeccurityFundno: any;
  nameOfBank: any;
  accountName: any;
  accountNumber: any;
  vatCheck: any;
  subscriptionTypeID: any;
  montlySubscription: any;
  AppointmentPercentage: any;
  loader: boolean | undefined;
  description: any;
  vatPercentage: any;
  exonerationPeriodFromDate: any;
  exonerationPerioToDate: any;
  countryList: any;
  countrydd = {};
  countryID: any;
  regionList: any;
  regiondd: any;
  regionID: any;
  cityList: any;
  citydd = {};
  cityID: any;
  areaList: any;
  areadd = {};
  areaID: any;
  pinCode: any;
  languageID: any;
  hospitalClinicID: any;
  hospitalClinicList: any;
  hospitadd = {};
  dummHospitalID: any;
  attchmentUrl: any = [];
  folderName: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  files1: File[] = [];
  identityAttchmentUrl: any = [];
  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  nurseID: any;
  specilizationList: any;
  specilisatiodd = {};
  specilizationID: any = [];
  phisioID: any;
  labels: any;
  region: any;
  province: any;
  city: any;
  insurance: any;
  fromdate: any;
  todate: any;
  selecthospital: any;
  selectspecialization: any;
  search: any;
  currentUrl: any;

  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  typeOfPayment: any;
  docNearestkm: any;
  docnearesNumber: any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.dummHospitalID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.region = this.labels.selectRegion;
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;
    this.selecthospital = this.labels.selectHospital;
    this.selectspecialization = this.labels.selectSpecialization;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.search = this.labels.search;
    this.vatCheck=0;
    this.vatPercentage = 20;
    this.getCountryMaster();
    this.getHospitalClinicForAdmin();
    this.getSpicilizationMaster();
    this.cycleID = '';
    this.getSubscriptionMasetr();
    this.wallet=true;
    this.creditCard=true;
    this.cash=true;
  }

  public getHospitalClinicForAdmin() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(
      this.languageID
    ).subscribe(
      (data) => {
        this.hospitalClinicList = data.filter(
          (x) => x.id != '590' && x.id != '612' && x.id != '614'
        );
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospital_ClinicForAdminByAdmin',
          error
        );
      }
    );
  }

  // getCountry

  public getCountryMaster() {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      (data) => {
        this.countryList = data.filter((x) => x.id == 5);
        this.loader = false;
        console.log('CountryList', this.countryList);
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetCountryMasterByLanguageID',
          error
        );
      }
    );
  }

  //getRegion

  public getCountryID(even: any) {
    this.countryID = even.target.value;
    this.CommonService.GetRegionMasterWeb(this.countryID).subscribe(
      (data) => {
        this.regionList = data;

        this.regiondd = {
          singleSelection: true,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetRegionMasterWeb',
          error
        );
      }
    );
  }

  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id;

    this.CommonService.GetCityMasterBYIDandLanguageID(
      this.regionID,
      this.languageID
    ).subscribe(
      (data) => {
        this.cityList = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetCityMasterBYIDandLanguageID',
          error
        );
        closeDropDownOnSelection: true;
      }
    );
  }

  //GetAreaMaster

  public GetCityID(item1: any) {
    this.cityID = item1.id;
    this.getareamasterbyid();
  }

  public getareamasterbyid() {
    this.CommonService.GetAreaMasterByCityIDAndLanguageID(
      this.cityID,
      this.languageID
    ).subscribe(
      (data) => {
        this.areaList = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAreaMasterByCityIDAndLanguageID',
          error
        );
      }
    );
  }
  public GetAreaID(item3: any) {
    this.areaID = item3.id;
    for (let i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].id == this.areaID) {
        this.pinCode = this.areaList[i].pincode;
      }
    }
  }

  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = this.CommonService.GetDates(
      exonerationPeriodFromDate
    );
    console.log('exoneration Period From Date', this.exonerationPeriodFromDate);
  }

  getexoneationPeriodToDate(exonerationPerioToDate: any) {
    this.exonerationPerioToDate = this.CommonService.GetDates(
      exonerationPerioToDate
    );
    console.log('exoneration Period To Date', this.exonerationPerioToDate);
  }

  public getHospitalID(item: any) {
    this.hospitalClinicID = item.id;
  }

  getSlotDurationID(even: any) {
    this.slotDurationID = even.target.value;
  }
  //Nurse Photo

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
    this.folderName = 'Images/PhyiotherapistPhotos';
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(
      (res) => {
        this.attchmentUrl.push(res);
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        console.log('hospitalPhoto', this.attchmentUrl);
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'AllFilesUploads',
          error
        );
      }
    );
  }

  // Identity Photos

  onSelectIdentityPhotos(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadsAttchmentsIdentity();
  }

  onIdentityRemove(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
    this.identityAttchmentUrl.splice(this.files1.indexOf(event), 1);
  }

  uploadsAttchmentsIdentity() {
    this.folderName = 'Images/PhysiotherapistIDProof';
    this.CommonService.AllFilesUploads(this.files1, this.folderName).subscribe(
      (res) => {
        this.identityAttchmentUrl.push(res);
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        console.log('Identity', this.attchmentUrl);
        this.loader = false;
      }
    );
  }

  //Google Addreess

  geocode() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    this.CommonService.Getlocation(this.address).subscribe((data: any) => {
      debugger;
      console.log('google addressmain', data);
      if (data['results'].length != 0) {
        this.googleAddress = data['results'];
        console.log('google address', this.googleAddress);
        debugger;
        this.formatAddress = this.googleAddress[0]['formatted_address'];
        (this.latitude = this.googleAddress[0].geometry.location['lat']),
          (this.longitude = this.googleAddress[0].geometry.location['lng']);
        this.loader = false;
        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.messageID = 12;
      } else {
        this.loader = false;
        this.showPopup = 1;
        this.typeofPopUp = 2;
        this.messageID = 13;
      }
    });
  }

  getSpicilizationMaster() {
    this.CommonService.GetSpecilaizationMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.loader = false;

        this.specilizationList = data.filter((x) => x.departmentID == 31);

        this.specilisatiodd = {
          singleSelection: false,
          idField: 'id',
          textField: 'specilaizationName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetSpecilaizationMasterByLanguageID',
          error
        );
      }
    );
  }

  public GetSpecilizationID(item: any) {
    this.specilizationID.push(item);
  }

  checkVatvalue(even: any) {
    debugger;
    if (even == 1) {
      this.vatPercentage = 0;
    } else {
      this.vatPercentage = 20;
    }
  }

  public inserDetails() {
    this.showPopup = 0;
    if (this.hospitalClinicID == undefined || this.hospitalClinicID == '') {
      this.showPopup = 1;
      this.messageID = 14;
      this.typeofPopUp = 2;
    } 
   else if (this.slotDurationID == undefined || this.slotDurationID == '') {
      this.showPopup = 1;
      this.messageID = 29;
      this.typeofPopUp = 2;
    } 
    else {
      this.loader = true;

      this.loader = true;
      var entity = {
        Name: this.name,
        PhoneNo: this.phoneNumber,
        Email: this.email,
        GenderID: this.gender,
        Address: this.address,
        CityID: this.cityID,
        AreaID: this.areaID,
        DepartementID: 2,
        Experience: this.experience,
        Description: this.description,
        HomeVisit: 0,
        IDProof: this.identityAttchmentUrl[0],
        PhotoUrl: this.attchmentUrl[0],
        Pincode: this.pinCode,
        CountryID: this.countryID,
        HospitalClinicID: this.hospitalClinicID,
        Education: this.education,
        SpokenLanguages: this.spokenLanguages,
        SlotDurationID: this.slotDurationID,
        SubscriptionTypeID: this.subscriptionTypeID,
        MonthlySubscription: this.montlySubscription,
        AppointmentPercentage: this.AppointmentPercentage,
        TaxIdentification: this.taxIdentification,
        BusinessID: this.businessID,
        CommercialRegCity: this.commercialCity,
        TaxProfessional: this.taxProfessional,
        SocialSeccurityNo: this.socialSeccurityFundno,
        Nameofthebank: this.nameOfBank,
        AccountName: this.accountName,
        AccountNumber: this.accountNumber,
        VAT: this.vatCheck,
        VatPercentage: this.vatPercentage,
        ExonerationPeriodFromDate: this.exonerationPeriodFromDate == undefined ? new Date() : this.exonerationPeriodFromDate,
        ExonerationPerioToDate: this.exonerationPerioToDate == undefined ? new Date() : this.exonerationPerioToDate,
        Lattitude: this.latitude,
        Longitude: this.longitude,
        FormatedAddress: this.formatAddress,
        PayTypeID: this.cycleID,
        TypeofPayment: this.typeOfPayment,
        cash: this.cash,
        Wallet: this.wallet,
        CreditCard: this.creditCard,
        DocNearestLocDist: this.docNearestkm,
        DocNearestNumber: this.docnearesNumber
      };
      this.CommonService.InsertphysiotherapyRegistrationAdmin(entity).subscribe(
        (data) => {
          this.phisioID = data;
          if (this.phisioID != 0) {
            for (let s = 0; s < this.specilizationID.length; s++) {
              var specentity = {
                PhysiotherapyID: this.phisioID,
                SpecializationID: this.specilizationID[s].id,
                LanguageID: 1,
              };
              this.CommonService.InsertPhysiotherapySpecialization(
                specentity
              ).subscribe((datas) => { });
            }
            this.showPopup = 1;
            this.typeofPopUp = 1;
            this.messageID = 1;
            this.loader = false;
            location.href = '#/countrymanager/Physiotherapist';
          } else {
            if (data == 0) {
              this.showPopup = 1;
              this.messageID = 8;
              this.typeofPopUp = 2;
              this.loader = false;
            } else {
              this.showPopup = 1;
              this.messageID = 9;
              this.typeofPopUp = 2;
              this.loader = false;
            }
            // location.href = '#/NurseDashboard';
          }
        },
        (error) => {
          this.showPopup = 1;
          this.typeofPopUp = 1;
          this.messageID = 10;
          this.loader = false;
        }
      );
    }
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    debugger;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }


  valid: boolean | undefined;

  public isValidEmail(emailString: string): boolean {
    debugger;
    try {
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      this.valid = pattern.test(emailString);
      debugger;
      return this.valid;
    } catch (TypeError) {
      return false;
    }
  }

  paymenyCycleList: any;

  getSubscriptionMasetr() {
    this.CommonService.GetSubscriptionPayTypeMaster().subscribe((data) => {
      this.paymenyCycleList = data;
    });
  }

  cycleID: any;

  getMonthCycleID(even: any) {
    this.cycleID = even.target.value;
  }


  lattitudeValidation(event: { which: any; keyCode: any; }): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;

  }



  
  preventZero(even: any) {
    debugger
    this.showPopup=0;
    var no = even.split();
    if (no.length >= 1) {
      if(no[0] == '0')
      {
        this.phoneNumber = ""
        this.typeofPopUp=2;
        this.messageID=84;
        this.showPopup=1;
      }

    }
    

  }
}
