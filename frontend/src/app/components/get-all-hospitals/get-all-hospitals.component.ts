import {Component, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {LogService} from "../../shared/log.service";


@Component({
  selector: 'app-get-all-hospitals',
  templateUrl: './get-all-hospitals.component.html',
  styleUrls: ['./get-all-hospitals.component.css']
})



export class GetAllHospitalsComponent implements OnInit{

hospitals: Array<any>;
versions: Array<any>;
allCdeVersions: Array<any>;
currentVersionId: number;
currentHospitalId: number;
variables: Array<any>;
variableByVersionId: Array<any>;
variablesByHospitalAndVerionId: Array<any>;
allVersionsPerHospital: Array<any>;
searchTermHosp: String;
searchTermVar: String;
searchTermVer: String;


  constructor(private hospitalService: HospitalService, private logService: LogService ) {


  }

  ngOnInit() {
    this.hospitalService.getAllHospitals().subscribe(data => {this.hospitals = data;});
    this.hospitalService.getAllVersions().subscribe(versions => {this.versions = versions});
    this.hospitalService.getAllVersionsPerHospital().subscribe(allVersions => {this.allVersionsPerHospital = allVersions});
    this.hospitalService.getAllCdeVersions().subscribe(allVersions => {this.allCdeVersions = allVersions});

  }



public getVariablesByVersionId(verId){
  this.hospitalService.getVariablesByVersionId(verId).subscribe(data => {this.variableByVersionId = data;});

}

public printSomething(){
  console.log('Method Called !!!!!!!!!!1');
}
  public setCurrentVersionId(verId){
this.currentVersionId = verId;

  }

  public getVariablesByHospitalAndVersionId(hospId, verId){
    this.hospitalService.getVariablesByHospitalAndVersionId(hospId, verId).subscribe(data => {this.variablesByHospitalAndVerionId = data;});
  }

  public setCurrentHospitalId(hospId){
this.currentHospitalId = hospId;
  }

}
