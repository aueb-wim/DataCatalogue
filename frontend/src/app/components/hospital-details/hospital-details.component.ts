import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {MappingVisualComponent} from "../../visuals/mapping-visual/mapping-visual.component";

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalDetailsComponent implements OnInit,OnChanges{


  diagramOpen=false;
  hospitalVersions:Array<any>;
  hospital:any;
  url=this.location.path();
  currentVersionId=3; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionName;
  downloadName = "variables_";
  searchTermVar:String;
  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
      .subscribe(versions => {this.hospitalVersions = versions});

    this.route.params.switchMap((params: Params) => this.hospitalService.
    getHospitalById(+params['hospital_id'])).subscribe(hosp=>{this.hospital = hosp});
    this.currentVersionId = 3; //check this


  }




 // ngAfterViewInit() {
  //  this.hierarchical = this.child.hierarchical;
 // }

  ngOnChanges(changes: SimpleChanges){
    if (changes['currentVersionId']) {
      this.route.params
        .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
        .subscribe(versions => {this.hospitalVersions = versions});

      this.route.params.switchMap((params: Params) => this.hospitalService.
      getHospitalById(+params['hospital_id'])).subscribe(hosp=>{this.hospital = hosp});


    }
    //if (changes['hierarchical']) {
     // this.hierarchical = this.child.hierarchical;
    //}
  }

  createSampleFileName(){
    var oldName = parseInt(this.hospitalVersions[this.hospitalVersions.length-1].name.replace('v', ''));
    oldName = oldName + 1;
    return this.hospital.name+"_"+"v"+oldName.toString()+".xlsx";
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


  goBack(): void {
    this.location.back();
  }
}
