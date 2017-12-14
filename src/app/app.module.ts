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


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ data, drilldown ];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SimplechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartModule
  ],
  providers: [DataService, { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
  bootstrap: [AppComponent]
})
export class AppModule { }
