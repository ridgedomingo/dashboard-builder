export const BAR_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: '#87c6f3' }, { backgroundColor: '#ffa1b5' }],
  chartDataSets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }],
  chartLabels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  chartLegend: true,
  chartType: 'bar',
};

export const LINE_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: '#87c6f3' }, { backgroundColor: '#ffa1b5' }],
  chartDataSets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }],
  chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  chartLegend: true,
  chartType: 'line',
};

export const PIE_CHART_DEFAULT_VALUES = {
  chartColor: [{ backgroundColor: ['#86c7f3', '#ffa1b5', '#f6f0ad'] }],
  chartDataSets: [300, 500, 100],
  chartLabels: ['Download Sales', 'In Store Sales', 'Mail Sales'],
  chartLegend: true,
  chartType: 'pie',
};

export const CHART_TYPE_PIE = ['pie'];
export const CHART_TYPE_BAR = ['bar', 'line'];
