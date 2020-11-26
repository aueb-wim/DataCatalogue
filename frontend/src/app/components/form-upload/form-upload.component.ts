import {Component, Input, OnInit} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {HospitalService} from "../../shared/hospital.service";
import {Observable} from "rxjs";
import { saveAs } from 'file-saver';
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  @Input("sampleNameVersion") sampleNameVersion;
  @Input("cdeInstructions") cdeInstructions;
  @Input("hospitalName") hospitalName;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  sampleFile: Observable<string>;
  pathologyName:string;


  constructor(private hospitalService: HospitalService,private route: ActivatedRoute) { }

  ngOnInit() {
    //this.route.params.subscribe(params=> {
    ///    this.pathologyName = params['pathology_name'];
    //  }
  //  );


    this.pathologyName= this.route.snapshot.paramMap.get("pathology_name");

  }

  ngAfterViewInit(): void {
    //this.createSampleFileName(this.params['pathology_name']);
    this.pathologyName= this.route.snapshot.paramMap.get("pathology_name");



  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);

    //////////////////////////////
    this.route.params
      .switchMap((params: Params) => this.hospitalService.pushFileToStorageVariable(params['pathology_name'],params['hospital_name'], this.currentFileUpload)).subscribe(event => {
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
    //////////////////////////////



    /*
    this.hospitalService.pushFileToStorageVariable(this.pathologyName,this.hospitalName, this.currentFileUpload).subscribe(event => {
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
*/
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
