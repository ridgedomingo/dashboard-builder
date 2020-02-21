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
      this.resetToDefaultPageValues();
      this.setChartValues(data);
    }
  }
  @Output() updatedChartData: EventEmitter<any> = new EventEmitter();
  public colorPickerValue: any;
  public chartLabels: Array<string> = [];
  public chartName: string;
  public chartSettingsForm: FormGroup;
  public chartStyleForm: FormGroup;
  public chartValues: Array<any> = [];
  public csvDataRecords: Array<any> = [];
  public csvDataSets: Array<string> = [];
  public selectedChartSeries: any;
  public stringify = JSON.stringify;

  private chartData: any;
  private selectedDataSet: string;

  constructor(
    private csvParser: Papa,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeChartSettingsForms();
  }

  public get chartTypeHasMultiDataset(): boolean {
    return Constants.CHART_HAS_MULTI_DATASET.includes(this.chartData.chartValues.chartType);
  }

  public buildChartMultiDataset(label: string): void {
    const csvDataCount: object = {};
    const barChartLabel: Array<string> = [];
    this.csvDataRecords.map(csvData => {
      barChartLabel.push(csvData[label]);
    });
    const dataCount = this.csvDataRecords.reduce((prevVal, currentVal) => {
      if (!csvDataCount[currentVal[label]]) {
        csvDataCount[currentVal[label]] = {};
      }
      csvDataCount[currentVal[label]][currentVal[this.selectedDataSet]] =
        (csvDataCount[currentVal[label]][currentVal[this.selectedDataSet]] || 0) + 1;
      return csvDataCount;
    }, {});
    const chartLabels = [... new Set(barChartLabel)];
    const dataSet = this.getBarChartDataset(dataCount);
    chartLabels.sort();
    this.setUpdatedChartData(dataSet, chartLabels);
  }
  public buildChartDataSet(dataset: any): void {
    const chartDataSet: Array<any> = [];
    if (Constants.CHART_HAS_MULTI_DATASET.includes(this.chartData.chartValues.chartType)) {
      this.chartLabels = this.csvDataSets.filter(dataSet => dataSet !== dataset);
      this.selectedDataSet = dataset;
    } else {
      this.csvDataRecords.map(csvData => {
        chartDataSet.push(csvData[dataset]);
      });
      const chartDataSets = this.getDataCount(this.csvDataRecords, dataset);
      const chartLabels = [... new Set(chartDataSet)];
      this.setUpdatedChartData(chartDataSets, chartLabels);
    }
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

  private getBarChartDataset(dataCount: any): Array<any> {
    const dataSet: Array<any> = [];
    const formattedDataSet = Object.values(Object.values(dataCount)).reduce((prevVal, currentVal) => {
      Object.entries(currentVal).map(([key, value]) => {
        prevVal[key] = prevVal[key] || [];
        prevVal[key].push(value);
      });
      return prevVal;
    }, {});
    Object.keys(formattedDataSet).forEach(key => {
      const chartInfo = {
        data: formattedDataSet[key],
        label: key
      };
      dataSet.push(chartInfo);
    });
    return dataSet;
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

  private resetToDefaultPageValues(): void {
    this.colorPickerValue = '';
    this.chartValues = [];
    if (this.chartSettingsForm) {
      this.chartSettingsForm.reset();
    }
  }

  private setChartValues(data: any): void {
    this.chartValues = [];
    this.chartData = data;
    setTimeout(() => {
      this.chartName = data.chartName ? data.chartName : data.chartType;
      if (this.chartTypeHasMultiDataset) {
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

  private setUpdatedChartData(dataSet: any, chartLabels: Array<string>): void {
    const chartData = Object.assign([], this.chartData);
    chartData.chartValues.chartDataSets = dataSet;
    chartData.chartValues.chartLabels = chartLabels;
    this.setChartValues(chartData);
    this.updatedChartData.emit(this.chartData);
  }

}
