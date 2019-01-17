import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CdeVariablesComponent} from "./components/cde-variables/cde-variables.component";
import {HospitalsComponent} from "./components/hospitals/hospitals.component";
import {HospitalDetailsComponent} from "./components/hospital-details/hospital-details.component";
import {AllHospitalsComponent} from "./components/all-hospitals/all-hospitals.component";


const routes: Routes = [
  { path: '', redirectTo: '/hospital', pathMatch: 'full' },
  {path:'hospitals/cde-variables', component: CdeVariablesComponent},
  {path:'hospitals', component: HospitalsComponent},
  {path:'hospitals/all', component: AllHospitalsComponent},
  {path:'hospitals/:hospital_id', component: HospitalDetailsComponent},

  //{path:'hospitals/:hospital_id/', component: VersionDetailsComponent},
  //{path:'hospitals/:hospital_id/:version_id/flat', component: VersionDetailsComponent},
  //{path:'hospitals/:hospital_id/:version_id/hierarchical', component: TreeComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
