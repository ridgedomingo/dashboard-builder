import { Component, OnInit } from '@angular/core';
import { ChartsBaseComponent } from '../charts-base/charts-base.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent extends ChartsBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
