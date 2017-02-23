const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const childPopulateObject = {
  path: 'times',
  select: 'id dateTime category',
};

const queryTypes = {
  year: 'getByYear',
  month: 'getByYearAndMonth',
  date: 'getByGivenPeriod'
};

const Constants = {
  monthNames,
  childPopulateObject,
  queryTypes
};

module.exports = Constants;
