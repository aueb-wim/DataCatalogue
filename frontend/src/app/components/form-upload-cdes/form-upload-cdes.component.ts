import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HospitalService} from "../../shared/hospital.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-form-upload-cdes',
  templateUrl: './form-upload-cdes.component.html',
  styleUrls: ['./form-upload-cdes.component.css']
})
export class FormUploadCdesComponent implements OnInit {
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
    this.hospitalService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    },error => {
      if(error.status=='401'){
        alert("You need to be logged in to complete this action.");
      }else{
        //alert("You need to be logged in to complete this action2.");
        //alert("You need to be logged in to complete this action.");
      }});

    this.selectedFiles = undefined;
  }

  download() {
    this.hospitalService.getSample(this.sampleNameVersion)
      .subscribe(
        data=>{
          console.log("sample data is: "+data);
          window.open("http://195.251.252.222:2442/mapping/getsample/"+this.sampleNameVersion);
          console.log('XLSX template downloaded...');
        },
        error => {
          if(error.status=='401'){
            alert("You need to be logged in to complete this action.");
          }else{
            //alert("You need to be logged in to complete this action2.");
            window.open("http://195.251.252.222:2442/mapping/getsample/"+this.sampleNameVersion);
            console.log('XLSX template downloaded...');
          }});


  }

}
