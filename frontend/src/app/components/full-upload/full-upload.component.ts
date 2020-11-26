import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-full-upload',
  templateUrl: './full-upload.component.html',
  styleUrls: ['./full-upload.component.css']
})
export class FullUploadComponent implements OnInit {
uploadFileName:string;
hospitalName:string;
pathologyName:string;
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {

    this.uploadFileName = this.route.snapshot.paramMap.get("upload_file");
    this.hospitalName = this.route.snapshot.paramMap.get("hospital_name");

  }
  goBack(){
    this.location.back();
  }
}
