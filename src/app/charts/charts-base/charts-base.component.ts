import { Component, OnInit, Input } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { Color, SingleDataSet, Label } from 'ng2-charts';

@Component({
    selector: 'app-charts-base',
    templateUrl: './charts-base.component.html'
})
export class ChartsBaseComponent implements OnInit {
    @Input() set chartValues(data: any) {
        if (data) {
            this.setChartValues(data);
        }
    }

    public chartColor: Color[];
    public chartOptions: ChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    };
    public chartLabels: Label[];
    public chartData: SingleDataSet;
    public chartType: ChartType;
    public chartLegend: boolean;

    constructor(
    ) { }

    ngOnInit() {
    }

    public setChartValues(values: any): void {
        this.chartColor = values.chartColor;
        this.chartData = values.chartDataSets;
        this.chartLabels = values.chartLabels;
        this.chartLegend = values.chartLegend;
        this.chartType = values.chartType;
    }

}
