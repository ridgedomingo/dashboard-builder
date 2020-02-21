import { Component, EventEmitter, OnInit, Input, ViewEncapsulation, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Papa } from 'ngx-papaparse';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import * as Constants from '../constants';
@Component({
  selector: 'app-chart-settings-form',
  templateUrl: './chart-settings-form.component.html',
  styleUrls: ['./chart-settings-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartSettingsFormComponent implements OnInit, OnDestroy {
  @Input() set chart(data: any) {
    if (data) {
      this.resetToDefaultPageValues();
      this.setChartValues(data);
    }
  }
  @Output() updatedChartData: EventEmitter<any> = new EventEmitter();
  public chartDimension: Array<string> = [];
  public chartName: string;
  public chartSettingsForm: FormGroup;
  public chartStyleForm: FormGroup;
  public chartValues: Array<any> = [];
  public csvFields: Array<string> = [];
  public csvDataRecords: Array<any> = [];
  public colorPickerValue: any;
  public selectedChartSeries: any;
  public stringify = JSON.stringify;

  private chartData: any;
  private componentIsDestroyed$: Subject<boolean> = new Subject();
  private selectedField: string;

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

  public buildChartWithMultiDataset(label: string): void {
    const csvDataCount: object = {};
    const barChartLabel: Array<string> = [];
    this.csvDataRecords.map(csvData => {
      barChartLabel.push(csvData[label]);
    });
    const dataCount = this.csvDataRecords.reduce((prevVal, currentVal) => {
      if (!csvDataCount[currentVal[label]]) {
        csvDataCount[currentVal[label]] = {};
      }
      csvDataCount[currentVal[label]][currentVal[this.selectedField]] =
        (csvDataCount[currentVal[label]][currentVal[this.selectedField]] || 0) + 1;
      return csvDataCount;
    }, {});
    const chartLabels = [... new Set(barChartLabel)];
    const dataSet = this.getBarChartDataset(dataCount);
    chartLabels.sort();
    this.setUpdatedChartData(dataSet, chartLabels);
  }
  public buildChartDataSet(field: string): void {
    if (Constants.CHART_HAS_MULTI_DATASET.includes(this.chartData.chartValues.chartType)) {
      this.chartDimension = this.csvFields.filter(csvField => csvField !== field);
      this.selectedField = field;
    } else {
      this.buildChartWithSingleDataset(field);
    }
  }

  public getCSVData(data: any): void {
    this.csvParser.parse(data.target.files[0], {
      header: true,
      complete: (result) => {
        this.csvFields = result.meta.fields;
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

  private buildChartWithSingleDataset(field: string): void {
    const chartDataSet: Array<any> = [];
    this.csvDataRecords.map(csvData => {
      chartDataSet.push(csvData[field]);
    });
    const chartDataSets = this.getDataCount(this.csvDataRecords, field);
    const chartLabels = [... new Set(chartDataSet)];
    this.setUpdatedChartData(chartDataSets, chartLabels);
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
    this.subscribeToNameControlValueChanges();

    // this.chartStyleForm = this.formBuilder.group({

    // })
  }

  private resetToDefaultPageValues(): void {
    this.colorPickerValue = '';
    this.chartValues = [];
    if (this.chartSettingsForm) {
      this.chartSettingsForm.reset({}, { emitEvent: false });
    }
  }

  private setChartValues(data: any): void {
    this.chartValues = [];
    this.chartData = data;
    this.chartName = data.chartName;
    setTimeout(() => {
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
    const chartData = Object.assign({}, this.chartData);
    chartData.chartValues.chartDataSets = dataSet;
    chartData.chartValues.chartLabels = chartLabels;
    this.setChartValues(chartData);
    this.updatedChartData.emit(chartData);
  }

  private subscribeToNameControlValueChanges(): void {
    this.chartSettingsForm.controls.name.valueChanges
      .pipe(debounceTime(1000),
        filter(name => name !== ''),
        distinctUntilChanged(),
        takeUntil(this.componentIsDestroyed$)
      )
      .subscribe(name => {
        this.chartName = name;
        const chartData = Object.assign({}, this.chartData);
        chartData.chartName = name;
        this.setChartValues(chartData);
        this.updatedChartData.emit(chartData);
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
