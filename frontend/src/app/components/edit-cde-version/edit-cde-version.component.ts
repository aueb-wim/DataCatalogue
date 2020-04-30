import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-cde-version',
  templateUrl: './edit-cde-version.component.html',
  styleUrls: ['./edit-cde-version.component.css']
})
export class EditCdeVersionComponent implements OnInit {
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

  pathologyName:string;


  constructor(private hospitalService: HospitalService, private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    //this.hospitalService.getLatestCDEVersion().subscribe(cde=>{this.latestCDEVersion = cde});

    //this.route.params.switchMap((params: Params) => this.hospitalService.getLatestCdeVersionByPathologyName(params['pathology_name'])).subscribe(cde => {
   //   this.latestCDEVersion = cde;
  //  });
    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVersionById(+params['version_id']))
      .subscribe(cdeVersion => {
        this.latestCDEVersion = cdeVersion;
        this.versionName = cdeVersion['name'];});


    this.route.params.subscribe(params=>
      this.createSampleFileName(params['pathology_name']));


    this.route.params.subscribe(params=>
      this.pathologyName = params['pathology_name']);


  }


  ngAfterViewInit(): void {
    //this.createSampleFileName(this.params['pathology_name']);
    this.route.params.subscribe(params=>
      this.createSampleFileName(params['pathology_name']));



  }


  saveChanges(): void {
    //this.createNewVersionName();
    // remove sample variable before saving (get last variable and check if it is has 'sample' as code)
    console.log("last cde version code: " + this.latestCDEVersion.cdevariables[this.latestCDEVersion.cdevariables.length-1].code);
    if(this.latestCDEVersion.cdevariables[this.latestCDEVersion.cdevariables.length-1].code === 'sample'){
      console.log("equality works");
      this.latestCDEVersion.cdevariables.splice(this.latestCDEVersion.cdevariables.length-1, 1);
    }





    this.route.params.switchMap((params: Params) => this.hospitalService.createNewVersionCde(params['pathology_name'],this.versionName,
      this.latestCDEVersion)).subscribe(
      data => {
        alert("Version updated successfully.");
        //this.location.back();
      },
      error => {
        if (error.status == '401') {
          alert("You need to be logged in to complete this action.");
        } else {
          alert("An error has occurred.\n"+error.error);
        }
      });
    /*
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
*/
  };

  goBack() {
    this.location.back();
  }

  uploadFile() {
    window.location.href = this.location.path() + '/' + this.sampleFileName;
    // works
    // window.location.href = this.location.path() + '/new-version/' + this.downloadName+this.currentVersionName+'.xlsx';
  }


  createSampleFileName(pathologyName) {


    var oldName = parseInt(this.latestCDEVersion.name.replace('v', ''));
    oldName = oldName + 1;
    this.sampleFileName = pathologyName+"_cdes_v" + oldName.toString() + ".xlsx";
  }

  createNewVersionName() {
    var oldName = parseInt(this.latestCDEVersion.name.replace('v', ''));
    oldName = oldName + 1;
    this.versionName = "v" + oldName.toString();
  }


  addNewVariable() {
    console.log('inside add new variable');
    console.log('latestCDEVersion'+this.latestCDEVersion);
    console.log('latestCDEVersion.cdevariables'+this.latestCDEVersion.cdevariables);
    console.log('latestCDEVersion.cdevariables'+this.latestCDEVersion.cdevariables.length);
    let newVar = Object.assign(Object.create(this.latestCDEVersion.cdevariables[this.latestCDEVersion.cdevariables.length - 1]));

    //var newVar: VariableOject={};
    if (this.checkIfCoceprPathIsValid(this.newVarConceptPath) && this.checkIfCodeIsNull(this.newVarCode) &&
      this.checkIfConceptPathIsNull(this.newVarConceptPath) && this.checkIfTypeIsNullAndWithinValues(this.newVarType)
      && this.checkIfConceptPathEndsWithCode(this.newVarConceptPath,this.newVarConceptPath, this.newVarCode,this.newVarCode)) {

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
    } else if (conceptPath.startsWith("/"+this.pathologyName)) {
      return true;
    } else {
      alert("Invalid concept path. It should start with: /"+this.pathologyName);
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

  checkIfTypeIsNullAndWithinValues(type) {
    console.log('inside type check');
    if (type == null && type == "") {
      alert("Type cannot be null.");
      return false;
    } else if(!['int', 'polynominal', 'multinominal','binominal','nominal','real','text'].includes(type)){
      console.log('finished type check');
      alert("Type takes of of the following values: 'int', 'polynominal', 'multinominal','binominal','nominal','real','text'");
      return false;
    }else {
      return true;
    }
  }

  checkIfConceptPathIsNull(conceptPath) {
    if (conceptPath != null && conceptPath != "") {
      return true;
    } else {
      alert("Concept Path cannot be null.");
      return false;
    }
  }
  toggleEdit() {
    this.disabledInput = !this.disabledInput;
  }
  /** We need to check whether only the code changed and validate with the already existing concept path or whether both of
   * them changed and thus we need to validate the current code with the current concept path. The same process should be
   * done for the concept path*/
  checkIfConceptPathEndsWithCode(currentConceptPath,existingConceptPath, currentCode,existingCode){
    console.log('provided values for currentConceptPath,existingConceptPath, currentCode,existingCode',
      currentConceptPath,existingConceptPath, currentCode,existingCode);

    if(this.checkIfVariableIsNullEmptyOrUndefined(currentConceptPath) && !this.checkIfVariableIsNullEmptyOrUndefined(currentCode)){
      console.log('case1');
      return this.checkIfStringEndsWithSecondString(existingConceptPath,currentCode);
    }else if(!this.checkIfVariableIsNullEmptyOrUndefined(currentConceptPath) && this.checkIfVariableIsNullEmptyOrUndefined(currentCode)){
      console.log('case2');
      return this.checkIfStringEndsWithSecondString(currentConceptPath,existingCode);
    }else if(!this.checkIfVariableIsNullEmptyOrUndefined(currentConceptPath) && !this.checkIfVariableIsNullEmptyOrUndefined(currentCode)){
      console.log('case3');
      return this.checkIfStringEndsWithSecondString(currentConceptPath,currentCode);
    }else{
      return true;
    }
  }

  checkIfVariableIsNullEmptyOrUndefined(variable){
    if(variable===null || variable===undefined || variable===''){
      return true;
    }else{
      return false;
    }
  }
  checkIfStringEndsWithSecondString(conceptPath,code){
    if(!conceptPath.endsWith(code)){
      alert('Concept path should always end with the variable code')
      return false;
    }else{
      return true;
    }
  }
  deleteVariable(currentIndex) {
    // the last cde variable is always the sample one so no actions are to be taken
    if(currentIndex==this.latestCDEVersion.cdevariables.length-1 && this.latestCDEVersion.cdevariables[currentIndex].code==='sample'){
      alert("Sample Variable Cannot be Deleted")
    }else{
      this.latestCDEVersion.cdevariables.splice(currentIndex, 1);
    }

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
    if(currentIndex==this.latestCDEVersion.cdevariables.length-1 && this.latestCDEVersion.cdevariables[currentIndex].code=='sample'){
      alert("Sample Variable Cannot be Changed")
    }else if(this.checkIfConceptPathEndsWithCode(this.editVarConceptPath,this.latestCDEVersion.cdevariables[currentIndex].conceptPath,
      this.editVarCode,this.latestCDEVersion.cdevariables[currentIndex].code)){
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
}
