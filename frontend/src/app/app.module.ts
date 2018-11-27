import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HospitalService } from './shared/hospital.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatTabsModule, MatExpansionModule, MatIconModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HospitalVariablesComponent } from './shared/hospital-variables/hospital-variables.component';
import {AppRoutingModule} from "./app-routing.module";
import { GetAllHospitalsComponent } from './components/get-all-hospitals/get-all-hospitals.component';
import { FormsModule } from '@angular/forms';
import {LogService} from "./shared/log.service";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CdeVariablesComponent } from './components/cde-variables/cde-variables.component';
import { MappingsComponent } from './components/mappings/mappings.component';
import { HospitalFilterPipe } from './components/hospital-filter.pipe';
import { VersionFilterPipe } from './components/version-filter.pipe';
import { TreeModule } from 'angular-tree-component';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { D3Service, D3_DIRECTIVES } from './d3';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { TreeComponent } from './visuals/tree/tree.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { HospitalDetailsComponent } from './components/hospital-details/hospital-details.component';
import { VersionDetailsComponent } from './components/version-details/version-details.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';




@NgModule({
  declarations: [
    AppComponent,
    HospitalVariablesComponent,
    GetAllHospitalsComponent,
    SearchBarComponent,
    CdeVariablesComponent,
    MappingsComponent,
    HospitalFilterPipe,
    VersionFilterPipe,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    TreeComponent,
    HospitalsComponent,
    HospitalDetailsComponent,
    VersionDetailsComponent,
  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    AppRoutingModule,
    FormsModule,
    TreeModule,
    PrettyJsonModule,
    AngularFontAwesomeModule
  ],

  providers: [HospitalService, LogService, D3Service],
  bootstrap: [AppComponent]

})
export class AppModule {  }
