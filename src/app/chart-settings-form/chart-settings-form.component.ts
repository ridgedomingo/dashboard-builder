import { Component, EventEmitter, OnInit, Input, ViewEncapsulation, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Papa } from 'ngx-papaparse';

import * as Constants from '../constants';
@Component({
  selector: 'app-chart-settings-form',
  templateUrl: './chart-settings-form.component.html',
  styleUrls: ['./chart-settings-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartSettingsFormComponent implements OnInit {
  @Input() set chart(data: any) {
    if (data) {
      this.colorPickerValue = '';
      this.chartValues = [];
      this.setChartValues(data);
    }
  }
  @Output() updatedChartData: EventEmitter<any> = new EventEmitter();
  public colorPickerValue: any;
  public chartName: string;
  public chartSettingsForm: FormGroup;
  public chartStyleForm: FormGroup;
  public chartValues: Array<any> = [];
  public csvDataRecords: Array<any> = [];
  public csvDataSets: Array<string> = [];
  public selectedChartSeries: any;
  public stringify = JSON.stringify;

  private chartData: any;

  constructor(
    private csvParser: Papa,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeChartSettingsForms();
  }

  public getCSVData(data: any): void {
    this.csvParser.parse(data.target.files[0], {
      header: true,
      complete: (result) => {
        this.csvDataSets = result.meta.fields;
        this.csvDataRecords = result.data;
      }
    });
  }

  public buildChartDataSet(dataset: any): void {
    const chartDataSet: Array<any> = [];
    if (Constants.CHART_TYPE_BAR.includes(this.chartData.chartType)) {

    } else {
      this.csvDataRecords.map(csvData => {
        chartDataSet.push(csvData[dataset]);
      });
      const chartDataSets = this.getDataCount(this.csvDataRecords, dataset);
      const chartLabels = [... new Set(chartDataSet)];

      const chartData = Object.assign([], this.chartData);
      chartData.chartValues.chartDataSets = chartDataSets;
      chartData.chartValues.chartLabels = chartLabels;
      this.setChartValues(chartData);
      this.updatedChartData.emit(this.chartData);
    }
  }

  public setChartColor(color: string): void {
    if (this.chartData.chartValues.chartDataSets[0].hasOwnProperty('label')) {
      const seriesIndex = this.chartData.chartValues.chartDataSets.findIndex(dataSet => this.selectedChartSeries.label === dataSet.label);
      this.chartData.chartValues.chartColor[seriesIndex] = { backgroundColor: color };
    } else {
      const seriesIndex = this.chartData.chartValues.chartLabels.findIndex(chartLabel => this.selectedChartSeries.label === chartLabel);
      this.chartData.chartValues.chartColor[0].backgroundColor[seriesIndex] = color;
    }
    this.updatedChartData.emit(this.chartData);
  }

  public setSelectedChartSeries(data: any) {
    const chartValues = JSON.parse(data);
    this.selectedChartSeries = chartValues;
    this.colorPickerValue = chartValues.backgroundColor;
  }

  private getDataCount(csvData: Array<any>, dataSet: string): Array<number> {
    const csvDataCount: object = {};
    const csvDataset: Array<number> = [];
    csvData.forEach(data => {
      csvDataCount[data[dataSet]] = (csvDataCount[data[dataSet]] || 0) + 1;
    });
    Object.keys(csvDataCount).forEach(key => {
      csvDataset.push(csvDataCount[key]);
    });
    return csvDataset;
  }

  private initializeChartSettingsForms(): void {
    this.chartSettingsForm = this.formBuilder.group({
      dataSource: [''],
      name: ['']
    });

    // this.chartStyleForm = this.formBuilder.group({

    // })
  }

  private setChartValues(data: any): void {
    this.chartValues = [];
    this.chartData = data;
    setTimeout(() => {
      this.chartName = data.chartName ? data.chartName : data.chartType;
      if (data.chartValues.chartDataSets[0].hasOwnProperty('label')) {
        data.chartValues.chartDataSets.map(dataSets => {
          const chartValues = {
            label: dataSets.label,
            backgroundColor: dataSets.backgroundColor
          };
          this.chartValues.push(chartValues);
        });
      } else {
        data.chartValues.chartLabels.map((label, index) => {
          this.chartValues.push({
            label,
            backgroundColor: data.chartValues.chartColor[0].backgroundColor[index]
          });
        });
      }
    });
  }

}
