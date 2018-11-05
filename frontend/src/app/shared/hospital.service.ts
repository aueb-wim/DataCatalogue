import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RequestOptions} from "@angular/http";
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  customMap:Array<any> = new Array<any>();

  constructor(private http: HttpClient) { }

  getAllVariables(): Observable<any> {
    return this.http.get('//localhost:8086/hospital/allVariables');
  }

  getVariableById(variable_id: number):Observable<any>{

    return this.http.get('//localhost:8086/hospital/allVariables/'+variable_id)
  }
  getAllVersionsPerHospital():Observable<any>{

    return this.http.get('//localhost:8086/versions/allVersionsPerHospital2');



  }







  getVariablesByHospitalAndVersionId(hospital_id: number, version_id: number):Observable<any>{
    return this.http.get('//localhost:8086/hospital/'+hospital_id+'/variables/'+version_id)
  }
getVariablesByVersionId(version_id: number):Observable<any>{
  return this.http.get('//localhost:8086/hospital/variablesByVersion/'+version_id)
}
  getAllHospitals(): Observable<any> {
    return this.http.get('//localhost:8086/hospitals/hosp');
  }

  getAllVersions(): Observable<any>{
    return this.http.get('//localhost:8086/versions/allVersions')
  }
getVersionsByVariableId(variable_id):Observable<any>{
    return this.http.get('//localhost:8086/hospital/versionsPerVariable/'+variable_id);
}
  getVariableById2(variableId: string): Observable<any> {
    const params = new HttpParams().set('variable_id',variableId);
    return this.http.get('//localhost:8086/hospital/allVariables/',{params})

  }


}
