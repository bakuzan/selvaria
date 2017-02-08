const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const queryTypes = {
  year: 'getByYear',
  month: 'getByYearAndMonth',
  period: 'getCurrentPeriod'
};

const Constants = { monthNames, queryTypes };

export default Constants
