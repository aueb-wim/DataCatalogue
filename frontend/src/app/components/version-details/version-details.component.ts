import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-version-details',
  templateUrl: './version-details.component.html',
  styleUrls: ['./version-details.component.css']
})
export class VersionDetailsComponent implements OnInit,OnChanges {
  @Input('versionId') versionId;
  @Input('version') version;
  @Input('jsonMetadata') jsonMetadata;
  @Input('versionName') versionName;
  @Input('downloadFileName') downloadName;
  @Input('cdeData') cdeData;
  @Input('searchTermVar') searchTermVar:string;
  @Input('searchTermCategory') searchTermCategory:string;
  //version:any;
  //jsonMetadata:any;
  disabledInput:boolean;


  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    //this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});
    //this.route.params
    //.switchMap((params: Params) => this.hospitalService.getVersionById(+params['versionId']))
     // .subscribe(ver => this.version = ver);
    //this.hospitalService.getJsonStringByVersionId(this.versionId).subscribe(json=>{this.jsonMetadata=json});
    //this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});
    //this.hospitalService.getJsonStringByVersionId(this.versionId).subscribe(json=>{this.jsonMetadata=json});
    //this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});
//alert("editable? "+this.editable)
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['versionId']) {
      this.hospitalService.getJsonStringByVersionId(this.versionId).subscribe(json=>{this.jsonMetadata=json});
      //this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});

    }

  }

  goBack(): void {
    this.location.back();
  }

  download(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(blob, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  exportJson(): void {
    const c = JSON.stringify(this.jsonMetadata);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file,this.downloadName+this.versionName+".json");
  }



  toggleEdit(){
   this.disabledInput = !this.disabledInput;
  }

  deleteVariable(currentIndex){
    this.version.variables.splice(currentIndex,1);
  }


}









