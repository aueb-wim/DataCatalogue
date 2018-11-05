import {Component,  OnInit,} from '@angular/core';
import {HospitalService} from "../hospital.service";


@Component({
  selector: 'app-hospital-variables',
  templateUrl: './hospital-variables.component.html',
  styleUrls: ['./hospital-variables.component.css']
})
export class HospitalVariablesComponent implements OnInit {
  hospitalVariables: Array<any>;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllVariables().subscribe(data => {
      this.hospitalVariables = data;
    });
  }

}
