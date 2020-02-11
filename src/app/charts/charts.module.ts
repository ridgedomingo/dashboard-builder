import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PieChartComponent } from './pie-chart/pie-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';

@NgModule({
  declarations: [
    PieChartComponent,
    VerticalBarChartComponent,
  ],
  entryComponents: [
    PieChartComponent,
    VerticalBarChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FontAwesomeModule,
  ],
  providers: [],
  exports: [
    PieChartComponent,
    VerticalBarChartComponent
  ]
})
export class CustomChartsModule { }
