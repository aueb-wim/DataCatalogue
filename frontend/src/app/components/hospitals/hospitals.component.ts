import {AfterViewInit, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {DeviceDetectorService} from 'ngx-device-detector';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit,AfterViewInit {

  hospitals: Array<any>;
  hospitalName: string;
  hospitalNameToDelete:string;
  emptyPathology = true;
  currentPathologyName:string;
  sampleFileName:string;
  pathologies:Array<any>;
  deviceInfo = null;
  currentLocation;
  enabled = "active";


  constructor(private hospitalService: HospitalService, private deviceService: DeviceDetectorService, private route: ActivatedRoute, private location: Location, private router: Router) {
//this.epicFunction();
  }

  ngOnInit() {
this.currentLocation = this.router.url;
//console.log(this.currentLocation);
    //this.hospitalService.getAllHospitalsAndVariables().subscribe(data => {
    //  this.hospitals = data;
    //});

    this.route.params.switchMap((params: Params) => this.hospitalService.getPathologyById(+params['pathology_id'])).subscribe(path => {
      this.hospitals = path['hospitals'];
      this.currentPathologyName = path['name'];
      this.createSampleFileName(path['name']);
      // validate that a pathology has no cde variables
      for (let obj of path['versions']) {
        if(obj['cdevariables'] != null){
          this.emptyPathology = false;
          return;
        }
      }


    });
  }


ngAfterViewInit(){

  this.deviceInfo = this.deviceService.getDeviceInfo();
  if (!(this.deviceInfo['browser'] == "Chrome" || this.deviceInfo['browser'] == "MS-Edge") || !this.deviceService.isDesktop()) {
    window.alert("Currently the application is available for Google " +
      "Chrome and Microsoft Edge browsers on Desktop Devices. Firefox doesn't like animations!");
    this.enabled = "inactive";
  }
}


  newVersionUrl(){
    console.log( "--current location-"+this.location.path());
    window.location.href = this.location.path() + '/new-cde-version/'+this.currentPathologyName.toLowerCase( );

  }

  uploadFile() {
    window.location.href = this.location.path() + '/new-cde-version/'+this.currentPathologyName+'/' + this.sampleFileName;
    // works
    // window.location.href = this.location.path() + '/new-version/' + this.downloadName+this.currentVersionName+'.xlsx';
  }

  createSampleFileName(pathologyName) {
    this.sampleFileName = pathologyName+"_cdes_v1"  + ".xlsx";
  }

  epicFunction() {
    /** We have a lot of information about the device in case we want to customize components.*/

    //console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.


  }
  saveNewHospital(): void {
    let hospitalExists = false;
    for (let hosp of this.hospitals) {
      if (hosp.name.toLowerCase() === this.hospitalName.toLowerCase()) {
        hospitalExists = true;
        break;
      }
    }

    if (hospitalExists) {
      alert("The hospital" + this.hospitalName.toLowerCase() + " already exists");
    } else {


      this.hospitalService.createNewHospital(this.hospitalName.toLowerCase(),this.currentPathologyName.toLowerCase()).subscribe(
        data => {
          window.alert("Hospital created successfully.");
          this.route.params.switchMap((params: Params) => this.hospitalService.getPathologyById(+params['pathology_id'])).subscribe(path => {
            this.hospitals = path['hospitals'];
            this.currentPathologyName = path['name'];
            this.createSampleFileName(path['name']);
            // validate that a pathology has no cde variables
            for (let obj of path['versions']) {
              if(obj['cdevariables'] != null){
                this.emptyPathology = false;
                return;
              }
            }


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

  deleteHospital():void{
    let hospitalExists = false;
    for (let hosp of this.hospitals) {
      if (hosp.name.toLowerCase() === this.hospitalNameToDelete.toLowerCase()) {
        hospitalExists = true;
        break;
      }
    }

    if (!hospitalExists) {
      alert("The hospital " + this.hospitalNameToDelete + " does not exist");
    } else {


      this.hospitalService.deleteHospital(this.hospitalNameToDelete.toLowerCase()).subscribe(
        data => {
          window.alert("Hospital was deleted");
          this.route.params.switchMap((params: Params) => this.hospitalService.getPathologyById(+params['pathology_id'])).subscribe(path => {
            this.hospitals = path['hospitals'];
            this.currentPathologyName = path['name'];
            this.createSampleFileName(path['name']);
            // validate that a pathology has no cde variables
            for (let obj of path['versions']) {
              if(obj['cdevariables'] != null){
                this.emptyPathology = false;
                return;
              }
            }


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
