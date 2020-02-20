import { Component, OnInit } from '@angular/core';
import { ChartsBaseComponent } from '../charts-base/charts-base.component';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent extends ChartsBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
