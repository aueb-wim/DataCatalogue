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

  getVariableById(variable_id: number):Observable<any>{

    return this.http.get('//195.251.252.222:2443/hospital/allVariables/'+variable_id)
  }
  getAllVersionsPerHospital():Observable<any>{

    return this.http.get('//195.251.252.222:2443/versions/allVersionsPerHospital');

  }

  getAllCdeVersions():Observable<any> {
    return this.http.get('//195.251.252.222:2443/CDE/allCdeVersions');
  }


  getVariablesByHospitalAndVersionId(hospital_id: number, version_id: number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/hospital/'+hospital_id+'/variables/'+version_id)
  }
getVariablesByVersionId(version_id: number):Observable<any>{
  return this.http.get('//195.251.252.222:2443/hospital/variablesByVersion/'+version_id)
}
  getAllHospitals(): Observable<any> {
    return this.http.get('//195.251.252.222:2443/hospitals/hosp');
  }

  getAllVersions(): Observable<any>{
    return this.http.get('//195.251.252.222:2443/versions/allVersions')
  }

  getJsonStringByVersionId(version_id:number):Observable<any>{
    return this.http.get('//195.251.252.222:2443/versions/jsonStringByVersionId/'+version_id)
  }


}
