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
  emptyPathology = true;
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
}
