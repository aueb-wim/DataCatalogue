import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders,HttpClientXsrfModule, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class HospitalService {
  //customMap:Array<any> = new Array<any>();
  //private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private headers = new HttpHeaders({'X-Requested-With':'XMLHttpRequest'});
  private frontend_ip = '//195.251.252.222:2446';

  constructor(private http: HttpClient) { }

  getAllVariables(): Observable<any> {

    return this.http.get(this.frontend_ip + '/hospital/allVariables',{headers:this.headers});
  }
  getAllUniqueVariables(): Observable<any> {
    return this.http.get(this.frontend_ip + '/hospital/allUniqueVariables',{headers:this.headers});

  }

  getAllVersionsPerHospital():Observable<any>{

    return this.http.get(this.frontend_ip + '/versions/allVersionsPerHospital',{headers:this.headers});

  }

  getAllPathologies():Observable<any>{

    return this.http.get(this.frontend_ip + '/pathology/allPathologies',{headers:this.headers});

  }

  getPathologyById(pathology_id: number):Observable<any>{
    return this.http.get( this.frontend_ip + '/pathology/allPathologies/'+pathology_id,{headers:this.headers});

  }
  getPathologyNameById(pathology_id: number):Observable<any>{
    return this.http.get(this.frontend_ip + '/pathology/allPathologies/'+pathology_id+'/name',{headers:this.headers});

  }

  getLatestCdeVersionByPathologyName(pathology_name: string){
    return this.http.get( this.frontend_ip + '/pathology/allPathologies/'+pathology_name+'/latest_cde_version',{headers:this.headers});
  }


  getAllCdeVersions():Observable<any> {
    return this.http.get(this.frontend_ip + '/CDE/allCdeVersions',{headers:this.headers});
  }
/*
  login():Observable<any>{
    return this.http.post('/login',{headers:this.headers});
  }*/

  logout():Observable<any>{
    return this.http.post(this.frontend_ip + '/logout',{headers:this.headers});
  }

  getUser():Observable<any>{
    return this.http.get('/user',{headers:this.headers});
  }

  hospitalReadExcel():Observable<any> {
    return this.http.get(this.frontend_ip + '/hospital/readExcel',{headers:this.headers});
  }

  cdeReadExcel():Observable<any> {
    return this.http.get(this.frontend_ip + '/CDE/readExcel',{headers:this.headers});
  }

  getLatestCDEVersion(){
    return this.http.get(this.frontend_ip + '/versions/latestCDEVersion',{headers:this.headers});
  }
////////////////////////////////
////////////////////////////////
////////////////////////////////
  /*getAllHospitalsAndVariables(): Observable<any> {

    return this.http.get('/hospitals/hosp',{headers:this.headers});

  }*/
  getAllHospitalsAndUniqueVariables(): Observable<any> {
    return this.http.get(this.frontend_ip + '/hospitals/allWithUniqueVariables',{headers:this.headers});
  }


  getVersionsByHospitalId(hospital_id: number):Observable<any>{
    return this.http.get(this.frontend_ip + '/versions/allVersionsPerHospital/'+hospital_id,{headers:this.headers});

  }

  getlatestVersionIdByHospId(hospital_id: number):Observable<any>{
    return this.http.get(this.frontend_ip + '/versions/latestVersionIdByHospId/'+hospital_id,{headers:this.headers});

  }

//
  getLatestVersionByHospitalId(hospital_id: number):Observable<any>{
    return this.http.get(this.frontend_ip + '/versions/getLatestVersionByHospitalId/'+hospital_id,{headers:this.headers});

  }



  getAllVersions(): Observable<any>{
    return this.http.get(this.frontend_ip + '/versions/allVersions',{headers:this.headers});
  }

  getVersionById(version_id:number){
    return this.http.get(this.frontend_ip + '/versions/allVersions/'+version_id,{headers:this.headers});
  }

  getJsonStringByVersionId(version_id:number):Observable<any>{
    return this.http.get(this.frontend_ip + '/versions/jsonStringByVersionId/'+version_id,{headers:this.headers});
  }

  getjsonStringVisualizableByVersionId(version_id:number):Observable<any>{

    return this.http.get(this.frontend_ip + '/versions/jsonStringVisualizableByVersionId/'+version_id,{headers:this.headers});

  }
  getExcelSample():Observable<any>{
    return this.http.get(this.frontend_ip + '/mapping/down',{headers:this.headers});
  }

  getHospitalById(hospital_id:number):Observable<any>{
    return this.http.get(this.frontend_ip + '/hospitals/hosp/'+hospital_id,{headers:this.headers});
  }

  getHospitalNameById(hospital_id:number):Observable<any>{
    return this.http.get(this.frontend_ip + '/hospitals/name/'+hospital_id,{headers:this.headers});
  }

  getAllFunctions():Observable<any>{
    return this.http.get(this.frontend_ip + '/mapping/functions/',{headers:this.headers});
  }

  getRandomFunction():Observable<any>{
    return this.http.get(this.frontend_ip + '/mapping/randomFunction/',{headers:this.headers});
  }

  getFunctionsByVariableVersionId(version_id:number):Observable<any>{
    return this.http.get(this.frontend_ip + '/mapping/functionsByVersionId/'+version_id,{headers:this.headers});
  }

 uploadAllReports(){
   return this.http.get(this.frontend_ip + '/report/uploadAllReports/',{headers:this.headers});

 }
  ///////////////////////////SEND NEW VERSION
  public createNewVersion2(version: any): Observable<HttpEvent<{}>>{
    //const formdata: FormData = new FormData();
    //formdata.append('version', version);
    const req = new HttpRequest('POST',this.frontend_ip + '/versions/sendNewVersion',version,{
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  createNewVersion (hospitalName: string, versionName: string, version: any): Observable<any> {
    return this.http.post<any>(this.frontend_ip + '/versions/newVersion', [hospitalName,versionName,version],{headers:this.headers});
  }

  createNewVersionCde(pathologyName:string,versionName:string, version: any):Observable<any> {
    return this.http.post<any>(this.frontend_ip + '/versions/newVersionCde', [pathologyName,versionName,version],{headers:this.headers});
  }

  ///////////////////////////UPLOAD RELATED
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);


    const req = new HttpRequest('POST', this.frontend_ip + '/mapping/post', formdata, {

      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {

    return this.http.get(this.frontend_ip + '/mapping/getallfiles',{headers:this.headers});
  }
  //////////////////////////////////////// GET SAMPLE FILE
  getSample(sampleVersion:string):Observable<any>{
    return this.http.get(this.frontend_ip + '/mapping/getsample/'+sampleVersion,{headers:this.headers});
  }
  getBatchReport(filename:string):Observable<any>{
    return this.http.get(this.frontend_ip + '/report/getBatchReport/'+filename + '.csv',{headers:this.headers});
  }
  getVariableReport(filename:string):Observable<any>{
    return this.http.get(this.frontend_ip + '/report/getVariableReport/'+filename + '.csv',{headers:this.headers});
  }


  /////////////////////////////////////////////////

}
