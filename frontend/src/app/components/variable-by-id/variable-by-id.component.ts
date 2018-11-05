import {Component, OnInit} from '@angular/core';
import { HospitalService } from '../../shared/hospital.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-variable-by-id',
  templateUrl: './variable-by-id.component.html',
  styleUrls: ['./variable-by-id.component.css']
})
export class VariableByIdComponent implements OnInit {
  variable: any;
  constructor(private hospitalService: HospitalService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit():void {
    this.route.params
      .switchMap((params: Params) => this.hospitalService.getVariableById(+params['variable_id']))
      .subscribe(variable => this.variable = variable);
  }
  goBack(): void {
    this.location.back();
  }

}
