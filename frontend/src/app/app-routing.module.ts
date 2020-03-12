import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CdeVariablesComponent} from "./components/cde-variables/cde-variables.component";
import {HospitalsComponent} from "./components/hospitals/hospitals.component";
import {HospitalDetailsComponent} from "./components/hospital-details/hospital-details.component";
import {AllVariablesComponent} from "./components/all-variables/all-variables.component";
import {CreateNewVersionComponent} from "./components/create-new-version/create-new-version.component";
import {FullUploadComponent} from "./components/full-upload/full-upload.component";
import {FullUploadCdesComponent} from "./components/full-upload-cdes/full-upload-cdes.component";
import {CreateNewVersionCdeComponent} from "./components/create-new-version-cde/create-new-version-cde.component"
import {AboutComponent} from "./components/about/about.component"
import {PathologiesComponent} from "./components/pathologies/pathologies.component"

const routes: Routes = [
  { path: '', redirectTo: 'pathologies', pathMatch: 'full' },
  {path:'hospitals/cde-variables', component: CdeVariablesComponent},
  {path:'pathologies', component: PathologiesComponent},
  {path:'pathologies/:pathology_id', component: HospitalsComponent},
  {path:'pathologies/:pathology_id/hospitals/:hospital_id', component: HospitalDetailsComponent},
  {path:'pathologies/:pathology_id/hospitals/:hospital_id/new-version', component: CreateNewVersionComponent},
  {path:'pathologies/:pathology_id/hospitals/:hospital_id/new-version/:upload_file', component: FullUploadComponent},

  //{path:'hospitals', component: HospitalsComponent},
  {path:'hospitals/all', component: AllVariablesComponent},
  {path:'hospitals/about', component: AboutComponent},


  {path:'hospitals/cde-variables/new-cde-version/:pathology_name/:upload_file', component: FullUploadCdesComponent},
  {path:'hospitals/cde-variables/new-cde-version/:pathology_name', component: CreateNewVersionCdeComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
