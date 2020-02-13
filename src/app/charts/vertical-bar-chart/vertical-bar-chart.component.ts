import { Component, OnInit } from '@angular/core';
import { ChartsBaseComponent } from '../charts-base/charts-base.component';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss']
})
export class VerticalBarChartComponent extends ChartsBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
