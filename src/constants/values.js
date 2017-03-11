const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const monthNames = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const queryTypes = {
  year: 'getByYear',
  month: 'getByYearAndMonth',
  date: 'getByGivenPeriod'
};

const strings = {
  year: 'year',
  month: 'month',
  date: 'date'
};

const colours = [
  { name: 'anime', value: '#ff9900' },
  { name: 'develop', value: '#674ea7' },
  { name: 'exercise', value: '#073763' },
  { name: 'gaming', value: '#ffff00' },
  { name: 'manga', value: '#6fa8dc' },
  { name: 'other', value: '#ff00ff' },
  { name: 'passing', value: '#a61c00' },
  { name: 'sleep', value: '#666' },
  { name: 'social', value: '#93c47d' },
  { name: 'wasted', value: '#7f6000' },
  { name: 'work', value: '#f2f2f2' }
];

const statisticsTypes = {
  charts: 'CHARTS',
  rawData: 'RAW_DATA'
};

const Constants = {
  statisticsTypes,
  colours,
  dayNames,
  monthNames,
  queryTypes,
  strings,
  yearZero: 2017
};

export default Constants
