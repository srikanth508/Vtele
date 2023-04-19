import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import Labels from '../../Lables/sidebar/sidebarlabels.json';
@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) { }
  fileUrl: any;
  languageid:any;

  labels:any;
  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.activatedroute.params.subscribe((params) => {
       var fileUrl = atob(params['fileUrl']);
      // var fileUrl="C:\Users\Lenovo\Desktop\SrikanthReddy_Resume.doc"
      debugger
      this.viewfile(fileUrl)

    });
  }

  show:any;

  viewfile(fileUrl: any) {
    debugger
    if (fileUrl.includes(".pdf")) {
      debugger
      this.show=1;
      this.fileUrl = this.bypassAndSanitize(fileUrl);
    }
    else if (fileUrl.toLowerCase().includes(".png")) {
      debugger
      this.show=2;
      this.fileUrl = fileUrl;
    }
    else if (fileUrl.includes(".jpg")) {
      debugger
      this.show=2;
      this.fileUrl = fileUrl;;
    }
    else if (fileUrl.includes(".jpeg")) {
      debugger
      this.show=2;
      this.fileUrl = fileUrl;;
    }
    else if (fileUrl.includes(".jfif")) {
      debugger
      this.show=2;
      this.fileUrl = fileUrl;;
    }
    else if (fileUrl.includes(".ppt")) {
      debugger
      this.show=1;
      this.fileUrl =this.bypassAndSanitize(fileUrl);
    }
    else if (fileUrl.includes(".doc")) {
      debugger
      this.show=1;
      this.fileUrl =this.bypassAndSanitize(fileUrl);
    }

  }




  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  back()
  {
    history.back(); 
  }
}
