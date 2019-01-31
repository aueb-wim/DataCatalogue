import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit,AfterViewInit {

  hospitals: Array<any>;
  deviceInfo = null;
  enabled = "active";

  constructor(private hospitalService: HospitalService, private deviceService: DeviceDetectorService) {
//this.epicFunction();
  }

  ngOnInit() {
    this.hospitalService.getAllHospitalsAndVariables().subscribe(data => {
      this.hospitals = data;
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
