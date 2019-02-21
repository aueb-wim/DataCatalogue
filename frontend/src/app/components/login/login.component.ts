import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpXsrfTokenExtractor} from "@angular/common/http";
import {HospitalService} from "../../shared/hospital.service";
import { HttpClientModule }    from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

greeting:any;
loginData:any;
authenticated=false;
user:any;
token:any;
clientId="956c2ee1-000d-4b51-8024-55575bb85efb";
clientSecret="QOLD9iBdVLoqf5ZLxhBDwtmDa58gTvpvueMtmRPGjJw3hIRdiKmAFPp3FIq7VPvCagmSObEGEvCASpqbGU9zAw";
redirectUri="http://195.251.252.222:2443/login";
loginCodeAndState="code=Jtw0jR&state=5G0XM6";
variables:any;
token2 = this.tokenExtractor.getToken() as string;

  constructor( private http: HttpClient, private router: Router, private hospitalService:HospitalService,private tokenExtractor: HttpXsrfTokenExtractor) {

    /////////get the authentication token from this page and send it a html-header to the backend
    /*
      http.get('http://195.251.252.222:2443/token').subscribe(data => {
        const token = data['token'];
        http.get('http://195.251.252.222:2443', {headers : new HttpHeaders().set('X-Auth-Token', token)})
          .subscribe(response => this.greeting = response);
      }, () => {});
*/

    //this.hospitalService.getToken().subscribe(data=>{this.greeting=data})
  }


  alternativeFlow(){
    //"https://services.humanbrainproject.eu/oidc/authorize?response_type=code&client_id=dummy-native-client&redirect_uri=https%3A%2F%2Fauthorization.humanbrainproject.eu&scope=offline_access"
    //this.http.get("https://services.humanbrainproject.eu/oidc/authorize?response_type=code&client_id="+this.clientId+"&redirect_uri="+this.redirectUri+"&scope=offline_access").subscribe(data=>{this.greeting=data});
   // window.location.href ="https://services.humanbrainproject.eu/oidc/authorize?client_id=956c2ee1-000d-4b51-8024-55575bb85efb&redirect_uri=http://195.251.252.222:2443/login&response_type=code&scope=openid%20profile&state=XWcB32";
 ////  window.location.href ="https://services.humanbrainproject.eu/oidc/authorize?client_id=" + this.clientId + "&redirect_uri="+this.redirectUri+"&response_type=code&scope=openid%20profile&state=XWcB32";
 ///  window.location.href ="https://services.humanbrainproject.eu/oidc/authorize?client_id=" + this.clientId + "&redirect_uri="+this.redirectUri+"&response_type=code&scope=openid%20profile&state=XWcB32";

    // window.location.href ="https://authorization.humanbrainproject.eu?client_id="+this.clientId+"&redirect_uri="+ this.redirectUri+"&scope=openid%20profile&state=12345";

    //window.location.href = "https://services.humanbrainproject.eu/oidc/authorize?client_id=956c2ee1-000d-4b51-8024-55575bb85efb&redirect_uri=http://195.251.252.222:2443/login&response_type=code&scope=openid%20profile&state=12345";
    console.log("alternative: "+this.greeting)
  }
/*{grant_type=[authorization_code], code=[XSP8ud], redirect_uri=[http://195.251.252.222:2443/login], client_id=[956c2ee1-000d-4b51-8024-55575bb85efb], client_secret=[QOLD9iBdVLoqf5ZLxhBDwtmDa58gTvpvueMtmRPGjJw3hIRdiKmAFPp3FIq7VPvCagmSObEGEvCASpqbGU9zAw]}
  2019-02-13 16:10:35.519 DEBUG 12883 --- [138-8086-exec-2] o.s.s.oauth2.client.OAuth2RestTemplate   : HTTP GET https://services.humanbrainproject.eu/oidc/userinfo?access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImJicC1vaWRjIn0.eyJleHAiOjE1NTAwODE0MzQsInN1YiI6IjMwNjYxOSIsImF1ZCI6WyI5NTZjMmVlMS0wMDBkLTRiNTEtODAyNC01NTU3NWJiODVlZmIiXSwiaXNzIjoiaHR0cHM6XC9cL3NlcnZpY2VzLmh1bWFuYnJhaW5wcm9qZWN0LmV1XC9vaWRjXC8iLCJqdGkiOiI1ZmI5MzAwYy01YTRhLTRiN2ItOGQ0NC04YzNmZTkyODhlYzIiLCJpYXQiOjE1NTAwNjcwMzQsImhicF9rZXkiOiJmMGM1NDczNjNlMmFkYTgxZGFmNTMyYTc5ZjRhNTE5MWQ2Y2YxZWRmIn0.JyDSon_93HiwX_Jb89UHVylafX0tNJugRvyI2WpWiCKSFUPAjlE-vEk8Vmq1SmCYkpcVk5y6urmS_986F710SZeo2KrP63x9s2T9d6x9RuV912N3trROcqncRdGEsekVSSxbQGnrSUP61yUE1JZt3A3Fu3DLfRhDzFJrgqur4Wc
    2019-02-13 16:10:35.521 DEBUG 12883 --- [138-8086-exec-2] o.s.s.oauth2.client.OAuth2RestTemplate   : Accept=[application/json, application/*+json]
*/

