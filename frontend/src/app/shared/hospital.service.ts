import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders,HttpClientXsrfModule, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})

export class HospitalService {
  customMap:Array<any> = new Array<any>();
  //private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private headers = new HttpHeaders({'X-Requested-With':'XMLHttpRequest'});


  constructor(private http: HttpClient) { }

  getAllVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2442/hospital/allVariables',{headers:this.headers});
  }
  getAllUniqueVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2442/hospital/allUniqueVariables',{headers:this.headers});
  }

  getAllVersionsPerHospital():Observable<any>{

    return this.http.get('//195.251.252.222:2442/versions/allVersionsPerHospital',{headers:this.headers});

  }

  getAllCdeVersions():Observable<any> {
    return this.http.get('//195.251.252.222:2442/CDE/allCdeVersions',{headers:this.headers});
  }
///////////////////////////////
////////////////////////////////
  login():Observable<any>{
    return this.http.post('/login',{headers:this.headers});
  }

  logout():Observable<any>{
    return this.http.post('//195.251.252.222:2442/logout',{headers:this.headers});
  }

  getUser():Observable<any>{
    return this.http.get('/user',{headers:this.headers});
  }

  hospitalReadExcel():Observable<any> {
    return this.http.get('//195.251.252.222:2442/hospital/readExcel',{headers:this.headers});
  }

  cdeReadExcel():Observable<any> {
    return this.http.get('//195.251.252.222:2442/CDE/readExcel',{headers:this.headers});
  }
////////////////////////////////
////////////////////////////////
////////////////////////////////
  getAllHospitalsAndVariables(): Observable<any> {
    return this.http.get('/hospitals/hosp',{headers:this.headers});
  }
  getAllHospitalsAndUniqueVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2442/hospitals/allWithUniqueVariables',{headers:this.headers});
  }


  getVersionsByHospitalId(hospital_id: number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/versions/allVersionsPerHospital/'+hospital_id,{headers:this.headers});

  }

  getlatestVersionIdByHospId(hospital_id: number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/versions/latestVersionIdByHospId/'+hospital_id,{headers:this.headers});

  }

//
  getLatestVersionByHospitalId(hospital_id: number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/versions/getLatestVersionByHospitalId/'+hospital_id,{headers:this.headers});

  }



  getAllVersions(): Observable<any>{
    return this.http.get('//195.251.252.222:2442/versions/allVersions',{headers:this.headers});
  }

  getVersionById(version_id:number){
    return this.http.get('//195.251.252.222:2442/versions/allVersions/'+version_id,{headers:this.headers});
  }

  getJsonStringByVersionId(version_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/versions/jsonStringByVersionId/'+version_id,{headers:this.headers});
  }

  getjsonStringVisualizableByVersionId(version_id:number):Observable<any>{

    return this.http.get('//195.251.252.222:2442/versions/jsonStringVisualizableByVersionId/'+version_id,{headers:this.headers});

  }
  getExcelSample():Observable<any>{
    return this.http.get('//195.251.252.222:2442/mapping/down',{headers:this.headers});
  }

  getHospitalById(hospital_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/hospitals/hosp/'+hospital_id,{headers:this.headers});
  }

  getHospitalNameById(hospital_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/hospitals/name/'+hospital_id,{headers:this.headers});
  }

  getAllFunctions():Observable<any>{
    return this.http.get('//195.251.252.222:2442/mapping/functions/',{headers:this.headers});
  }

  getRandomFunction():Observable<any>{
    return this.http.get('//195.251.252.222:2442/mapping/randomFunction/',{headers:this.headers});
  }

  getFunctionsByVariableVersionId(version_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2442/mapping/functionsByVersionId/'+version_id,{headers:this.headers});
  }


  ///////////////////////////SEND NEW VERSION
  public createNewVersion2(version: any): Observable<HttpEvent<{}>>{
    //const formdata: FormData = new FormData();
    //formdata.append('version', version);
    const req = new HttpRequest('POST','//195.251.252.222:2442/versions/sendNewVersion',version,{
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  createNewVersion (hospitalName: string, versionName: string, version: any): Observable<any> {
    return this.http.post<any>('//195.251.252.222:2442/versions/newVersion', [hospitalName,versionName,version],{headers:this.headers});
  }
  ///////////////////////////UPLOAD RELATED
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', '//195.251.252.222:2442//mapping/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('//195.251.252.222:2442//mapping/getallfiles');
  }
  //////////////////////////////////////// GET SAMPLE FILE
  getSample():Observable<any>{
    return this.http.get('//195.251.252.222:2442//mapping/getsample');
  }
  /////////////////////////////////////////////////

}
