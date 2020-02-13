import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ChartsBaseComponent } from './charts-base/charts-base.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';

@NgModule({
  declarations: [
    ChartsBaseComponent,
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
