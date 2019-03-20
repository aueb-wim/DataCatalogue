import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {IOption} from "ng-select";

@Component({
  selector: 'app-all-hospitals',
  templateUrl: './all-variables.component.html',
  styleUrls: ['./all-variables.component.css']
})
export class AllVariablesComponent implements OnInit {

  allHospitalWithUniqueVariables:Array<any>;
  allUniqueVariables:Array<any>;
  myOptions2: Array<IOption> = [{label: '', value: ''}];
  categoryOptions: Array<IOption> = [{label: '', value: ''}];
  disabled = false;
  searchTermVar: string = "";
  searchTermCategory:string="";
  viewInitialized: boolean;


  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllHospitalsAndUniqueVariables().subscribe(data => {
      this.allHospitalWithUniqueVariables = data;
    });
    this.hospitalService.getAllUniqueVariables().subscribe(all=>{
      this.allUniqueVariables = all;
      this.categoryOptions = this.arrayIterationCategoryOptions(all);
    });
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
  /** Method that extracts the second part of the concept path of the each variables (this is our category) and adds
   * each unique occurrence in a list that is returned*/

  arrayIterationCategoryOptions(variables){
    let finalArray: Array<IOption> = [{label: '', value: ''}];
    finalArray = this.arrayIteration(variables,finalArray);
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
  public arrayIterationByLabel(originalArray) {
    //empty the array first
    this.myOptions2.length = 0;
    for (let obj of originalArray) {
      this.myOptions2.push({label: obj['code'].toString(), value: obj['variable_id'].toString()});
    }
    return this.myOptions2;
  }


}
