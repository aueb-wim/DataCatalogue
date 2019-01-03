import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { MatTabChangeEvent } from '@angular/material';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-cde-variables',
  templateUrl: './cde-variables.component.html',
  styleUrls: ['./cde-variables.component.css']
})

export class CdeVariablesComponent implements OnInit,OnChanges {
  allCdeVersions: Array<any>;
  searchTermVer: String;
  diagramOpen=false;
  jsonMetadata:any;
  jsonVisualizable:any;
  currentVersionId=2; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionName;
  downloadName = "cdes_";
  allFunctions:Array<any>;
searchTermVar:String;
  filterDisabled = true;
  constructor(private hospitalService: HospitalService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.hospitalService.getAllCdeVersions().subscribe(allVersions => {this.allCdeVersions = allVersions});
    this.hospitalService.getjsonStringVisualizableByVersionId(this.currentVersionId).subscribe(json=>{this.jsonVisualizable=json});

  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['currentVersionId']) {
      this.hospitalService.getJsonStringByVersionId(this.currentVersionId).subscribe(json=>{this.jsonMetadata=json});
    }
  }

  changeVersionId(verId){
    this.currentVersionId = verId;
  }

  changeVersionName(verName){
    this.currentVersionName = verName;
  }

  tabChanged(event) {
    this.changeVersionId(this.allCdeVersions[event.index].version_id);
    this.changeVersionName(event.tab.textLabel);
    this.searchTermVar = "";
  }

  createSampleFileName(){
    var oldName = parseInt(this.allCdeVersions[this.allCdeVersions.length-1].name.replace('v', ''));
    oldName = oldName + 1;
    return "v"+oldName.toString()+".xlsx";
  }
  enableFilter(){
    this.filterDisabled = false;
  }

  changeSearchTermVar(event){
    this.filterDisabled = true;
    this.searchTermVar = event.target.value;
  }

}
