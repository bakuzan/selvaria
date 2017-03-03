const categories = [
  { name: 'anime' }, { name: 'develop' }, { name: 'exercise' },
  { name: 'gaming' }, { name: 'manga' }, { name: 'other' },
  { name: 'passing' }, { name: 'sleep' }, { name: 'social' },
  { name: 'wasted' }, { name: 'work' }
];

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
  total: 'total',
  dayOfWeek: 'dayOfTheWeek',
  category: 'category'
};

const Constants = {
  categories,
  dayNames,
  monthNames,
  childPopulateObject,
  queryTypes,
  propertyNames
};

module.exports = Constants;
