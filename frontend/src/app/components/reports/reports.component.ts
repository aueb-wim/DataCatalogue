import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IOption} from "ng-select";
import * as d3 from "d3";
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @Input("reportOpen") reportOpen;
  @Input("diagramOpen") diagramOpen;
  @Input("variables") variables;
  @Input("batchReports") batchReports;
  @Input("hospitalName") hospitalName:string;
  @Input("versionNumber") versionNumber:number;
  @Input("searchTermVar") searchTermVar;
  @Output() reportOpenChange = new EventEmitter<boolean>();
  @Output() diagramOpenChange = new EventEmitter<boolean>();
  myOptions2: Array<IOption> = [{label: '', value: ''}];
  value: any = {};
  disabled = false;


  constructor(private hospitalService:HospitalService) { }

  ngOnInit() {
  }


  changeReportOpen(){
    if(this.diagramOpen){
      d3.select('svg').remove();
      this.diagramOpen = !this.diagramOpen;
      this.diagramOpenChange.emit(this.diagramOpen);
    }else{
      this.reportOpen = !this.reportOpen;
      this.reportOpenChange.emit(this.reportOpen);
    }

  }
  downloadBatchReport() {
    let batchReportName = 'batchReport_'+this.versionNumber +'_'+ this.hospitalName;
    this.hospitalService.getBatchReport(batchReportName)
      .subscribe(
        data=>{
          console.log("batch report data is: "+data);
          window.open("http://195.251.252.222:2442/report/getBatchReport/"+batchReportName+'.csv');
          console.log('batch report downloaded...');
        },
        error => {
          if(error.status=='401'){
            alert("You need to be logged in to complete this action.");
          }else if(error.status=='500'){
            alert("The general report is not available.");
          } else{
            //alert("You need to be logged in to complete this action2.");
            window.open("http://195.251.252.222:2442/report/getBatchReport/"+batchReportName+'.csv');
            console.log('batch report downloaded...');
          }});
  }

  downloadVariableReport() {
    let variableReportName = 'variableReport_'+this.versionNumber +'_'+ this.hospitalName;
    this.hospitalService.getVariableReport(variableReportName)
      .subscribe(
        data=>{
          console.log("sample data is: "+data);
          window.open("http://195.251.252.222:2442/report/getVariableReport/"+variableReportName+'.csv');
          console.log('variable report downloaded...');
        },
        error => {
          if(error.status=='401'){
            alert("You need to be logged in to complete this action.");
          }else if(error.status=='500'){
            alert("The variable report is not available.");
          }else{
            //alert("You need to be logged in to complete this action2.");
            window.open("http://195.251.252.222:2442/report/getVariableReport/"+variableReportName+'.csv');
            console.log('variable report downloaded...');
          }});


  }


}
