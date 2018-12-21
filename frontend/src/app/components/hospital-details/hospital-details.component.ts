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
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalDetailsComponent implements OnInit,OnChanges,AfterViewInit{
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  usersForm: FormGroup;

  diagramOpen=false;
  hospitalVersions:Array<any>;
  hospital:any;
  url=this.location.path();
  currentVersionId=3; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionName;
  downloadName = "variables_";
  searchTermVar:String;
  viewInitialized:boolean;
  filterDisabled = true;
  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) {

  }
  ngAfterViewInit(){
    this.viewInitialized = true;
  }
  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
      .subscribe(versions => {this.hospitalVersions = versions});

    this.route.params.switchMap((params: Params) => this.hospitalService.
    getHospitalById(+params['hospital_id'])).subscribe(hosp=>{this.hospital = hosp});
    this.currentVersionId = 3; //check this

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
enableFilter(){
    this.filterDisabled = false;
}

 changeSearchTermVar(event){
   this.filterDisabled = true;
    this.searchTermVar = event.target.value;
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
    this.searchTermVar = "";
  }


  goBack(): void {
    this.location.back();
  }
}
