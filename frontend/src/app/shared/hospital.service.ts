import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  customMap:Array<any> = new Array<any>();


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

  getAllFunctions():Observable<any>{
    return this.http.get('//195.251.252.222:2443/mapping/functions/');
  }

  getFunctionsByVariableVersionId(version_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/mapping/functionsByVersionId/'+version_id);
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
