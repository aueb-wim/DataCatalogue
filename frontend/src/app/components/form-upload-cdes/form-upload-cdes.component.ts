import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HospitalService} from "../../shared/hospital.service";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";

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

  constructor(private hospitalService: HospitalService, private http: HttpClient) { }

  ngOnInit() {}


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.hospitalService.pushFileToStorageCDE(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log('File is completely uploaded!');
        alert("File Uploaded Successfully!!")

      }
    },error => {
      if(error.status=='401'){
        alert("You need to be logged in to complete this action.");
      }else{
        //alert("You need to be logged in to complete this action2.");
        //alert("You need to be logged in to complete this action.");
        //alert("exceptionResponse:"+error.message+"error with status:--"+error.status+" and message:--"+error.message+" and details:"+error.details)
        //alert("Error Occurred:\n"+error.error.message+"\n"+error.error.details+"\n"+error.error.hint+"\n"+error.error.nextActions+"\n"+error.error.support)
        alert("Error Occurred:\n"+error.error)

      }},



    this.selectedFiles = undefined);
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
