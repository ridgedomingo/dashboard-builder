import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { faChartBar, faChartPie, faChartLine } from '@fortawesome/free-solid-svg-icons';

import * as Constants from '../constants';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  public chartChoices: Array<any> = [
    {
      icon: faChartBar,
      type: 'Bar Chart',
      values: Constants.BAR_CHART_DEFAULT_VALUES
    },
    {
      icon: faChartPie,
      type: 'Pie Chart',
      values: Constants.PIE_CHART_DEFAULT_VALUES
    },
    {
      icon: faChartLine,
      type: 'Line Chart'
    },
  ];

  public chartLayout: GridsterItem[] = [];
  public gridsterOptions: GridsterConfig = {
    draggable: { enabled: true },
    pushItems: true,
    resizable: { enabled: true },
    gridType: 'scrollVertical',
    maxItemCols: 4
  };

  public currentlySelectedChart: any;

  constructor() { }

  ngOnInit() {
  }

  public addChart(selectedChart: any): void {
    selectedChart.values.id = this.generateId();
    const chartData = {
      chartType: selectedChart.type,
      chartValues: selectedChart.values,
      cols: 3,
      rows: 1,
      x: 0,
      y: this.chartLayout.length
    };
    this.chartLayout.push(chartData);
    this.currentlySelectedChart = chartData;
  }

  public setSelectedChart(data: any): void {
    this.currentlySelectedChart = this.chartLayout.find(chart => chart.chartValues.id === data.id);
  }

  public setUpdatedChartData(data: any): void {
    const updatedChartIndex = this.chartLayout.findIndex(chart => chart.chartValues.id === data.chartValues.id);
    this.chartLayout[updatedChartIndex] = Object.assign({}, data);
  }

  private generateId(): string {
    return [...Array(7)].map(() => Math.random().toString(36)[2]).join('');
  }

}
