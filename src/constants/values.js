const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

const Constants = {
  monthNames,
  queryTypes,
  strings,
  yearZero: 2017
};

export default Constants
