import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import { HospitalService } from './shared/hospital.service';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { MatButtonModule,MatDialogModule, MatCardModule, MatProgressBarModule, MatFormFieldModule, MatSlideToggleModule, MatInputModule, MatAutocompleteModule, MatListModule, MatToolbarModule, MatTabsModule, MatExpansionModule, MatIconModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LogService} from "./shared/log.service";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
//import { CdeVariablesComponent } from './components/cde-variables/cde-variables.component';
import { CdeVariablesComponent } from './components/cde-variables/cde-variables.component';
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
import { ListUploadComponent } from './components/list-upload/list-upload.component';
import { DetailsUploadComponent } from './components/details-upload/details-upload.component';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import { MappingVisualComponent } from './visuals/mapping-visual/mapping-visual.component';
import {SelectModule} from 'ng-select';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AllVariablesComponent } from './components/all-variables/all-variables.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CreateNewVersionComponent } from './components/create-new-version/create-new-version.component';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FullUploadComponent } from './components/full-upload/full-upload.component';
import { CreateNewVersionCdeComponent } from './components/create-new-version-cde/create-new-version-cde.component';
import { CategoryFilterPipe } from './components/category-filter.pipe';
import { AboutComponent } from './components/about/about.component';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CdeVariablesComponent,
    HospitalFilterPipe,
    VersionFilterPipe,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    TreeComponent,
    HospitalsComponent,
    HospitalDetailsComponent,
    VersionDetailsComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    FormUploadComponent,
    MappingVisualComponent,
    AllVariablesComponent,
    ReportsComponent,
    CreateNewVersionComponent,
    FullUploadComponent,
    CreateNewVersionCdeComponent,
    CategoryFilterPipe,
    AboutComponent,

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
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    PrettyJsonModule,
    AngularFontAwesomeModule,
    SelectModule,
    HttpModule,
    RouterModule,
    OAuthModule.forRoot(),
    DeviceDetectorModule.forRoot()
  ],

  providers: [HospitalService, LogService, D3Service, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  //providers: [HospitalService, LogService, D3Service],
  bootstrap: [AppComponent]

})

export class AppModule{

}



