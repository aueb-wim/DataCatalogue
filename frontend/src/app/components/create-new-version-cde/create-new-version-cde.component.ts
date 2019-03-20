import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-create-new-version-cde',
  templateUrl: './create-new-version-cde.component.html',
  styleUrls: ['./create-new-version-cde.component.css']
})
export class CreateNewVersionCdeComponent implements OnInit {

  sampleFileName: string;
  disabledInput: boolean;
  latestCDEVersion:any;
  versionName: string;

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




  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.hospitalService.getLatestCDEVersion().subscribe(cde=>{this.latestCDEVersion = cde});
  }


  ngAfterViewInit(): void {
    this.createSampleFileName();

  }


  saveNewVersion(): void {
    this.createNewVersionName();
    this.hospitalService.createNewVersionCde(this.versionName, this.latestCDEVersion).subscribe(
      data => {
        window.alert("Version created successfully.");
        this.location.back();
      },
      error => {
        if (error.status == '401') {
          alert("You need to be logged in to complete this action.");
        } else {
          alert("An error has occurred.");
        }
      });

  };

  goBack() {
    this.location.back();
  }

  uploadFile() {
    window.location.href = this.location.path() + '/' + this.sampleFileName;
      // works
     // window.location.href = this.location.path() + '/new-version/' + this.downloadName+this.currentVersionName+'.xlsx';
  }


  createSampleFileName() {
    var oldName = parseInt(this.latestCDEVersion.name.replace('v', ''));
    oldName = oldName + 1;
    this.sampleFileName = "cdes_v" + oldName.toString() + ".xlsx";
  }

  createNewVersionName() {
    var oldName = parseInt(this.latestCDEVersion.name.replace('v', ''));
    oldName = oldName + 1;
    this.versionName = "v" + oldName.toString();
  }


  addNewVariable() {
    let newVar = Object.assign(Object.create(this.latestCDEVersion.cdevariables[this.latestCDEVersion.cdevariables.length - 1]));
    //var newVar: VariableOject={};
    if (this.checkIfCoceprPathIsValid(this.newVarConceptPath) && this.checkIfCodeIsNull(this.newVarCode)) {

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

      this.latestCDEVersion.cdevariables.unshift(newVar);
    }

    //alert("The variable : "+this.newVarName+" was created");
  }

  checkIfCoceprPathIsValid(conceptPath) {
    if (conceptPath == null || conceptPath == 'undefined' || conceptPath == "") {
      return true;
    } else if (conceptPath.startsWith("/root")) {
      return true;
    } else {
      alert("Invalid concept path. It should start with: /root\nAll empty concept paths are mapped to /root");
      return false;
    }
  }

  checkIfCodeIsNull(code) {
    if (code != null && code != "") {
      return true;
    } else {
      alert("Code cannot be null.");
      return false;
    }
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
    this.latestCDEVersion.cdevariables.splice(currentIndex, 1);
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
    }
  }

  saveVariable(currentIndex) {
    if (this.editVarName != null) {
      this.latestCDEVersion.cdevariables[currentIndex].name = this.editVarName;
      this.editVarName = null;
    }
    if (this.editVarCode != null) {
      this.latestCDEVersion.cdevariables[currentIndex].code = this.editVarCode;
      this.editVarCode = null;
    }
    if (this.editVarFile != null) {
      this.latestCDEVersion.cdevariables[currentIndex].csvFile = this.editVarFile;
      this.editVarFile = null;
    }
    if (this.editVarType != null) {
      this.latestCDEVersion.cdevariables[currentIndex].type = this.editVarType;
      this.editVarType = null;
    }
    if (this.editVarValues != null) {
      this.latestCDEVersion.cdevariables[currentIndex].values = this.editVarValues;
      this.editVarValues = null;
    }
    if (this.editVarUnit != null) {
      this.latestCDEVersion.cdevariables[currentIndex].unit = this.editVarUnit;
      this.editVarUnit = null;
    }
    if (this.editVarCanBeNull != null) {
      this.latestCDEVersion.cdevariables[currentIndex].canBeNull = this.editVarCanBeNull;
      this.editVarCanBeNull = null;
    }
    if (this.editVarDescription != null) {
      this.latestCDEVersion.cdevariables[currentIndex].description = this.editVarDescription;
      this.editVarDescription = null;
    }
    if (this.editVarComments != null) {
      this.latestCDEVersion.cdevariables[currentIndex].comments = this.editVarComments;
      this.editVarComments = null;
    }
    if (this.editVarConceptPath != null && this.checkIfCoceprPathIsValid(this.editVarConceptPath)) {
      this.latestCDEVersion.cdevariables[currentIndex].conceptPath = this.editVarConceptPath;
      this.editVarConceptPath = null;
    }
    if (this.editVarMethodology != null) {
      this.latestCDEVersion.cdevariables[currentIndex].methodology = this.editVarMethodology;
      this.editVarMethodology = null;
    }

  }
}
