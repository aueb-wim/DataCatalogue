import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  customMap:Array<any> = new Array<any>();
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

  getAllVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2443/hospital/allVariables');
  }
  getAllUniqueVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2443/hospital/allUniqueVariables');
  }

  getAllVersionsPerHospital():Observable<any>{

    return this.http.get('//195.251.252.222:2443/versions/allVersionsPerHospital');

  }

  getAllCdeVersions():Observable<any> {
    return this.http.get('//195.251.252.222:2443/CDE/allCdeVersions');
  }


  getAllHospitalsAndVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2443/hospitals/hosp');
  }
  getAllHospitalsAndUniqueVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2443/hospitals/allWithUniqueVariables');
  }


  getVersionsByHospitalId(hospital_id: number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/versions/allVersionsPerHospital/'+hospital_id);

  }

  getLatestVersionByHospitalId(hospital_id: number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/versions/getLatestVersionByHospitalId/'+hospital_id);

  }



  getAllVersions(): Observable<any>{
    return this.http.get('//195.251.252.222:2443/versions/allVersions');
  }

  getVersionById(version_id:number){
    return this.http.get('//195.251.252.222:2443/versions/allVersions/'+version_id);
  }

  getJsonStringByVersionId(version_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/versions/jsonStringByVersionId/'+version_id);
  }

  getjsonStringVisualizableByVersionId(version_id:number):Observable<any>{

    return this.http.get('//195.251.252.222:2443/versions/jsonStringVisualizableByVersionId/'+version_id);

  }
  getExcelSample():Observable<any>{
    return this.http.get('//195.251.252.222:2443/mapping/down');
  }

  getHospitalById(hospital_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/hospitals/hosp/'+hospital_id);
  }

  getHospitalNameById(hospital_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/hospitals/name/'+hospital_id);
  }

  getAllFunctions():Observable<any>{
    return this.http.get('//195.251.252.222:2443/mapping/functions/');
  }

  getRandomFunction():Observable<any>{
    return this.http.get('//195.251.252.222:2443/mapping/randomFunction/');
  }

  getFunctionsByVariableVersionId(version_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/mapping/functionsByVersionId/'+version_id);
  }


  ///////////////////////////SEND NEW VERSION
  public createNewVersion2(version: any): Observable<HttpEvent<{}>>{
    //const formdata: FormData = new FormData();
    //formdata.append('version', version);
    const req = new HttpRequest('POST','//195.251.252.222:2443/versions/sendNewVersion',version,{
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  createNewVersion (hospitalName: string, versionName: string, version: any): Observable<any> {
    return this.http.post<any>('//195.251.252.222:2443/versions/newVersion', [hospitalName,versionName,version]);
  }
  ///////////////////////////UPLOAD RELATED
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', '//195.251.252.222:2443//mapping/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('//195.251.252.222:2443//mapping/getallfiles');
  }
  //////////////////////////////////////// GET SAMPLE FILE
  getSample():Observable<any>{
    return this.http.get('//195.251.252.222:2443//mapping/getsample');
  }
  /////////////////////////////////////////////////

}