requestTest(){
  //const token = this.tokenExtractor.getToken() as string;
  console.log("token from cookie "+this.token2);
 // this.hospitalService.getHome().subscribe(home=>{this.greeting=home});
  console.log("home is "+this.greeting);
  this.hospitalService.getUser().subscribe(user=>{this.user=user});
  console.log("user is "+this.user['name']);
}

tokenAtRequest(){
 // const token = this.tokenExtractor.getToken() as string;
  console.log("token from cookie "+this.token2);
  let headers = new HttpHeaders({'X-Requested-With':'XMLHttpRequest'});
  this.http.get('/user',{headers:headers}).subscribe(user=>{this.user = user});
  console.log("user is:"+this.user);
  this.http.get('/home',{headers:headers}).subscribe(variab=>{this.variables=variab});
  console.log("variables are :"+this.variables.toString());
}
tokenFromCookie(){
  //const token = this.tokenExtractor.getToken() as string;
    console.log("token from cookie "+this.token2);
    console.log("trying to get user with token");
  this.http.post<any>('http://195.251.252.222:2443/user', {headers: new HttpHeaders().set('X-XSRF-TOKEN', this.token2)}).subscribe(response => this.greeting = response);
  console.log("user is: "+this.greeting);
}
 retrieveToken(){
   let i = window.location.href.indexOf('code');
   let code = window.location.href.substring(i+5,i+11);
   console.log("index of code: "+i+" code +5 : "+code);
   const token = this.tokenExtractor.getToken() as string;
   console.log("token is: "+token);
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('redirect_uri', 'http://195.251.252.222:2443/login');
    params.append('code',code);

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', "Accept": "application/json", "Authorization": "Basic " + btoa(this.clientId + ':' + this.clientSecret)});
    this.http.post('https://services.humanbrainproject.eu/oidc/token', params.toString(), { headers: headers })
      .subscribe(
        data => this.token,
        err => alert('Invalid Credentials')
      );
  }


getUser(){
  //const token = this.tokenExtractor.getToken() as string;
  console.log("token is: "+this.token2);
  this.http.post<any>('/user',  {headers: new HttpHeaders().set('X-XSRF-TOKEN', this.token2)}).subscribe(response => this.greeting = response);
  console.log("user is: "+this.greeting);
  }



getUser2(){
  let i = window.location.href.indexOf('code');
  let b = window.location.href.substring(i + 5);
  console.log("index of code: "+i+" code +5 : "+b);
 // const token = this.tokenExtractor.getToken() as string;
  console.log("token is: "+this.token2);
  this.http.get('http://195.251.252.222:2443', {headers : new HttpHeaders().set('x-auth-token', this.token2)})
    .subscribe(response => this.greeting = response);
  console.log("user is: "+this.greeting);
}
getUser3(){
  this.http.get('http://195.251.252.222:2443/user').subscribe(data=>{this.user = data})
}

  ngOnInit() {
  }
  login(){
    this.http.get('login').subscribe(data=>{this.loginData = data})
  }
  logout() {
    this.http.post('/logout',{}).finally(() => {
      this.authenticated = false;
      //this.router.navigateByUrl('/');
    }).subscribe();
  }


  /*
    this.hospitalService.getToken().subscribe(data => {
      const token = data['token'];
      http.get('http://195.251.252.222:2443', {headers : new HttpHeaders().set('X-Auth-Token', token)})
        .subscribe(response => this.greeting = response);
    }, () => {});

  logout() {
    this.http.post('logout', {}).finally(() => {
      this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    }).subscribe();
  }

  $http({
      method: 'GET',
      url: '/someUrl'
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
*/


}
