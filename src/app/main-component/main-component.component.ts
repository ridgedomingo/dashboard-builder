import { Component, OnInit } from '@angular/core';

interface IChartChoices {
  data?: Array<any>;
  type: string;
}

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  public chartChoices = [
    'Bar Chart',
    'Pie Chart',
  ];

  public chartsList: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

  public addChart(selectedChart: string): void {
    let chartData: IChartChoices = {} as IChartChoices;
    chartData = {
      type: selectedChart
    };
    this.chartsList.push(chartData);
  }

}
