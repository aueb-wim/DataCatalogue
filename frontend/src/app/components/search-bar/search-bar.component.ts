import {Component, Input, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  selectedItem: number;
  user:any;
  userName:string;
  loggedIn:boolean;
  @Input('loggedIn2')loggedIn2:boolean;
  @Input('userName2')userName2:string;

  constructor(private hospitalService:HospitalService,private router: Router) {
    this.checkIfLoggedIn();
  }

  ngOnInit() {
  }



  listClick(event, newValue) {
    this.selectedItem = newValue;
  }

  // login2 works fine and should be restored when keycloak is up again
  login(){
    //CHANGE THIS TO CONTAINER NAME
    location.href = '/login';
    //this.router.navigateByUrl('/login');
    return;
  }
  login3(){

   // this.hospitalService.login().subscribe();
    //this.router.navigateByUrl('/login');
    /*
    this.hospitalService.login().subscribe(result=>{

      },error1 => {
      alert(error1.message);
      }
    );
    */
    //window.open('/login');
    window.location.href = '/login';

    //document.location.href = '/login',true;
    this.hospitalService.getUser().subscribe(user=>{
      if(user!=null){
        this.loggedIn = true;
        this.userName = user['name'];
        this.user = user;
        console.log('user is logged in as: ',user['name']);
      }
    });

    return false;
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
  logout2(){
    this.hospitalService.logout().subscribe();
    //window.location.href ="http://195.251.252.222:2442/logout";
    this.user = null;
    this.userName = null;
    this.loggedIn = false;
    //window.location.reload();
  }
  logout(){
    this.hospitalService.logout().subscribe();
    this.user = null;
    this.userName = null;
    this.loggedIn = false;
    //window.location.reload();
  }
/*
  logout() {
    this.http.post('logout', {}).finally(() => {
      this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    }).subscribe();
  }
*/
}
