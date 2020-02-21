import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { Color, SingleDataSet, Label } from 'ng2-charts';

import * as Constants from '../../constants';

@Component({
    selector: 'app-charts-base',
    templateUrl: './charts-base.component.html'
})
export class ChartsBaseComponent implements OnInit {
    @Input() set chartValues(data: any) {
        if (data) { this.setChartValues(data); }
    }
    @Input() set id(chartId: string) {
        if (chartId) { this.chartId = chartId; }
    }
    @Output() setSelectedChartId: EventEmitter<any> = new EventEmitter();

    public chartType: ChartType;
    public chartColor: Color[];
    public chartOptions: ChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    };
    public chartLabels: Label[];
    public chartData: SingleDataSet;
    public chartDetails: any;
    public chartId: string;
    public chartLegend: boolean;

    constructor(
    ) { }

    ngOnInit() {
    }


    public onChartClick(data: any): void {
        this.setSelectedChartId.emit(data.event.target.id);
    }

    private chartTypeHasMultiDataset(chartType: string): boolean {
        return Constants.CHART_HAS_MULTI_DATASET.includes(chartType);
    }

    private setChartValues(values: any): void {
        const scales = {
            yAxes: [
                { ticks: { beginAtZero: true } }
            ]
        };
        this.chartColor = values.chartColor;
        this.chartData = values.chartDataSets;
        this.chartDetails = values;
        this.chartLabels = values.chartLabels;
        this.chartLegend = values.chartLegend;
        this.chartType = values.chartType;
        this.chartOptions.scales = this.chartTypeHasMultiDataset(values.chartType) ? scales : {};
    }

}
