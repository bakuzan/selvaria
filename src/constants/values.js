const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const queryTypes = {
  year: 'getByYear',
  month: 'getByYearAndMonth',
  period: 'getCurrentPeriod'
};

const strings = {
  year: 'year',
  month: 'month'
};

const Constants = {
  monthNames,
  queryTypes,
  strings,
  yearZero: 2017
};

export default Constants
