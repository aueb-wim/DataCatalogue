import {Component, Input, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-version-details',
  templateUrl: './version-details.component.html',
  styleUrls: ['./version-details.component.css']
})
export class VersionDetailsComponent implements OnInit {
  @Input('version_id') versionId;
  version:any;

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.hospitalService.getVersionById(this.versionId)
      .subscribe(ver=>this.version = ver);
    //this.route.params
      //.switchMap((params: Params) => this.hospitalService.getVersionById(+params['version_id']))
      //.subscribe(ver => this.version = ver);

  }

  goBack(): void {
    this.location.back();
  }

}









