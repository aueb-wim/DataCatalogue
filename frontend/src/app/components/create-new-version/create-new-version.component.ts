import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";



@Component({
  selector: 'app-create-new-version',
  templateUrl: './create-new-version.component.html',
  styleUrls: ['./create-new-version.component.css']
})
export class CreateNewVersionComponent implements OnInit, AfterViewInit {

  versionToUpdate: any;
  hospital: any;
  sampleFileName: string;
  disabledInput: boolean;

  newVarFile: string;
  newVarName: string;
  newVarCode: string;
  newVarType: string;
  newVarValues: string;
  newVarUnit: string;
  newVarCanBeNull: string;
  newVarDescription: string;
  newVarComments: string;
  newVarConceptPath: string;
  newVarMethodology: string;
  newVarMapFunction: string;
  newVarMapCDE: string;

  editVarFile: string;
  editVarName: string;
  editVarCode: string;
  editVarType: string;
  editVarValues: string;
  editVarUnit: string;
  editVarCanBeNull: string;
  editVarDescription: string;
  editVarComments: string;
  editVarConceptPath: string;
  editVarMethodology: string;
  editVarMapFunction: string;
  editVarMapCDE: string;
  ////////////////////////
  randomFunction: Array<any>;
  //functions = new Array;
  versionName: string;

  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.hospitalService.getLatestVersionByHospitalId(+params['hospital_id']))
      .subscribe(versions => {
        this.versionToUpdate = versions
      });
    this.route.params
      .switchMap((params: Params) => this.hospitalService.getHospitalById(+params['hospital_id']))
      .subscribe(h => {
        this.hospital = h
      });

    //////////////////////////////////////
    //this.hospitalService.getRandomFunction().subscribe(rf=>{this.randomFunction = rf})
  }

  ngAfterViewInit(): void {
    this.createSampleFileName();

    for (let variable of this.versionToUpdate.variables) {
      variable.mapFunction = "";
      variable.mapCDE = "";
    }
  }


  saveNewVersion(): void {
    this.createNewVersionName();
    this.hospitalService.createNewVersion(this.hospital["name"], this.versionName, this.versionToUpdate).subscribe(
      data=>{
        window.alert("Version created successfully.");
        this.location.back();
      },
      error => {
        if(error.status=='401'){
          alert("You need to be logged in to complete this action.");
        }else{
          alert("An error has occurred.");
        }});

  };

  goBack(){
    this.location.back();
  }
  uploadFile(){
//this.location.go(this.location.path()+'/'+this.sampleFileName);
    window.location.href = this.location.path()+'/'+this.sampleFileName;
  }


  createSampleFileName() {
    var oldName = parseInt(this.versionToUpdate.name.replace('v', ''));
    oldName = oldName + 1;
    this.sampleFileName = this.hospital.name + "_" + "v" + oldName.toString() + ".xlsx";
  }

  createNewVersionName() {
    var oldName = parseInt(this.versionToUpdate.name.replace('v', ''));
    oldName = oldName + 1;
    this.versionName = "v" + oldName.toString();
  }


  addNewVariable() {
    let newVar = Object.assign(Object.create(this.versionToUpdate.variables[this.versionToUpdate.variables.length - 1]));
    //var newVar: VariableOject={};
    if (this.newVarCode != null) {
      newVar.csvFile = this.ifNullEmptyElseTheSame(this.newVarFile);
      newVar.name = this.ifNullEmptyElseTheSame(this.newVarName);
      newVar.code = this.ifNullEmptyElseTheSame(this.newVarCode);
      newVar.type = this.ifNullEmptyElseTheSame(this.newVarType);
      newVar.values = this.ifNullEmptyElseTheSame(this.newVarValues);
      newVar.unit = this.ifNullEmptyElseTheSame(this.newVarUnit);
      newVar.canBeNull = this.ifNullEmptyElseTheSame(this.newVarCanBeNull);
      newVar.description = this.ifNullEmptyElseTheSame(this.newVarDescription);
      newVar.comments = this.ifNullEmptyElseTheSame(this.newVarComments);
      newVar.conceptPath = this.ifNullEmptyElseTheSame(this.newVarConceptPath);
      newVar.methodology = this.ifNullEmptyElseTheSame(this.newVarMethodology);
      newVar.mapFunction = this.ifNullEmptyElseTheSame(this.newVarMapFunction);
      newVar.mapCDE = this.ifNullEmptyElseTheSame(this.newVarMapCDE);
      this.newVarMapCDE = "";
      this.newVarFile = "";
      this.newVarName = "";
      this.newVarCode = "";
      this.newVarType = "";
      this.newVarValues = "";
      this.newVarUnit = "";
      this.newVarCanBeNull = "";
      this.newVarDescription = "";
      this.newVarComments = "";
      this.newVarConceptPath = "";
      this.newVarMethodology = "";
      this.newVarMapFunction = "";

      this.versionToUpdate.variables.unshift(newVar);
    } else {
      alert("Code cannot be null.");
    }

    //alert("The variable : "+this.newVarName+" was created");
  }

  ifNullEmptyElseTheSame(value) {
    if (value != null) {
      return value;
    } else {
      return "";
    }
  }

  toggleEdit() {
    this.disabledInput = !this.disabledInput;
  }

  deleteVariable(currentIndex) {
    this.versionToUpdate.variables.splice(currentIndex, 1);
  }

  change(element, value) {
    if (element == 1) {
      this.editVarFile = value;
    } else if (element == 2) {
      this.editVarName = value;
    } else if (element == 3) {
      this.editVarCode = value;
    } else if (element == 4) {
      this.editVarType = value;
    } else if (element == 5) {
      this.editVarValues = value;
    } else if (element == 6) {
      this.editVarUnit = value;
    } else if (element == 7) {
      this.editVarCanBeNull = value;
    } else if (element == 8) {
      this.editVarDescription = value;
    } else if (element == 9) {
      this.editVarComments = value;
    } else if (element == 10) {
      this.editVarConceptPath = value;
    } else if (element == 11) {
      this.editVarMethodology = value;
    } else if (element == 12) {
      this.editVarMapFunction = value;
    } else if (element == 13) {
      this.editVarMapCDE = value;
    }
  }

  saveVariable(currentIndex) {
    if (this.editVarName != null) {
      this.versionToUpdate.variables[currentIndex].name = this.editVarName;
      this.editVarName = null;
    }
    if (this.editVarCode != null) {
      this.versionToUpdate.variables[currentIndex].code = this.editVarCode;
      this.editVarCode = null;
    }
    if (this.editVarFile != null) {
      this.versionToUpdate.variables[currentIndex].csvFile = this.editVarFile;
      this.editVarFile = null;
    }
    if (this.editVarType != null) {
      this.versionToUpdate.variables[currentIndex].type = this.editVarType;
      this.editVarType = null;
    }
    if (this.editVarValues != null) {
      this.versionToUpdate.variables[currentIndex].values = this.editVarValues;
      this.editVarValues = null;
    }
    if (this.editVarUnit != null) {
      this.versionToUpdate.variables[currentIndex].unit = this.editVarUnit;
      this.editVarUnit = null;
    }
    if (this.editVarCanBeNull != null) {
      this.versionToUpdate.variables[currentIndex].canBeNull = this.editVarCanBeNull;
      this.editVarCanBeNull = null;
    }
    if (this.editVarDescription != null) {
      this.versionToUpdate.variables[currentIndex].description = this.editVarDescription;
      this.editVarDescription = null;
    }
    if (this.editVarComments != null) {
      this.versionToUpdate.variables[currentIndex].comments = this.editVarComments;
      this.editVarComments = null;
    }
    if (this.editVarConceptPath != null) {
      this.versionToUpdate.variables[currentIndex].conceptPath = this.editVarConceptPath;
      this.editVarConceptPath = null;
    }
    if (this.editVarMethodology != null) {
      this.versionToUpdate.variables[currentIndex].methodology = this.editVarMethodology;
      this.editVarMethodology = null;
    }
    if (this.editVarMapFunction != null) {
      this.versionToUpdate.variables[currentIndex].mapFunction = this.editVarMapFunction;
      this.editVarMapFunction = null;
    } else {
      this.versionToUpdate.variables[currentIndex].mapFunction = "";
      this.editVarMapFunction = null;
    }
    if (this.editVarMapCDE != null) {
      this.versionToUpdate.variables[currentIndex].mapCDE = this.editVarMapCDE;
      this.editVarMapCDE = null;
    } else {
      this.versionToUpdate.variables[currentIndex].mapCDE = "";
      this.editVarMapCDE = null;
    }

  }


}

interface VariableOject {
  //[key: string]: any
  [s: string]: string;
}

