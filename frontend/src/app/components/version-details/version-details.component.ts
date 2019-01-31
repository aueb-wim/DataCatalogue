import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-version-details',
  templateUrl: './version-details.component.html',
  styleUrls: ['./version-details.component.css']
})
export class VersionDetailsComponent implements OnInit,OnChanges {
  @Input('versionId') versionId;
  @Input('versionName') versionName;
  @Input('downloadFileName') downloadName;
  @Input('cdeData') cdeData;
  @Input('searchTermVar') searchTermVar:String;
  @Input() editable?: boolean;
  version:any;
  jsonMetadata:any;
  disabledInput:boolean;

  newVarFile:string;
  newVarName:string;
  newVarCode:string;
  newVarType:string;
  newVarValues:string;
  newVarUnit:string;
  newVarCanBeNull:string;
  newVarDescription:string;
  newVarComments:string;
  newVarConceptPath:string;
  newVarMethodology:string;
  newVarMapFunction:string;
  newVarMapCDE:string;

  editVarFile:string;
  editVarName:string;
  editVarCode:string;
  editVarType:string;
  editVarValues:string;
  editVarUnit:string;
  editVarCanBeNull:string;
  editVarDescription:string;
  editVarComments:string;
  editVarConceptPath:string;
  editVarMethodology:string;
  editVarMapFunction:string;
  editVarMapCDE:string;

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    //this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});
    //this.route.params
    //.switchMap((params: Params) => this.hospitalService.getVersionById(+params['versionId']))
     // .subscribe(ver => this.version = ver);
    //this.hospitalService.getJsonStringByVersionId(this.versionId).subscribe(json=>{this.jsonMetadata=json});
    //this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});

//alert("editable? "+this.editable)
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['versionId']) {
      this.hospitalService.getJsonStringByVersionId(this.versionId).subscribe(json=>{this.jsonMetadata=json});
      this.hospitalService.getVersionById(this.versionId).subscribe(ver=>{this.version = ver});

    }

  }

  goBack(): void {
    this.location.back();
  }

  download(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(blob, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  exportJson(): void {
    const c = JSON.stringify(this.jsonMetadata);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file,this.downloadName+this.versionName+".json");
  }

  addNewVariable(){
    let newVar = Object.assign(Object.create(this.version.variables[this.version.variables.length-1]));
    newVar.csvFile = this.newVarFile;
    newVar.name = this.newVarName;
    newVar.code = this.newVarCode;
    newVar.type = this.newVarType;
    newVar.values = this.newVarValues;
    newVar.unit = this.newVarUnit;
    newVar.canBeNull = this.newVarCanBeNull;
    newVar.description = this.newVarDescription;
    newVar.comments = this.newVarComments;
    newVar.conceptPath = this.newVarConceptPath;
    newVar.methodology = this.newVarMethodology;
    this.version.variables.unshift(newVar);
    //alert("The variable : "+this.newVarName+" was created");
  }


  toggleEdit(){
   this.disabledInput = !this.disabledInput;
  }

  deleteVariable(currentIndex){
    this.version.variables.splice(currentIndex,1);
  }

  change(element, value){
      if(element == 1){
        this.editVarFile = value;
    }else if(element == 2){
        this.editVarName = value;
      }else if(element == 3){
        this.editVarCode = value;
      }else if(element == 4){
        this.editVarType = value;
    }else if(element == 5){
        this.editVarValues = value;
    }else if(element == 6){
        this.editVarUnit = value;
    }else if(element == 7){
        this.editVarCanBeNull = value;
    }else if(element == 8){
        this.editVarDescription = value;
    }else if(element == 9){
        this.editVarComments = value;
    }else if(element == 10){
        this.editVarConceptPath = value;
    }else if(element == 11){
        this.editVarMethodology = value;

    }
  }

  saveVariable(currentIndex){
    if(this.editVarName != null){
      this.version.variables[currentIndex].name = this.editVarName;
      this.editVarName = null;
    }
    if(this.editVarCode != null){
      this.version.variables[currentIndex].code = this.editVarCode;
      this.editVarCode = null;
    }
    if(this.editVarFile != null){
      this.version.variables[currentIndex].csvFile = this.editVarFile;
      this.editVarFile = null;
    }
    if(this.editVarType != null){
      this.version.variables[currentIndex].type = this.editVarType;
      this.editVarType = null;
    }
    if(this.editVarValues != null){
      this.version.variables[currentIndex].values = this.editVarValues;
      this.editVarValues = null;
    }
    if(this.editVarUnit != null){
      this.version.variables[currentIndex].unit = this.editVarUnit;
      this.editVarUnit = null;
    }
    if(this.editVarCanBeNull != null){
      this.version.variables[currentIndex].canBeNull = this.editVarCanBeNull;
      this.editVarCanBeNull = null;
    }
    if(this.editVarDescription != null){
      this.version.variables[currentIndex].description = this.editVarDescription;
      this.editVarDescription = null;
    }
    if(this.editVarComments != null){
      this.version.variables[currentIndex].comments = this.editVarComments;
      this.editVarComments = null;
    }
    if(this.editVarConceptPath != null){
      this.version.variables[currentIndex].conceptPath = this.editVarConceptPath;
      this.editVarConceptPath = null;
    }
    if(this.editVarMethodology != null){
      this.version.variables[currentIndex].methodology = this.editVarMethodology;
      this.editVarMethodology = null;
    }

  }
}









