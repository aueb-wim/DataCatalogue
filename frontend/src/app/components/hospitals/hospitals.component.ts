import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  hospitals:Array<any>;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllHospitalsAndVariables().subscribe(data => {this.hospitals = data;});
  }

  changetab(){

  }

}
