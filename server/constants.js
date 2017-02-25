const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
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

const propertyNames = {
  total: 'total'
};

const Constants = {
  dayNames,
  monthNames,
  childPopulateObject,
  queryTypes,
  propertyNames
};

module.exports = Constants;
