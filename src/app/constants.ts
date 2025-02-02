import {
  faArrowCircleDown, faArrowCircleUp, faChartBar, faChartPie, faChartLine,
  faCircleNotch, faFillDrip
} from '@fortawesome/free-solid-svg-icons';

export const BAR_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: '#87c6f3' }, { backgroundColor: '#ffa1b5' }],
  chartDataSets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }],
  chartLabels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  chartLegend: true,
  chartName: 'Bar',
  chartType: 'bar',
};

export const DOUGHNUT_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: ['#86c7f3', '#ffa1b5', '#f6f0ad'] }],
  chartDataSets: [300, 500, 100],
  chartLabels: ['Download Sales', 'In Store Sales', 'Mail Sales'],
  chartLegend: true,
  chartName: 'Donut',
  chartType: 'doughnut',
};

export const LINE_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: '#87c6f3' }, { backgroundColor: '#ffa1b5' }],
  chartDataSets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }],
  chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  chartLegend: true,
  chartName: 'Line',
  chartType: 'line',
};

export const PIE_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: ['#86c7f3', '#ffa1b5', '#f6f0ad'] }],
  chartDataSets: [300, 500, 100],
  chartLabels: ['Download Sales', 'In Store Sales', 'Mail Sales'],
  chartLegend: true,
  chartName: 'Pie',
  chartType: 'pie',
};

export const CHART_CHOICES = [
  {
    icon: faChartBar,
    values: BAR_CHART_DEFAULT_VALUES
  },
  {
    icon: faChartPie,
    values: PIE_CHART_DEFAULT_VALUES
  },
  {
    icon: faChartLine,
    values: LINE_CHART_DEFAULT_VALUES
  },
  {
    class: 'wrap-chart-choice-name',
    icon: faCircleNotch,
    values: DOUGHNUT_CHART_DEFAULT_VALUES
  },
];

export const ARROW_DOWN_ICON = faArrowCircleDown;
export const ARROW_UP_ICON = faArrowCircleUp;

export const CHART_HAS_SINGLE_DATASET = ['doughtnut', 'pie'];
export const CHART_HAS_MULTI_DATASET = ['bar', 'line'];
