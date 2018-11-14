import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HospitalService} from "./shared/hospital.service";
import {GetAllHospitalsComponent} from "./components/get-all-hospitals/get-all-hospitals.component";
import {CdeVariablesComponent} from "./components/cde-variables/cde-variables.component";
import {MappingsComponent} from "./components/mappings/mappings.component";

const routes: Routes = [
  { path: '', redirectTo: '/hospital', pathMatch: 'full' },
  {path:'hospitals/variables', component: GetAllHospitalsComponent},
  {path:'hospitals/cde-variables', component: CdeVariablesComponent},
  {path:'hospitals/mappings', component: MappingsComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
