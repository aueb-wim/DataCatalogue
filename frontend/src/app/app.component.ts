import { Component, OnInit  } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HospitalService} from "./shared/hospital.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datacatalog';

  user:any;
  userName:string;
  loggedIn:boolean;

  constructor(private http: HttpClient,private hospitalService:HospitalService) {
//this.login();
    //http.get('http://195.251.252.222:2443/user').subscribe(data => {this.user=data});
    this.checkIfLoggedIn();

  }


  checkIfLoggedIn(){
    this.hospitalService.getUser().subscribe(user=>{
      if(user!=null){
        this.loggedIn = true;
        this.userName = user['name'];
        this.user = user;
      }else{
        this.loggedIn = false;
      }
    },()=>{this.loggedIn = false;});
  }


  /*

  authenticate() {

    this.http.get('//195.251.252.222:2443').subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
        //this.http.get('resource').subscribe(data => this.greeting = data);
      } else {
        this.authenticated = false;
      }
    }, () => { this.authenticated = false; });

  }

    //this.authenticate();
    http.get('http://195.251.252.222:2443/token').subscribe(data => {
      const token = data['token'];
      http.get('http://195.251.252.222:2443/token', {headers : new HttpHeaders().set('X-Auth-Token', token)})
        .subscribe(response => this.greeting = response);
    }, () => {});

  logout() {
    this.http.post('logout', {}).finally(() => {
      this.authenticated = false;
    }).subscribe();
  }
*/
}

