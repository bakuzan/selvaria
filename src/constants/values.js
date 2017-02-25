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

const Constants = {
  dayNames,
  monthNames,
  queryTypes,
  strings,
  yearZero: 2017
};

export default Constants
