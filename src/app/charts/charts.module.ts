import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ChartsBaseComponent } from './charts-base/charts-base.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';

@NgModule({
  declarations: [
    ChartsBaseComponent,
    LineChartComponent,
    PieChartComponent,
    VerticalBarChartComponent,
  ],
  entryComponents: [
    LineChartComponent,
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
    LineChartComponent,
    PieChartComponent,
    VerticalBarChartComponent
  ]
})
export class CustomChartsModule { }
