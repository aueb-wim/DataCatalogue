import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  customMap:Array<any> = new Array<any>();
  address = '//localhost:8086';

  constructor(private http: HttpClient) { }

  getAllVariables(): Observable<any> {
    //return this.http.get('//195.251.252.222:2443/hospital/allVariables');
    return this.http.get(this.address + '/hospital/allVariables');
  }


  getAllVersionsPerHospital():Observable<any>{

    //return this.http.get('//195.251.252.222:2443/versions/allVersionsPerHospital');
    return this.http.get(this.address + '/versions/allVersionsPerHospital');
  }

  getAllCdeVersions():Observable<any> {
    //return this.http.get('//195.251.252.222:2443/CDE/allCdeVersions');
    return this.http.get(this.address + '/CDE/allCdeVersions');
  }


  getAllHospitalsAndVariables(): Observable<any> {
    //return this.http.get('//195.251.252.222:2443/hospitals/hosp');
    return this.http.get(this.address + '/hospitals/hosp');
  }

  getVersionsByHospitalId(hospital_id: number):Observable<any>{
    //return this.http.get('//195.251.252.222:2443/versions/allVersionsPerHospital/'+hospital_id);
    return this.http.get(this.address + '/versions/allVersionsPerHospital/'+hospital_id);
  }

  getAllVersions(): Observable<any>{
    //return this.http.get('//195.251.252.222:2443/versions/allVersions');
    return this.http.get(this.address + '/versions/allVersions');
  }

  getVersionById(version_id:number){
    //return this.http.get('//195.251.252.222:2443/versions/allVersions/'+version_id);
    return this.http.get(this.address + '/versions/allVersions/'+version_id);
  }

  getJsonStringByVersionId(version_id:number):Observable<any>{
    //return this.http.get('//195.251.252.222:2443/versions/jsonStringByVersionId/'+version_id);
    return this.http.get(this.address + '/versions/jsonStringByVersionId/'+version_id);
  }

  getjsonStringVisualizableByVersionId(version_id:number):Observable<any>{
    //return this.http.get('//195.251.252.222:2443/versions/jsonStringVisualizableByVersionId/'+version_id);
    return this.http.get(this.address + '/versions/jsonStringVisualizableByVersionId/'+version_id);

  }
  getExcelSample():Observable<any>{
    //return this.http.get('//195.251.252.222:2443/mapping/down');
    return this.http.get(this.address + '/mapping/down');
  }

  getHospitalById(hospital_id:number):Observable<any>{
    //return this.http.get('//195.251.252.222:2443/hospitals/hosp/'+hospital_id);
    return this.http.get(this.address + '/hospitals/hosp/'+hospital_id);
  }

  getAllFunctions():Observable<any>{
    //return this.http.get('//195.251.252.222:2443/mapping/functions/');
    return this.http.get(this.address + '/mapping/functions/');
  }

  getFunctionsByVariableVersionId(version_id:number):Observable<any>{
    //return this.http.get('//195.251.252.222:2443/mapping/functionsByVersionId/'+version_id);
    return this.http.get(this.address + '/mapping/functionsByVersionId/'+version_id);
  }
  ///////////////////////////UPLOAD RELATED
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    //const req = new HttpRequest('POST', '//195.251.252.222:2443//mapping/post', formdata, {
    const req = new HttpRequest('POST', this.address+'/mapping/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    //return this.http.get('//195.251.252.222:2443//mapping/getallfiles');
    return this.http.get(this.address + '/mapping/getallfiles');
  }
  //////////////////////////////////////// GET SAMPLE FILE
  getSample():Observable<any>{
    //return this.http.get('//195.251.252.222:2443//mapping/getsample');
    return this.http.get(this.address + '/mapping/getsample');
  }
  /////////////////////////////////////////////////

}
