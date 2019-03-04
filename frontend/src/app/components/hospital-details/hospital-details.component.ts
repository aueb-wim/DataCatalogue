import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {IOption,} from "ng-select";
import {MappingVisualComponent} from "../../visuals/mapping-visual/mapping-visual.component";



@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HospitalDetailsComponent implements OnInit, OnChanges, AfterViewInit{

  myOptions2: Array<IOption> = [{label: '', value: ''}];
  value: any = {};
  disabled = false;
  diagramOpen = false;
  hospitalVersions: Array<any>;
  hospital: any;
  url = this.location.path();
  //currentVersionId = 4; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionId:number;
  currentVersionName;
  downloadName = "variables_";
  searchTermVar: String = "";
  viewInitialized: boolean;
  reportOpen = false;
  newVersion = false;
  @ViewChild(MappingVisualComponent) mappingVisual:MappingVisualComponent;

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {

   // this.route.params.switchMap((params: Params) => this.hospitalService.getlatestVersionIdByHospId(+params['hospital_id'])).subscribe(verId => {
     // this.currentVersionId = verId
    //});

    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
      .subscribe(versions => {
        this.hospitalVersions = versions;
        let lastVersion = versions[versions.length-1];
        this.currentVersionId = +lastVersion['version_id'];
      });

    this.route.params.switchMap((params: Params) => this.hospitalService.getHospitalById(+params['hospital_id'])).subscribe(hosp => {
      this.hospital = hosp
    });


  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    //this.currentVersionId = parseInt(document.getElementById('inner').getAttribute("selectedIndex"));

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentVersionId']) {
      this.route.params
        .switchMap((params: Params) => this.hospitalService.getVersionsByHospitalId(+params['hospital_id']))
        .subscribe(versions => {
          this.hospitalVersions = versions
        });

      this.route.params.switchMap((params: Params) => this.hospitalService.getHospitalById(+params['hospital_id'])).subscribe(hosp => {
        this.hospital = hosp
      });


    }
  }

  public openMappings(){
    console.log("Opening mappings with versionId: "+this.currentVersionId);
    this.mappingVisual.handleChart2(this.currentVersionName,this.reportOpen,this.currentVersionId,this.diagramOpen);
  }
  public selected(option: IOption): void {
    this.searchTermVar = option.label;
  }


  public deselected(option: IOption): void {
    this.searchTermVar = "";
  }
  public filterInputChanged(option: IOption): void{
    this.searchTermVar = option.label;
  }

  public arrayIterationByLabel(originalArray) {
    //empty the array first
    this.myOptions2.length = 0;
    for (let obj of originalArray) {
      if(obj['code']!=null && obj['variable_id']!=null){
        this.myOptions2.push({label: obj['code'].toString(), value: obj['variable_id'].toString()});
      }

    }
    return this.myOptions2;
  }


  createSampleFileName() {
    var oldName = parseInt(this.hospitalVersions[this.hospitalVersions.length - 1].name.replace('v', ''));
    oldName = oldName + 1;
    return this.hospital.name + "_" + "v" + oldName.toString() + ".xlsx";
  }

  changeVersionId(verId) {
    this.currentVersionId = verId;
  }

  changeVersionName(verName) {
    this.currentVersionName = verName;
  }

  tabChanged(event) {
    this.changeVersionId(this.hospitalVersions[event.index].version_id);
    this.changeVersionName(event.tab.textLabel);
    this.searchTermVar = "";
  }

  addTab() {
    let ver = Object.assign(Object.create(this.hospitalVersions[1]));
    this.hospitalVersions.push(ver);
    this.newVersion = true;

  }



  goBack(): void {
    this.location.back();
  }
}
