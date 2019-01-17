import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {IOption} from "ng-select";

@Component({
  selector: 'app-all-hospitals',
  templateUrl: './all-hospitals.component.html',
  styleUrls: ['./all-hospitals.component.css']
})
export class AllHospitalsComponent implements OnInit {

  allHospitalVariables:Array<any>;
  allVariables:Array<any>;
  myOptions2: Array<IOption> = [{label: '', value: ''}];
  disabled = false;
  searchTermVar: String = "";
  viewInitialized: boolean;


  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllHospitalsAndVariables().subscribe(data => {this.allHospitalVariables = data;});
    this.hospitalService.getAllVariables().subscribe(all=>{this.allVariables = all});
  }

  public selected(option: IOption): void {
    this.searchTermVar = option.label;
  }


  public deselected(option: IOption): void {
    this.searchTermVar = "";
  }
  public filterInputChanged(option: IOption): void{
    this.searchTermVar = option.label;
  }

  public arrayIterationByLabel(originalArray) {
    //empty the array first
    this.myOptions2.length = 0;
    for (let obj of originalArray) {
      this.myOptions2.push({label: obj['code'].toString(), value: obj['variable_id'].toString()});
    }
    return this.myOptions2;
  }


}
