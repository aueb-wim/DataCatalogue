import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CdeVariablesComponent} from "./components/cde-variables/cde-variables.component";
import {HospitalsComponent} from "./components/hospitals/hospitals.component";
import {HospitalDetailsComponent} from "./components/hospital-details/hospital-details.component";
import {AllVariablesComponent} from "./components/all-variables/all-variables.component";
import {CreateNewVersionComponent} from "./components/create-new-version/create-new-version.component";
import {FullUploadComponent} from "./components/full-upload/full-upload.component";
import {CreateNewVersionCdeComponent} from "./components/create-new-version-cde/create-new-version-cde.component"


const routes: Routes = [
  { path: '', redirectTo: '/hospitals', pathMatch: 'full' },
  {path:'hospitals/cde-variables', component: CdeVariablesComponent},
  {path:'hospitals', component: HospitalsComponent},
  {path:'hospitals/all', component: AllVariablesComponent},
  {path:'hospitals/:hospital_id', component: HospitalDetailsComponent},
  {path:'hospitals/:hospital_id/new-version', component: CreateNewVersionComponent},
  {path:'hospitals/:hospital_id/new-version/:upload_file', component: FullUploadComponent},
  {path:'hospitals/cde-variables/new-cde-version/:upload_file', component: FullUploadComponent},
  {path:'hospitals/cde-variables/new-cde-version', component: CreateNewVersionCdeComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
