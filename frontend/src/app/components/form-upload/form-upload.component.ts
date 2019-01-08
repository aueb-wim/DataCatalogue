import {Component, Input, OnInit} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {HospitalService} from "../../shared/hospital.service";
import {Observable} from "rxjs";


@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  @Input("sampleNameVersion") sampleNameVersion;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  sampleFile: Observable<string>;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.sampleFile = this.hospitalService.getSample();
  }

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
    });

    this.selectedFiles = undefined;
  }

  download() {
    window.open("http://195.251.252.222:2443/mapping/getsample/"+this.sampleNameVersion);
    console.log('XLSX template downloaded...');
  }
}
