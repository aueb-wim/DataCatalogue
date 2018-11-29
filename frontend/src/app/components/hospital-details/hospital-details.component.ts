import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalDetailsComponent implements OnInit {

  hospitalVersions:Array<any>;
  hospital:any;
  hierarchical=false;
  url=this.location.path();
  currentVersionId=1; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionName;
  downloadName = "variables_";
  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
      .subscribe(versions => {this.hospitalVersions = versions});

    this.route.params.switchMap((params: Params) => this.hospitalService.
    getHospitalById(+params['hospital_id'])).subscribe(hosp=>{this.hospital = hosp});



  }


  changeVersionId(verId){
    this.currentVersionId = verId;
  }

  changeVersionName(verName){
    this.currentVersionName = verName;
  }

  tabChanged(event) {
    this.changeVersionId(this.hospitalVersions[event.index].version_id);
    this.changeVersionName(event.tab.textLabel);
  }

setHierarchical(){
    if(this.hierarchical){
      this.hierarchical = false;
    }else{
      this.hierarchical = true;
    }
}
  goBack(): void {
    this.location.back();
  }
}
