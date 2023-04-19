import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-dme',
  templateUrl: './dme.component.html',
  styleUrls: ['./dme.component.css']
})
export class DMEComponent implements OnInit {
  loader: boolean | undefined;


  constructor(private DoctorService: DoctorService, private activatedroute: ActivatedRoute,
    private SharedService: SharedService) { }

  DiaAttchmentList: any;
  public doctorid: any;
  public patientid: any;
  public patientlist: any;
  public details: any;
  public patientname: any;
  public mobileno: any;
  public emailid: any;
  public patientidd: any;
  public appointmentno: any;
  public appointmentdate: any;
  public gender: any;
  public bloodgroup: any;
  public address: any;
  public email: any;
  public reasonforappointment: any;
  public prescriptionlist: any;
  public dialist: any;
  public prescriptionid: any;
  public prelist: any;
  public soaplist: any;
  public soapid: any;
  public plan: any;
  public assessment: any;
  public subjective: any;

  public diagnosiscode: any;
  public sickslip: any;
  public followupplan: any;
  public signature: any;
  public notes: any;
  public soaplist1: any;
  public objective: any;
  public vedioslist: any;
  public languageid: any;
  public departmentid: any;
  dummprescrptiolist: any;
  dummdialist: any;
  dummsoaplist: any;
  dummvedioslist: any;
  age: any;
  color: any;
  homecaresoaplist: any;
  Appointmentlist: any;
  dateofBirth: any;
  viewdetaillist: any;
  vaccinationlist: any;
  icrdescription: any;
  attchment: any;
  labels1: any;
  labels: any;
  HomeCaresoaplist: any;
  currentUrl: any;

