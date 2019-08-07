import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-pathologies',
  templateUrl: './pathologies.component.html',
  styleUrls: ['./pathologies.component.css']
})
export class PathologiesComponent implements OnInit {
  pathologies:Array<any>;
  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllPathologies().subscribe(allPathologies=>{
      this.pathologies = allPathologies;

    });
  }

}
