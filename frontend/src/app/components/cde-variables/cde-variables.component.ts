import {AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {IOption} from "ng-select";
import {DeviceDetectorService} from "ngx-device-detector";

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
  downloadName = "cdes_";
  searchTermVar: String;
  disabled = false;
  variableOptions: Array<IOption> = [{label: '', value: ''}];
  versionOptions: Array<IOption> = [{label: '', value: ''}];
  enabled = "active";
  deviceInfo = null;
  currentVersionIndex=0;

  constructor(private hospitalService: HospitalService, private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.hospitalService.getAllCdeVersions().subscribe(allVersions => {
      this.allCdeVersions = allVersions;
      let lastVersion = allVersions[allVersions.length-1];
      this.currentVersionId = +lastVersion['version_id'];
      this.currentVersionName = lastVersion['name'];
      //this.variableOptions = this.arrayIterationByLabel(lastVersion['cdevariables']);
      this.variableOptions = this.arrayIterationByLabel(lastVersion['cdevariables']);
      this.currentVersionIndex = allVersions.length-1;
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
      finalArray.push({label: obj['code'].toLowerCase().toString(), value: obj['cdevariable_id'].toString()});
    }
    return finalArray;
  }

  public arrayIterationByVersionName(originalArray) {
    //empty the array first
    //this.versionOptions.length = 0;
    for (let obj of originalArray) {
      this.versionOptions.push({label: obj['name'].toLowerCase().toString(), value: obj['version_id'].toString()});
    }
    return this.versionOptions;
  }

  public versionSelected(option: IOption): void {
    this.currentVersionName = option.label;
    this.currentVersionId = +option.value;
    this.currentVersionIndex = this.versionOptions.indexOf(option)-1;
    this.variableOptions = this.arrayIterationByLabel(this.allCdeVersions[this.currentVersionIndex]['cdevariables']);
    this.searchTermVar = '';

  }

  public versionDeselected(option: IOption): void {

  }
  public versionFilterInputChanged(option: IOption): void {

  }


}
