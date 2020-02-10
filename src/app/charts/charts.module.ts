import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';

@NgModule({
  declarations: [
    VerticalBarChartComponent
  ],
  entryComponents: [
    VerticalBarChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [],
  exports: [
    VerticalBarChartComponent
  ]
})
export class CustomChartsModule { }
