import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css']
})
export class HospitalDetailsComponent implements OnInit {

  hospitalVersions:Array<any>;
  hierarchical=false;
url=this.location.path();

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
      .subscribe(versions => this.hospitalVersions = versions);

  }

  goBack(): void {
    this.location.back();
  }
}
