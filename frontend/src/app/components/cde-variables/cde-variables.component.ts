import {AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {IOption} from "ng-select";
import {DeviceDetectorService} from "ngx-device-detector";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cde-variables',
  templateUrl: './cde-variables.component.html',
  styleUrls: ['./cde-variables.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class CdeVariablesComponent implements OnInit, OnChanges, AfterViewInit {
  allCdeVersions: Array<any>;
  searchTermVer: String;
  diagramOpen = false;
  jsonMetadata: any;
  jsonVisualizable: any;
  //currentVersionId = 2; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionId;
  currentVersionName;
  currentVersion;
  currentJsonMetadata;
  downloadName = "cdes_";
  searchTermVar: string;
  searchTermCategory: string;
  disabled = false;
  variableOptions: Array<IOption> = [{label: '', value: ''}];
  versionOptions: Array<IOption> = [{label: '', value: ''}];
  categoryOptions: Array<IOption> = [{label: '', value: ''}];
  enabled = "active";
  deviceInfo = null;
  currentVersionIndex=0;

  constructor(private hospitalService: HospitalService, private deviceService: DeviceDetectorService, private location: Location,private router: Router) {
  }

  ngOnInit() {
    this.hospitalService.getAllCdeVersions().subscribe(allVersions => {
      this.allCdeVersions = allVersions;
      let lastVersion = allVersions[allVersions.length-1];
      this.currentVersion = lastVersion;
      this.currentJsonMetadata = lastVersion['jsonString'];
      this.currentVersionId = +lastVersion['version_id'];
      this.currentVersionName = lastVersion['name'];
      //this.variableOptions = this.arrayIterationByLabel(lastVersion['cdevariables']);
      this.variableOptions = this.arrayIterationByLabel(lastVersion['cdevariables']);
      this.categoryOptions = this.arrayIterationCategoryOptions(lastVersion['cdevariables']);
      this.currentVersionIndex = allVersions.length-1;

      this.versionOptions = this.arrayIterationByVersionName(allVersions);
     // this.jsonVisualizable = lastVersion['jsonStringVisualizable'];

    });
   // this.hospitalService.getjsonStringVisualizableByVersionId(this.currentVersionId).subscribe(json => {
   //   this.jsonVisualizable = json
  //  });

  }

  ngOnChanges(changes: SimpleChanges) {
   // if (changes['currentVersionId']) {
    //  this.hospitalService.getJsonStringByVersionId(this.currentVersionId).subscribe(json => {
    //    this.jsonMetadata = json
    //  });
  //  }
  }

  ngAfterViewInit(){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (!(this.deviceInfo['browser'] == "Chrome" || this.deviceInfo['browser'] == "MS-Edge") || !this.deviceService.isDesktop()) {
      window.alert("Currently the application is available for Google " +
        "Chrome and Microsoft Edge browsers on Desktop Devices.");
      this.enabled = "inactive";
    }

  }
  changeVersionId(verId) {
    this.currentVersionId = verId;
  }

  changeVersionName(verName) {
    this.currentVersionName = verName;
  }

  tabChanged(event) {
    this.changeVersionId(this.allCdeVersions[event.index].version_id);
    this.changeVersionName(event.tab.textLabel);
    this.searchTermVar = "";
  }

  createSampleFileName() {
    if(typeof this.allCdeVersions == 'undefined'){
      console.log("allcdeversions is undefined");
    }
      var oldName = parseInt(this.allCdeVersions[this.allCdeVersions.length - 1].name.replace('v', ''));
      oldName = oldName + 1;
      return "cdes_v" + oldName.toString() + ".xlsx";
  }

  public selected(option: IOption): void {
    this.searchTermVar = option.label;
  }

  public deselected(option: IOption): void {
    this.searchTermVar = '';
  }

  public filterInputChanged(option: IOption): void {
    this.searchTermVar = option.label;
  }

  public arrayIterationByLabel(originalArray) {
    //empty the array first
    //this.variableOptions.length = 0;
    let finalArray: Array<IOption> = [{label: '', value: ''}];
    for (let obj of originalArray) {
      finalArray.push({label: obj['code'].toString(), value: obj['cdevariable_id'].toString()});
    }
    return finalArray;
  }

  public arrayIterationByVersionName(originalArray) {
    //empty the array first
    //this.versionOptions.length = 0;
    let finalArray: Array<IOption> = [{label: '', value: ''}];
    for (let obj of originalArray) {
      finalArray.push({label: obj['name'].toLowerCase().toString(), value: obj['version_id'].toString()});
    }
    return finalArray;
  }

  /** Method that extracts the second part of the concept path of the each variables (this is our category) and adds
   * each unique occurrence in a list that is returned*/

  arrayIterationCategoryOptions(variables){
    let finalArray: Array<IOption> = [{label: '', value: ''}];
    for(let variable of variables){

      //let category = variable['conceptPath'].split("/",3)[2];
      let category;
      if(variable['conceptPath'] != null && variable['conceptPath'].split("/",4)[3] !=null){
        category = variable['conceptPath'].split("/",4)[2];
      }else{
        category = '';
      }
      let contained = true;
      for(let i = 0; i<finalArray.length;i++){
        if(finalArray[i].label != category){
          contained = false;
        }else{
          //if we find just one occurrence then we don't have to search any longer.
          contained = true;
          break;
        }
      }
      if(contained==false){
        console.log("adding category: "+category);
        finalArray.push({label: category.toLowerCase(), value: ""});

      }
    }
    return finalArray;
  }
  categorySelected(option: IOption) {
    this.searchTermCategory = option.label;
  }

  categoryDeselected(option: IOption):void{
    this.searchTermCategory = "";
  }

  goBack(): void {
    this.location.back();
  }

  newVersionUrl(){

   // works
   // window.location.href = this.location.path() + '/new-version/' + this.downloadName+this.currentVersionName+'.xlsx';

    //test
    window.location.href = this.location.path() + '/new-cde-version';


  }


  public versionSelected(option: IOption): void {
    this.currentVersionName = option.label;
    this.currentVersionId = +option.value;
    this.currentVersionIndex = this.versionOptions.indexOf(option)-1;


    let lastVersion = this.allCdeVersions[this.currentVersionIndex];
    this.currentVersion = lastVersion;
    this.currentJsonMetadata = lastVersion['jsonString'];

    this.variableOptions = this.arrayIterationByLabel(this.allCdeVersions[this.currentVersionIndex]['cdevariables']);
    this.categoryOptions = this.arrayIterationCategoryOptions(lastVersion['cdevariables']);
    this.searchTermVar = '';

  }

  public versionDeselected(option: IOption): void {

  }
  public versionFilterInputChanged(option: IOption): void {

  }


}
