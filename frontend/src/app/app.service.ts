import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class AppService {
  public clientId = '956c2ee1-000d-4b51-8024-55575bb85efb';
  public redirectUri = 'http://195.251.252.222:2443';
  /*
  * security.oauth2.client.client-id=956c2ee1-000d-4b51-8024-55575bb85efb
security.oauth2.client.client-secret=QOLD9iBdVLoqf5ZLxhBDwtmDa58gTvpvueMtmRPGjJw3hIRdiKmAFPp3FIq7VPvCagmSObEGEvCASpqbGU9zAw
security.oauth2.client.accessTokenUri=https://services.humanbrainproject.eu/oidc/token
security.oauth2.client.userAuthorizationUri=https://services.humanbrainproject.eu/oidc/authorize
security.oauth2.client.authenticationScheme=query
security.oauth2.client.clientAuthenticationScheme=form
security.oauth2.client.scope=openid profile
security.oauth2.resource.userInfoUri=https://services.humanbrainproject.eu/oidc/userinfo
security.oauth2.client.pre-established-redirect-uri=http://195.251.252.222:2442/login
security.oauth2.client.useCurrentUri=false*/

  constructor(
    private _http: HttpClient){}

  retrieveToken(code){
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa(this.clientId+":secret")});
    this._http.post('https://services.humanbrainproject.eu/oidc/token', params.toString(), { headers: headers })
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')
      );
  }

  saveToken(token){
    alert("token is:"+token);
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = 'http://195.251.252.222:2442/home';
  }

  getResource(resourceUrl) : Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    return this._http.get(resourceUrl, { headers: headers })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials(){
    return Cookie.check('access_token');
  }

  logout() {
    Cookie.delete('access_token');
    window.location.reload();
  }
}
