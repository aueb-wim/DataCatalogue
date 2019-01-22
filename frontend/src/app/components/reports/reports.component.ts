import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IOption} from "ng-select";
import * as d3 from "d3";

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
  @Input("searchTermVar") searchTermVar;
  @Output() reportOpenChange = new EventEmitter<boolean>();
  @Output() diagramOpenChange = new EventEmitter<boolean>();
  myOptions2: Array<IOption> = [{label: '', value: ''}];
  value: any = {};
  disabled = false;

  constructor() { }

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

}
