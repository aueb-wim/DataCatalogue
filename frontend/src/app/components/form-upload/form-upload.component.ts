import {Component, Input, OnInit} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {HospitalService} from "../../shared/hospital.service";
import {Observable} from "rxjs";
import { saveAs } from 'file-saver';


@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  @Input("sampleNameVersion") sampleNameVersion;
  @Input("cdeInstructions") cdeInstructions;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  sampleFile: Observable<string>;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {}


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.hospitalService.pushFileToStorageVariable(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert("File Uploaded Successfully!!")
      }

    },error => {
      if(error.status=='401'){
        alert("You need to be logged in to complete this action.");
      }else{
        //alert("You need to be logged in to complete this action2.");
        //alert("You need to be logged in to complete this action.");
        alert("Error Occurred:\n"+error.error)
      }});

    this.selectedFiles = undefined;
  }

  download() {
    this.hospitalService.getSample(this.sampleNameVersion)
      .subscribe(
        data=>{
          console.log("sample data is: "+data);
          saveAs(new Blob([data], {type: 'application/vnd.ms-excel' }),this.sampleNameVersion+ '.xlsx');

           console.log('XLSX template downloaded...');
        },
        error => {
          if(error.status=='401'){
            alert("You need to be logged in to complete this action.");
          }else{
            //alert("You need to be logged in to complete this action2.");
            alert("alert"+error.status);

          }});


  }
}
