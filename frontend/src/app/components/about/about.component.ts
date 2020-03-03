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
  userRoles:any;
  dataManager:boolean;
  @Input('loggedIn2')loggedIn2:boolean;
  @Input('userName2')userName2:string;

  constructor(private hospitalService:HospitalService) {
    this.getUserRoles();
    this.checkIfLoggedIn();

  }

  ngOnInit() {
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
  getUserRoles(){
    this.hospitalService.getUserRoles().subscribe(userRoles=>{
      if(userRoles!=null){
      this.userRoles = userRoles;
        for(let role of userRoles){
          if(role.authority.toString() === "ROLE_Data Manager"){
            this.dataManager = true;
          }
        }
      }
    });
  }
  checkIfLoggedIn(){
    this.hospitalService.getUser().subscribe(user=>{
      if(user!=null){
        this.loggedIn = true;
        this.userName = user['name'];
        this.user = user;
        //this.getUserRoles();

      }
    });
  }


}
