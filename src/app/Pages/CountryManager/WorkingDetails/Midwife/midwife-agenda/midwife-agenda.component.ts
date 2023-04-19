import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-midwife-agenda',
  templateUrl: './midwife-agenda.component.html',
  styleUrls: ['./midwife-agenda.component.css']
})
export class MidwifeAgendaComponent implements OnInit {
  loader: boolean | undefined
  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  todaydatess: any;
  public TodatDate: any;
  public languageid: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  select: any;
  public midwifeid: any;
  term: any;
  public Workinglist: any;
  public hospitalclinicid: any;
  public dummlist: any;
  public midwifelist: any;
  public count: any;
  public middd = {};
  public search: any;
  todaydate: any;
  today = new Date();
  currentUrl: any;
  selectdate:any;
  midwife:any;
  

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectdate=this.labels.selectDate;
    this.midwife=this.labels.selectMidewife;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.search=this.labels.search;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.TodatDate = new Date();
    var date = new Date();
    this.GetMidwife();
    this.mrngfromid = "";
    this.mrngtoid = "";
  }



  public GetMidwife() {
    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.midwifelist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;
          this.loader = false;
          this.middd = {
            singleSelection: true,
            idField: 'midWifeID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true
          };

        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWifeHospitalDetails", error);
        }
      )
    }
    else if (this.hospitalclinicid == undefined) {
      this.CommonService.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.midwifelist = data;
          this.count = this.midwifelist.length;
          this.loader = false;
          this.middd = {
            singleSelection: true,
            idField: 'midWifeID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true
          };

        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWifeHospitalDetails", error);
        }
      )
    }
  }

  slotTypeID: any;

  public GetMidiwifeID(item: any) {
    debugger
    this.loader = true;
    this.showcalender = 1;
    this.midwifeid = item.midWifeID;
    var list = this.midwifelist.filter((x: { midWifeID: any; }) => x.midWifeID == this.midwifeid)
    this.midwifehospitalid = list[0].midwifehospitalid
    this.slotTypeID = list[0].slotDurationID
    this.GetMidwifeWorkingDetailsDyWise();
    this.GetMorningSlotsMasterbyid();

  }






  public date1: any;
  public day1: any;



  public date2: any;
  public day2: any;


  public date3: any;
  public day3: any;


  public date4: any;
  public day4: any;

  public date5: any;
  public day5: any;

  public date6: any;
  public day6: any;

  public date7: any;
  public day7: any;
  DayDatelist: any;



  public GetMidwifeWorkingDetailsDyWise() {
    debugger
    this.CommonService.GetMidwifeWorkingDetailsDyWise(this.midwifeid, this.slotTypeID, this.todaydate, this.languageid).subscribe(
      data => {
        //this.workingdetails = data;
        this.DayDatelist = data[0];
        debugger
        this.date1 = this.DayDatelist[0].date,
          this.day1 = this.DayDatelist[0].day

        this.date2 = this.DayDatelist[1].date,
          this.day2 = this.DayDatelist[1].day

        this.date3 = this.DayDatelist[2].date,
          this.day3 = this.DayDatelist[2].day

        this.date4 = this.DayDatelist[3].date,
          this.day4 = this.DayDatelist[3].day

        this.date5 = this.DayDatelist[4].date,
          this.day5 = this.DayDatelist[4].day

        this.date6 = this.DayDatelist[5].date,
          this.day6 = this.DayDatelist[5].day

        this.date7 = this.DayDatelist[6].date,
          this.day7 = this.DayDatelist[6].day
        this.workingdetails = data[1];

        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetMidwifeWorkingDetailsDyWise", error);
      }
    )
  }


  public date: any;
  physiohospitalid: any;
  showcalender: any;








  public GetDate(newDate: Date) {
    this.loader = true;
    this.todaydate = this.CommonService.GetDates(newDate)

    this.GetMidwifeWorkingDetailsDyWise();
  }






  public dayid: any;
  public slotID: any;
  public appointmenttypeid: any;
  public dochospitalid: any;
  public appointmentdate: any;
  public appointmentypeid: any;
  public fees: any;

  public GetDay1List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day1DayID
    this.slotID = details.day1SlotID
    this.appointmentypeid = details.day1AppointmentTypeID,
      this.appointmentdate = details.day1AppointmentDate,
      this.fees = details.mondayFees;
  }



  public GetDay2List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day2DayID
    this.slotID = details.day2SlotID
    this.appointmentypeid = details.day2AppointmentTypeID,
      this.appointmentdate = details.day2AppointmentDate,
      this.fees = details.tuesdayFees;



  }


  public GetDay3List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day3DayID
    this.slotID = details.day3SlotID
    this.appointmentypeid = details.day3AppointmentTypeID,
      this.appointmentdate = details.day3AppointmentDate,
      this.fees = details.wednessdayFees;


  }


  public GetDay4List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day4DayID
    this.slotID = details.day4SlotID
    this.appointmentypeid = details.day4AppointmentTypeID,
      this.appointmentdate = details.day4AppointmentDate
    this.fees = details.thursdayFees;

  }

  public GetDay5List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.dayID
    this.slotID = details.day5SlotID
    this.appointmentypeid = details.day5AppointmentTypeID,
      this.appointmentdate = details.day5AppointmentDate,
      this.fees = details.fridayFees;

  }

  public GetDay6List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day6DayID
    this.slotID = details.day6SlotID
    this.appointmentypeid = details.day6AppointmentTypeID,
      this.appointmentdate = details.day6AppointmentDate,
      this.fees = details.satdayFees;

  }


  public GetDay7List(details: any) {
    this.appointmentypeid = '';

    this.dayid = details.day7DayID
    this.slotID = details.day7SlotID
    this.appointmentypeid = details.day7AppointmentTypeID,
      this.appointmentdate = details.day7AppointmentDate,
      this.fees = details.sundayFees;


  }


  patientid: any;
  email: any;
  mobileno: any;
  nursename: any;
  notificationdate: any;
  appointmentid: any;
  patientname: any;


  public insertdetails() {
    this.loader = true;
    this.showPopup = 0;
    debugger
    this.CommonService.GetMidwifeAppointmentdabySlot(this.midwifeid, this.slotID, this.appointmentdate).subscribe(data1 => {
      debugger
      if (data1.length != 0) {

        var list = data1[0];
        this.patientid = list.relationPatientID,
          this.email = list.pEmail,
          this.mobileno = list.pMobileNo,
          this.nursename = list.name,
          this.notificationdate = list.notificationdate,
          this.appointmentid = list.id,
          this.patientname = list.pName
        // this.Insertnotificatiacceptforcansel();
        // this.insercancelnotoification();
        this.SendCancelPatientmail();
      }
    })
    debugger
    this.CommonService.GetMidwifeCancelledAppointmentByDateWise(this.midwifeid, this.slotID, this.appointmentdate).subscribe(data => {
      debugger
    })

    debugger
    var entity = {
      'MidWifeHospitalDetailsID': this.physiohospitalid,
      'MidWifeID': this.midwifeid,
      'DayID': this.dayid,
      'SlotID': this.slotID,
      'Fees': this.fees,
      'AppointmentDate': this.appointmentdate,
      'AppointmentTypeID': this.appointmentypeid,
    }
    debugger
    this.CommonService.InsertMidwifeWorkingDetails_DateWise(entity).subscribe(data => {
      debugger
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.GetMidwifeWorkingDetailsDyWise();
      // this.GetNurseWorkingDetailsDyWise();

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "InsertMidwifeWorkingDetails_DateWise", error);
    })


  }





  //email

  emailattchementurl = [];
  cclist = [];
  bcclist = [];
  public SendCancelPatientmail() {
    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': "Your Midwife " + this.nursename + " Has Cancelled Your Appointment At Time " + this.notificationdate,
      'emailbody': 'Dear ' + this.patientname + ',' + "<br><br>" + 'We regret to inform that your Doctor ' + this.nursename + ' has cancelled your appointment of ' + this.notificationdate + '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.CommonService.sendemail(entity).subscribe(data => {
    })
  }

  typeID: any;

  public GetTypeID(even: any) {
    this.typeID = even.target.value;
    this.fees = ""
  }



  //datewise entire day
  daychangedate: any;
  dayslist: any;
  datechangedayid: any;
  Daywiseappointmentid: any;


  public GetdaychangeDate(newDate: Date) {
    // this.daychangedate = even.toLocaleString().split(',')[0];
    this.daychangedate = this.CommonService.GetDates(newDate)
    this.Getdays()
  }

  public Getdays() {
    this.CommonService.GetDaysHomecare(this.daychangedate).subscribe(data => {
      this.dayslist = data[0];
      let day = this.dayslist.dayName
      this.Getdayssid(day);
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetDaysHomecare", error);
    })
  }

  public Getdayssid(day: any) {
    this.CommonService.GetDayID(day).subscribe(data => {
      let dayidslist = data;
      this.datechangedayid = dayidslist[0].dayID;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetDayID", error);
    })
  }


  appcount: any;


  public InsertDayWiseAlert() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else {
      this.CommonService.GetBook_Midwives_AppointmentCount(this.daychangedate, this.midwifeid).subscribe(data => {
        var applist = data[0];
        this.appcount = applist.appcount

        Swal.fire({
          title: this.labels.title,
          text: this.labels.youhave + this.appcount + this.labels.bookingText,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.labels.yes,
          cancelButtonText: this.labels.no
        }).then((result) => {
          if (result.isConfirmed) {

            this.InsertDayWiseSlots();
            this.messageID = 34;
            this.typeofPopUp = 1;
            this.showPopup = 1;
          }
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetBook_Midwives_AppointmentCount", error);
        })
      })
    }
  }



  slotslist: any;
  mrngfromlist: any;

  public GetMorningSlotsMasterbyid() {

    this.CommonService.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {
        this.slotslist = data;
        this.mrngfromlist = data;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSlotMasterTimings", error);
      }
    )
  }


  daychangedate1: any;
  midwifehospitalid: any;


  public InsertDayWiseSlots() {
    this.showPopup = 0;
    if (this.daychangedate == undefined || this.daychangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.Daywiseappointmentid == undefined || this.Daywiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else {
      for (let j = 0; j < this.slotslist.length; j++) {
        debugger
        this.CommonService.GetMidwifeAppointmentdabySlot(this.midwifeid, this.slotslist[j].id, this.daychangedate).subscribe(data1 => {
          if (data1.length != 0) {
            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.nursename = list.name,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName
            // this.Insertnotificatiacceptforcansel();
            // this.insercancelnotoification();
            this.SendCancelPatientmail();
            // this.GetPhjysioworkingDatewise();
          }

        })

        this.CommonService.GetMidwifeCancelledAppointmentByDateWise(this.midwifeid, this.slotslist[j].id, this.daychangedate).subscribe(data => {
        })
        var entity = {
          'MidWifeHospitalDetailsID': this.midwifehospitalid,
          'MidWifeID': this.midwifeid,
          'DayID': this.datechangedayid,
          'SlotID': this.slotslist[j].id,
          'Fees': this.fees,
          'AppointmentDate': this.daychangedate,
          'AppointmentTypeID': this.Daywiseappointmentid
        }
        this.CommonService.InsertMidwifeWorkingDetails_DateWise(entity).subscribe(data => {
        })
      }

      this.GetMidwifeWorkingDetailsDyWise();
      this.loader = true;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 2;
      this.Daywiseappointmentid = "";
      this.daychangedate = ""
      this.fees = ""
      this.daychangedate1 = ""
    }
  }


  //time change

  timechangedate: any;
  timechangedayid: any;


  public GetTimewisechangedate(newDate: Date) {
    this.timechangedate = this.CommonService.GetDates(newDate)
    // this.timechangedate = even.toLocaleString().split(',')[0];
    this.Getdaystime()
  }

  public Getdaystime() {
    this.CommonService.GetDaysHomecare(this.timechangedate).subscribe(data => {
      this.dayslist = data[0];
      let dayname = this.dayslist.dayName;
      this.Getdayssidbytime(dayname);
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetDaysHomecare", error);
    })
  }
  public Getdayssidbytime(dayname: any) {
    this.CommonService.GetDayID(dayname).subscribe(data => {
      let dayidslist = data;
      this.timechangedayid = dayidslist[0].dayID;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetDayID", error);
    })
  }

  mrngfromslot: any;
  mrngfromid: any;
  mrngtolist: any;
  mrngtoid: any;
  timewisechangeslotlist: any;

  public getmrngfrom(even: any) {
    this.mrngfromid = even.target.value;
    debugger
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngfromlist.filter((x: { id: any; }) => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter((x: { id: number; }) => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }
  mrngtoslot: any;

  public getmrngto(even: any) {
    this.mrngtoid = even.target.value;
    debugger
    // if (this.timewiseappointmentid == 4 || this.timewiseappointmentid == 6) {
    var qwerty = this.mrngtolist.filter((x: { id: any; }) => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
    debugger
    this.timewisechangeslotlist = this.slotslist.filter((x: { id: number; }) => x.id >= this.mrngfromid && x.id <= this.mrngtoid)
  }





  timewiseappointmentid: any;
  totalappcount: any;
  timechangedate1: any;



  public InsertTineWiseAlert() {
    this.showPopup = 0;
    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 2;
    }
    else {



      Swal.fire({
        title: 'Are you sure?',
        text: "You have " + this.totalappcount + "bookings. The patient(s) will be notified of the cancellation and offered the choice to reschedule or get a refund.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {

          this.InsertTimeWiseSlots();
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.showPopup = 1;
        }
      })

    }

  }


  public InsertTimeWiseSlots() {
    this.showPopup = 0;
    if (this.timechangedate == undefined || this.timechangedate == null) {
      this.showPopup = 1;
      this.messageID = 35;
      this.typeofPopUp = 2;
    }
    else if (this.timewiseappointmentid == undefined || this.timewiseappointmentid == null) {
      this.showPopup = 1;
      this.messageID = 36;
      this.typeofPopUp = 2;
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      this.showPopup = 1;
      this.messageID = 37;
      this.typeofPopUp = 2;
    }
    else {
      debugger
      for (let j = 0; j < this.timewisechangeslotlist.length; j++) {
        debugger
        this.CommonService.GetMidwifeAppointmentdabySlot(this.midwifeid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data1 => {
          debugger
          if (data1.length != 0) {
            debugger
            var list = data1[0];
            this.patientid = list.relationPatientID,
              this.email = list.pEmail,
              this.mobileno = list.pMobileNo,
              this.nursename = list.nurseName,
              this.notificationdate = list.notificationdate,
              this.appointmentid = list.id,
              this.patientname = list.pName

            this.SendCancelPatientmail();

            debugger
          }
        })
        this.CommonService.GetMidwifeCancelledAppointmentByDateWise(this.midwifeid, this.timewisechangeslotlist[j].id, this.timechangedate).subscribe(data => {
          debugger
        })
        var entity = {
          'MidWifeHospitalDetailsID': this.midwifehospitalid,
          'MidWifeID': this.midwifeid,
          'DayID': this.timechangedayid,
          'SlotID': this.timewisechangeslotlist[j].id,
          'Fees': this.fees,
          'AppointmentDate': this.timechangedate,
          'AppointmentTypeID': this.timewiseappointmentid
        }
        this.CommonService.InsertMidwifeWorkingDetails_DateWise(entity).subscribe(data => {


        })
      }

      this.GetMidwifeWorkingDetailsDyWise();
      this.loader = true;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 2;
      this.timewiseappointmentid = "";
      this.timechangedate1 = "";
      this.timechangedate = "";
      this.mrngtoid = "";
      this.mrngfromid = "";
      this.fees = ""

    }
  }

  public gettimechange(even: any) {

    this.timewiseappointmentid = even.target.value;
    if (this.timewiseappointmentid == 4) {

    }
    else {
      this.mrngtoid = "";
      this.mrngfromid = "";
    }

  }
}
