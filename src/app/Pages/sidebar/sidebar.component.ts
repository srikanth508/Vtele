import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Labels from '../Lables/sidebar/sidebarlabels.json';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarBtn: any;
  sidebar: any;
  roleID: any;
  classList: any;
  user: any;
  hospitalType: any;
  hospitalid: any;
  hospitalididd: any;
  languageid:any;
  labels:any;




  constructor() { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.roleID = sessionStorage.getItem("roleid");
    this.user = sessionStorage.getItem("user");
    this.hospitalType = sessionStorage.getItem('hospitalType');
    this.hospitalid = sessionStorage.getItem('hospitalClinicID');
    
    this.hospitalididd = sessionStorage.getItem('hospitalid');
    console.log("RoleID", this.roleID);


  }





  public openNav() {
    debugger
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e: any) => {
        debugger
        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
        arrowParent.classList.toggle("showMenu");
      });
    }
    debugger


    // document.getElementById("sidebarid")?.classList.add("col-lg-1");
    // document.getElementById("head")?.classList.add("col-lg-11");

  }


  AfterViewInit() {
    document.getElementById("someid")?.addEventListener('click', () => {
      this.sidebar.classList.toggle("close");
    })
  }

  openview() {
    debugger
    this.sidebar = document.querySelector(".sidebar");
    this.sidebarBtn = document.querySelector(".bx-menu");
    debugger
    console.log(this.sidebarBtn);
    this.sidebarBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("close");

      // document.getElementById("sidebarid")?.classList.remove('col-lg-2');
      // document.getElementById("sidebarid")?.classList.add("col-lg-1");
      // debugger
      // document.getElementById("head")?.classList.remove('col-lg-10');
      // document.getElementById("head")?.classList.add("col-lg-11");
    });


    // document.getElementById("sidebarid")?.classList.remove("col-lg-1");   
    //  document.getElementById("head")?.classList.remove("col-lg-11");
    // document.getElementById("sidebarid")?.classList.add("col-lg-2");
    // debugger

    // document.getElementById("head")?.classList.add("col-lg-10");
  }



  public openNav1() {


    document.getElementById("sidebar")!.style.width = "306x";
    // document.getElementById("main")!.style.marginLeft = "230px";
  }


  logOut() {
    sessionStorage.clear()
    sessionStorage.clear()
    location.href = '#/login';
    location.reload();
  }

  public highlight(evt: any) {
    debugger
    sessionStorage.setItem('showSidebar', '0');
    var i, tablinks;
    //  sessionStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }

  active: any;
  Reports() {
    this.active = 2;
    sessionStorage.setItem("clickname", "Reports")
  }

}

