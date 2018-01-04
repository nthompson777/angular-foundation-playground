import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { SimplechartComponent } from './charts/simplechart.component';
import data from 'highcharts/modules/data.src';
import drilldown from 'highcharts/modules/drilldown.src';
import { HttpClientModule } from "@angular/common/http"; // HttpClient
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AgGridModule }  from "ag-grid-angular";  // ag-grid
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { RedComponentComponent } from './red-component/red-component.component';
import { FaIconComponent } from './fa-icon/fa-icon.component';
import { FaModule } from './fa/fa.module';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ data, drilldown ];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SimplechartComponent,
    MyGridApplicationComponent,
    RedComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartModule,
    HttpModule,
    HttpClientModule,
    FaModule,  // Font Awesome 5 Beta Test Version (this was from FortAwesome unfinished Ng Version repo)
    AgGridModule.withComponents([])
  ],
  providers: [DataService, { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
  bootstrap: [AppComponent]
})
export class AppModule { }
