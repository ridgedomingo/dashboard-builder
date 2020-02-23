import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

import * as Constants from '../constants';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  public chartChoices: Array<any> = Constants.CHART_CHOICES;
  public chartLayout: GridsterItem[] = [];
  public currentlySelectedChart: any;
  public gridsterOptions: GridsterConfig = {
    draggable: { enabled: true },
    pushItems: true,
    resizable: { enabled: true },
    gridType: 'scrollVertical',
    maxCols: 4
  };

  public minifiedChartChoicesTriggerIcon: any = Constants.ARROW_UP_ICON;
  public showMinifiedChartChoicesContainer: boolean;

  constructor() { }

  ngOnInit() {
  }

  public addChart(selectedChart: any): void {
    const data = {
      chartName: selectedChart.name,
      chartValues: selectedChart.values,
      id: this.generateId(),
      cols: 3,
      rows: 1,
      x: 0,
      y: this.chartLayout.length
    };
    const chartData = this.cloneChartDataInitialValues(data);
    this.chartLayout.push(chartData);
    this.currentlySelectedChart = chartData;
    this.showMinifiedChartChoicesContainer = true;
  }

  public minifiedChartChoicesContainerTrigger(): void {
    this.showMinifiedChartChoicesContainer = !this.showMinifiedChartChoicesContainer;
    this.minifiedChartChoicesTriggerIcon = this.showMinifiedChartChoicesContainer ? Constants.ARROW_DOWN_ICON : Constants.ARROW_UP_ICON;
  }

  public setSelectedChart(chartId: any): void {
    this.currentlySelectedChart = this.chartLayout.find(chart => chart.id === chartId);
  }

  public setUpdatedChartData(data: any): void {
    const updatedChartIndex = this.chartLayout.findIndex(chart => chart.id === data.id);
    this.chartLayout[updatedChartIndex] = Object.assign({}, data);
  }

  private cloneChartDataInitialValues(chartData: any): any {
    const chartValues = JSON.stringify(chartData);
    const chartDataClone = JSON.parse(chartValues);
    return chartDataClone;
  }

  private generateId(): string {
    return [...Array(7)].map(() => Math.random().toString(36)[2]).join('');
  }

}
