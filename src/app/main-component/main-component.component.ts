import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { faChartBar, faChartPie, faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  // public chartChoices = [
  //   'Bar Chart',
  //   'Pie Chart',
  // ];
  public chartChoices: Array<any> = [
    {
      icon: faChartBar,
      type: 'Bar Chart',
    }, {
      icon: faChartPie,
      type: 'Pie Chart'
    }, {
      icon: faChartLine,
      type: 'Line Chart'
    }
  ];

  public chartsList: Array<any> = [];

  public gridsterOptions: GridsterConfig = {
    draggable: { enabled: true },
    pushItems: true,
    resizable: { enabled: true },
    gridType: 'scrollVertical',
    maxItemCols: 4
  };
  public chartLayout: GridsterItem[] = [];

  constructor() { }

  ngOnInit() {
  }

  public addChart(selectedChart: string): void {
    this.chartLayout.push({
      chartType: selectedChart,
      cols: 3,
      id: this.generateId(),
      rows: 1,
      x: 0,
      y: this.chartLayout.length
    });
  }

  private generateId(): string {
    return [...Array(7)].map(() => Math.random().toString(36)[2]).join('');
  }

}
