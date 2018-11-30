import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetAllHospitalsComponent} from "./components/get-all-hospitals/get-all-hospitals.component";
import {CdeVariablesComponent} from "./components/cde-variables/cde-variables.component";
import {MappingsComponent} from "./components/mappings/mappings.component";
import {HospitalsComponent} from "./components/hospitals/hospitals.component";
import {HospitalDetailsComponent} from "./components/hospital-details/hospital-details.component";
import {UploadExcelComponent} from "./components/upload-excel/upload-excel.component";
import {VersionDetailsComponent} from "./components/version-details/version-details.component"
import {TreeComponent} from "./visuals/tree/tree.component"

const routes: Routes = [
  { path: '', redirectTo: '/hospital', pathMatch: 'full' },
  {path:'hospitals/variables', component: GetAllHospitalsComponent},
  {path:'hospitals/cde-variables', component: CdeVariablesComponent},
  {path:'hospitals/mappings', component: MappingsComponent},
  {path:'hospitals', component: HospitalsComponent},
  {path:'hospitals/:hospital_id', component: HospitalDetailsComponent},
  {path:'upload', component: UploadExcelComponent}
  //{path:'hospitals/:hospital_id/', component: VersionDetailsComponent},
  //{path:'hospitals/:hospital_id/:version_id/flat', component: VersionDetailsComponent},
  //{path:'hospitals/:hospital_id/:version_id/hierarchical', component: TreeComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
