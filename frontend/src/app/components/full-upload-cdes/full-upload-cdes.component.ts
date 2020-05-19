import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-full-upload-cdes',
  templateUrl: './full-upload-cdes.component.html',
  styleUrls: ['./full-upload-cdes.component.css']
})
export class FullUploadCdesComponent implements OnInit {
  uploadFileName:string;
  constructor(private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    this.uploadFileName = this.route.snapshot.paramMap.get("upload_file")
  }
  goBack(){
    this.location.back();
  }
}
