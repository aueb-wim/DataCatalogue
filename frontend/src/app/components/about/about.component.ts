import {Component, Input, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userName:string;
  loggedIn:boolean;
  user:any;
  @Input('loggedIn2')loggedIn2:boolean;
  @Input('userName2')userName2:string;

  constructor(private hospitalService:HospitalService) {
    this.checkIfLoggedIn();
  }

  ngOnInit() {
  }
  login(){
    // this.hospitalService.login().subscribe();
    window.location.href ="/login";
    this.hospitalService.getUser().subscribe(user=>{
      if(user!=null){
        this.loggedIn = true;
        this.userName = user['name'];
        this.user = user;
      }
    });
  }
  cdeReadExcel(){
    this.hospitalService.cdeReadExcel().subscribe();
  }
  hospitalReadExcel(){
    this.hospitalService.hospitalReadExcel().subscribe();
  }
  uploadAllReports(){
    this.hospitalService.uploadAllReports().subscribe();
  }
  checkIfLoggedIn(){
    this.hospitalService.getUser().subscribe(user=>{
      if(user!=null){
        this.loggedIn = true;
        this.userName = user['name'];
        this.user = user;
      }
    });
  }
}
