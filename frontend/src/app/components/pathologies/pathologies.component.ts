import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-pathologies',
  templateUrl: './pathologies.component.html',
  styleUrls: ['./pathologies.component.css']
})
export class PathologiesComponent implements OnInit {
  pathologies:Array<any>;
  pathologyName: string;
  pathologyNameToDelete: string;
  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllPathologies().subscribe(allPathologies=>{
      this.pathologies = allPathologies;

    });


  }


  deletePathology():void{
    let pathologyExists = false;
    for (let path of this.pathologies) {
      if (path.name.toLowerCase() === this.pathologyNameToDelete.toLowerCase()) {
        pathologyExists = true;
        break;
      }
    }

    if (!pathologyExists) {
      alert("The pathology " + this.pathologyNameToDelete + " does not exist");
    } else {


      this.hospitalService.deletePathology(this.pathologyNameToDelete.toLowerCase()).subscribe(
        data => {
          window.alert("Pathology was deleted");
          this.hospitalService.getAllPathologies().subscribe(allPathologies => {
            this.pathologies = allPathologies;

          });
          //this.location.back();
        },
        error => {
          if (error.status == '401') {
            alert("You need to be logged in to complete this action.");
          } else {
            alert("An error has occurred.");
          }
        });
    }


  }

  saveNewPathology(): void {
    let pathologyExists = false;
    for (let path of this.pathologies) {
      if (path.name.toLowerCase() === this.pathologyName.toLowerCase()) {
        pathologyExists = true;
        break;
      }
    }

    if (pathologyExists) {
      alert("The pathology" + this.pathologyName.toLowerCase() + " already exists");
    } else {


      this.hospitalService.createNewPathology(this.pathologyName.toLowerCase()).subscribe(
        data => {
          window.alert("Pathology created successfully.");
          this.hospitalService.getAllPathologies().subscribe(allPathologies => {
            this.pathologies = allPathologies;

          });
          //this.location.back();
        },
        error => {
          if (error.status == '401') {
            alert("You need to be logged in to complete this action.");
          } else {
            alert("An error has occurred.");
          }
        });


    }
  }
}