  attachment: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.activatedroute.params.subscribe(params => {
      this.patientid = atob(params['patientID']);
      this.doctorid = sessionStorage.getItem('userid');
      this.languageid = sessionStorage.getItem('LanguageID');
      this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
      this.departmentid = sessionStorage.getItem('departmentid')
      this.getSoapNotes();
      this.getPatientDetails();
      this.getDoctorPrscriptionDetails();
      this.getDoctorDiagnosticApps();
      this.GetDiagnosticAttachments();
      this.getBookAppointmentByPatientID();
      this.getvaccinatindetails();
      this.getvitaldetails();
      this.getHomecareSoap();

    }
    )

  }



  getSoapNotes() {
    this.DoctorService.GetSoapNotesByPatientID(this.patientid, this.languageid, this.doctorid).subscribe(
      data => {

        this.soaplist1 = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetSoapNotesByPatientID", error);
      }
    )
  }



  getPatientDetails() {
    this.DoctorService.GetPatientDetails(this.patientid, this.languageid).subscribe(
      data => {
        debugger
        this.details = data;
        this.patientname = this.details.patientName,
          this.mobileno = this.details.mobileNumber,
          this.emailid = this.details.emailID,
          this.patientidd = this.details.patientID,
          this.appointmentno = this.details.appointmentID,
          this.appointmentdate = this.details.apptDateTime,
          this.mobileno = this.details.mobileNumber,
          this.email = this.details.emailID,
          this.reasonforappointment = this.details.reasonForVisit,
          this.gender = this.details.gender,
          this.bloodgroup = this.details.bloodGroup,
          this.address = this.details.address,
          this.age = this.details.age,
          this.dateofBirth = this.details.dateOfBirth

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientDetails", error);
      }
    )
  }

  getDoctorPrscriptionDetails() {

    this.DoctorService.GetDoctor_PatientPrescriptionbyPatientDeatails(this.patientid, this.languageid).subscribe(
      data => {

        this.prescriptionlist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctor_PatientPrescriptionbyPatientDeatails", error);
      }
    )
  }


  getDoctorDiagnosticApps() {
    debugger
    this.DoctorService.GetDoctor_PatientDiagosticApps(this.patientid, this.languageid).subscribe(
      data => {
        debugger
        this.dialist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctor_PatientDiagosticApps", error);
      }
    )
  }

  public GetDiagnosticAttachments() {
    debugger
    this.DoctorService.GetDiagnostic_SoapNotesAttachmentsWeb(this.patientid,this.languageid).subscribe(
      data => {

        this.DiaAttchmentList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDiagnostic_SoapNotesAttachmentsWeb", error);
      }
    )
  }


  getHomecareSoap() {
    this.DoctorService.GetAllHomeCareSoap(this.patientid, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.homecaresoaplist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAllHomeCareSoap", error);
      }
    )
  }

  getVideoList() {
    this.DoctorService.GetBook_DoctorPatientBookedVideoConferenceByPatientID(this.patientid).subscribe(
      data => {

        this.vedioslist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetBook_DoctorPatientBookedVideoConferenceByPatientID", error);
      }
    )
  }


  getBookAppointmentByPatientID() {
    this.DoctorService.GetBookApptbyPatientID(this.patientid, this.languageid).subscribe(
      data => {
        debugger
        this.Appointmentlist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetBookApptbyPatientID", error);
      }
    )
  }

  showmedicalquestionare(app: any) {
    debugger
    this.viewdetaillist = this.Appointmentlist.filter((x: { id: any; }) => x.id == app.id);
  }





  getvaccinatindetails() {
    this.DoctorService.GetPatient_VaccinationDetails(this.patientid).subscribe(
      data => {
        debugger
        this.vaccinationlist = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_VaccinationDetails", error);
      }
    )

  }

  public GetprscriptionID(id: any) {

    this.prescriptionid = id;
    this.DoctorService.GetDoctor_PatientPrescriptionByID(this.prescriptionid, this.languageid).subscribe(
      data => {

        this.prelist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctor_PatientPrescriptionByID", error);
      }
    )
    //this.getDoctorPatientPrescriptions()
  }



  appointmentDialist: any;

  getDiaTests(appointmentID: any) {
    debugger
    this.DoctorService.GetDoctor_PatientDiagnosticsbypatientdeatils(this.patientid, this.languageid, this.doctorid).subscribe(
      data => {
        debugger
        this.appointmentDialist = data.filter(x => x.appointmentID == appointmentID);
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctor_PatientDiagnosticsbypatientdeatils", error);
      }
    )
  }

  public GetReportPdf(pdf: any) {

    location.href = "#/Shared/view/" + btoa(pdf)
    // window.open(pdf, "_blank");
  }



  public GetSoapID(soapid: any) {

    this.soapid = soapid;
    this.DoctorService.GetSoapNotesByID(this.soapid, this.languageid).subscribe(
      data => {

        this.soaplist = data;
        if (this.soaplist == null || this.soaplist.length == 0 || this.soaplist == undefined) {
          this.subjective = "";

          this.assessment = "";
          this.plan = "";
          this.diagnosiscode = "";
          this.followupplan = "";
          this.notes = "";

          this.signature = "";
          this.objective = "";
          this.signature = "";
          this.icrdescription = ""
        }
        else {
          this.subjective = this.soaplist[0].subjective,
            this.assessment = this.soaplist[0].assessment,
            this.plan = this.soaplist[0].plan,
            this.diagnosiscode = this.soaplist[0].diagnosisCode,
            this.followupplan = this.soaplist[0].followUpPlan,
            this.notes = this.soaplist[0].notes,
            this.objective = this.soaplist[0].objective,
            this.icrdescription = this.soaplist[0].icrDescription,
            this.attachment = this.soaplist[0].attchment
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetSoapNotesByID", error);
      }
    )
  }


  public GetPdfsss(attchments: any) {
    location.href = "#/Shared/view/" + btoa(attchments)
    // window.open(attchments, '_blank');
  }



  public GetSoapHomeCarelist(soapid: any) {

    this.soapid = soapid;
    this.DoctorService.GetHomeCaeeSoapNotesByID(this.soapid, this.languageid).subscribe(
      data => {

        this.HomeCaresoaplist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetHomeCaeeSoapNotesByID", error);
      }
    )
  }


  vitalslist: any;
  public getvitaldetails() {

    this.DoctorService.GetPatient_VitalDetailsByPatientID(this.patientid, 1).subscribe(
      data => {
        this.vitalslist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_VitalDetailsByPatientID", error);
      }
    )
  }


  public GetSoapPdf() {
    location.href = "#/Shared/view/" + btoa(this.attachment)

  }

}
