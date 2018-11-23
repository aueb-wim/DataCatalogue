import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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


  getAllVersionsPerHospital():Observable<any>{

    return this.http.get('//195.251.252.222:2443/versions/allVersionsPerHospital');

  }

  getAllCdeVersions():Observable<any> {
    return this.http.get('//195.251.252.222:2443/CDE/allCdeVersions');
  }


  getAllHospitalsAndVariables(): Observable<any> {
    return this.http.get('//195.251.252.222:2443/hospitals/hosp');
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
    return this.http.get('//195.251.252.222:2443/versions/jsonStringByVersionId/'+version_id)
  }


}
