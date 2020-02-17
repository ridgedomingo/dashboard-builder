import { Component, EventEmitter, OnInit, Input, ViewEncapsulation, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface ICSVData {
  [key: string]: string;
}
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
  public selectedChartSeries: any;
  public stringify = JSON.stringify;

  private chartData: any;
  private csvHeaders: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeChartSettingsForms();
  }

  public fileChangeListener(data: any) {
    if (data.target.files && data.target.files.length > 0) {
      const file: File = data.target.files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const csvData: string = reader.result as string;
        const csvContent = csvData.split(/\r\n|\n/);
        this.csvHeaders = this.getCSVHeaders(csvContent);
      };
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

  private getCSVHeaders(csvRecords: any): Array<string> {
    const headers = csvRecords[0].split(',');
    const headersList: Array<string> = [];
    for (const header of headers) {
      headersList.push(header);
    }
    return headersList;
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
