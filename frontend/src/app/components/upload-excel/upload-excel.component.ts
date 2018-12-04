import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {

  constructor(private hospitalService: HospitalService) { }
  excelSample:any;

  ngOnInit() {
    this.hospitalService.getExcelSample().subscribe(data => {this.excelSample = data;});
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
    //const c = JSON.stringify(this.jsonMetadata);
    //const file = new Blob([c], {type: 'text/json'});
    //this.download(file,this.downloadName+this.versionName+".json");
  }
}
