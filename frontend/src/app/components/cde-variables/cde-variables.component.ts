import {AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {IOption} from "ng-select";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-cde-variables',
  templateUrl: './cde-variables.component.html',
  styleUrls: ['./cde-variables.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CdeVariablesComponent implements OnInit, OnChanges, AfterViewInit {
  allCdeVersions: Array<any>;
  searchTermVer: String;
  diagramOpen = false;
  jsonMetadata: any;
  jsonVisualizable: any;
  currentVersionId = 2; /// be careful when changing the database , it should be assigned to an existing id
  currentVersionName;
  downloadName = "cdes_";
  searchTermVar: String;
  disabled = false;
  myOptions2: Array<IOption> = [{label: '', value: ''}];
  enabled = "active";
  deviceInfo = null;

  constructor(private hospitalService: HospitalService, private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.hospitalService.getAllCdeVersions().subscribe(allVersions => {
      this.allCdeVersions = allVersions
    });
    this.hospitalService.getjsonStringVisualizableByVersionId(this.currentVersionId).subscribe(json => {
      this.jsonVisualizable = json
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentVersionId']) {
      this.hospitalService.getJsonStringByVersionId(this.currentVersionId).subscribe(json => {
        this.jsonMetadata = json
      });
    }
  }

  ngAfterViewInit(){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (!(this.deviceInfo['browser'] == "Chrome" || this.deviceInfo['browser'] == "MS-Edge") || !this.deviceService.isDesktop()) {
      window.alert("Currently the application is available for Google " +
        "Chrome and Microsoft Edge browsers on Desktop Devices. Firefox doesn't like animations!");
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
    var oldName = parseInt(this.allCdeVersions[this.allCdeVersions.length - 1].name.replace('v', ''));
    oldName = oldName + 1;
    return "v" + oldName.toString() + ".xlsx";
  }

  public selected(option: IOption): void {
    this.searchTermVar = option.label;

  }


  public deselected(option: IOption): void {
    this.searchTermVar = "";

  }

  public filterInputChanged(option: IOption): void {
    this.searchTermVar = option.label;
  }

  public arrayIterationByLabel(originalArray) {
    //empty the array first
    this.myOptions2.length = 0;
    for (let obj of originalArray) {
      this.myOptions2.push({label: obj['code'].toLowerCase().toString(), value: obj['cdevariable_id'].toString()});
    }
    return this.myOptions2;
  }

}
