import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {IOption,} from "ng-select";
import {MappingVisualComponent} from "../../visuals/mapping-visual/mapping-visual.component";



@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class HospitalDetailsComponent implements OnInit, OnChanges, AfterViewInit{

  variableOptions: Array<IOption> = [{label: '', value: ''}];
  versionOptions: Array<IOption> = [{label: '', value: ''}];
  categoryOptions: Array<IOption> = [{label: '', value: ''}];
  currentVersionIndex;
  value: any = {};
  disabled = false;
  diagramOpen = false;
  hospitalVersions: Array<any>;
  hospital: any;
  url = this.location.path();
  //currentVersionId = 4; /// be careful when changing the database , it should be assigned to an existing id

  currentVersionId:number;
  currentVersionName:string;
  currentVersionVariables;
  currentBatchReport;
  currentVersionNumber:number;
  currentHospitalName:string;
  currentVersion;
  currentJsonMetadata;

  downloadName = "variables_";
  searchTermVar: string = "";
  searchTermCategory: string="";
  viewInitialized: boolean;
  reportOpen = false;
  @ViewChild(MappingVisualComponent) mappingVisual:MappingVisualComponent;

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location, private router: Router) {

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
        this.currentVersion = lastVersion;
        this.currentJsonMetadata = lastVersion['jsonString'];
        this.currentVersionId = +lastVersion['version_id'];
        this.currentVersionName = lastVersion['name'];
        this.currentVersionVariables = lastVersion['variables'];
        this.currentBatchReport = lastVersion['batchReports'];
        this.currentVersionNumber = +lastVersion['name'][1];
        this.variableOptions = this.arrayIterationByLabel(lastVersion['variables']);
        this.categoryOptions = this.arrayIterationCategoryOptions(lastVersion['variables'],lastVersion['cdevariables']);
        if(lastVersion['cdevariables'] != null && lastVersion['cdevariables'] != 'undefined'){
          this.appendToVariableOptions(lastVersion['cdevariables'])
        }
        this.currentVersionIndex = versions.length-1;
        //////////////added
        this.versionOptions = this.arrayIterationByVersionName(versions);
      });

    this.route.params.switchMap((params: Params) => this.hospitalService.getHospitalById(+params['hospital_id'])).subscribe(hosp => {
      this.downloadName = hosp['name']+'_';
      this.currentHospitalName = hosp['name'];
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
          this.hospitalVersions = versions;
          let lastVersion = versions[versions.length-1];
          this.currentVersion = lastVersion;
          this.currentJsonMetadata = lastVersion['jsonString'];
          this.currentVersionId = +lastVersion['version_id'];
          this.currentVersionName = lastVersion['name'];
          this.currentVersionVariables = lastVersion['variables'];
          this.currentBatchReport = lastVersion['batchReports'];
          this.currentVersionNumber = +lastVersion['name'][1];
          //////////////added
          //this.versionOptions = this.arrayIterationByVersionName(versions);
        });

      this.route.params.switchMap((params: Params) => this.hospitalService.getHospitalById(+params['hospital_id'])).subscribe(hosp => {
        this.hospital = hosp;
        this.currentHospitalName = hosp['name'];
      });

    }

  }
  public arrayIterationByLabel(originalArray) {
    //empty the array first
    //this.variableOptions.length = 0;
    let finalArray: Array<IOption> = [{label: '', value: ''}];
    for (let obj of originalArray) {
      if(obj['code']!=null && obj['variable_id']!=null){
        finalArray.push({label: obj['code'].toString(), value: obj['variable_id'].toString()});
      }

    }
    return finalArray;
  }

  public appendToVariableOptions(arrayToIterate){
    console.log("variable options : ",this.variableOptions);
    console.log("inside append.variable options size: ",this.variableOptions.length);
    for (let obj of arrayToIterate) {
      if(obj['code']!=null && obj['cdevariable_id']!=null){
        this.variableOptions.push({label: obj['code'].toString(), value: obj['cdevariable_id'].toString()});
      }

    }
    console.log("Final variable options size: ",this.variableOptions.length);
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

  public versionSelected(option: IOption): void {
    this.currentVersionName = option.label;
    this.currentVersionId = +option.value;
    this.currentVersionIndex = this.versionOptions.indexOf(option)-1;

    let lastVersion = this.hospitalVersions[this.currentVersionIndex];
    this.currentVersion = lastVersion;
    this.currentJsonMetadata = lastVersion['jsonString'];
    this.currentVersionVariables = lastVersion['variables'];
    this.currentBatchReport = lastVersion['batchReports'];
    this.currentVersionNumber = +lastVersion['name'][1];
    this.categoryOptions = this.arrayIterationCategoryOptions(lastVersion['variables'],lastVersion['cdevariables']);

    this.variableOptions = this.arrayIterationByLabel(this.hospitalVersions[this.currentVersionIndex]['variables']);
    if(this.hospitalVersions[this.currentVersionIndex]['cdevariables'] != null && this.hospitalVersions[this.currentVersionIndex]['cdevariables'] != 'undefined'){
      this.appendToVariableOptions(this.hospitalVersions[this.currentVersionIndex]['cdevariables'])
    }
    this.searchTermVar = '';

  }

  public versionDeselected(option: IOption): void {

  }
  public versionFilterInputChanged(option: IOption): void {

  }
  /** Method that extracts the second part of the concept path of the each variables (this is our category) and adds
   * each unique occurrence in a list that is returned*/

  arrayIterationCategoryOptions(variables, cdevariables){
    let finalArray: Array<IOption> = [{label: '', value: ''}];
   finalArray = this.arrayIteration(variables,finalArray);
   console.log("cde variables: "+cdevariables);
   if(!cdevariables.isEmpty && cdevariables != null && cdevariables != 'null'){
     finalArray = this.arrayIteration(cdevariables,finalArray);
   }
    return finalArray;
  }

  arrayIteration(variables, finalArray){
    for(let variable of variables){
      let category;
      console.log("concept path: "+variable['conceptPath']);
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

  goBack(): void {
    this.location.back();
  }

  newVersionUrl(){

      //this.router.navigateByUrl('/hospitals/'+this.hospital['hospital_id']+'/new-version');
    window.location.href = this.location.path() + '/new-version';
  }
}
