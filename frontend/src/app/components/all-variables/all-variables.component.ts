import {Component, NgModule, OnInit} from '@angular/core';
import { HospitalService } from '../../shared/hospital.service';

@Component({
  selector: 'app-all-variables',
  templateUrl: './all-variables.component.html',
  styleUrls: ['./all-variables.component.css']
})
export class AllVariablesComponent implements OnInit {
  hospitalVariables: Array<any>;
  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllVariables().subscribe(data => {
      this.hospitalVariables = data;
    });
  }

}

