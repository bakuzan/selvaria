const Constants = require('../constants');
const CommonController = require('./common-controller.js')();
const CategoryStatistic = require('../models/category-statistic.js');

module.exports = () => {
  const breakdown = {
    performFunctionsOnCounts: (categoryCounts) => {
      const minimumsAndMaximums = [];
      let total;
      const totalDays = CommonController.findDistinct(categoryCounts, 'date').length;
      for (let i = 0, length = Constants.categories.length; i < length; i++) {
        const category = Constants.categories[i].name;
        const isWork = category === 'work';
        const items = categoryCounts.filter(x => x.category === category);
        if (items.length === 0) continue;

        const daysOccuredOn = CommonController.findDistinct(items, 'date').length;
        total = isWork ? daysOccuredOn : totalDays;

        const min = daysOccuredOn === total || isWork ? breakdown.getObjectWithMinimum(items) : breakdown.unoccuredMinimum(category, total);
        const max = breakdown.getObjectWithMaximum(items);
        const average = breakdown.calculateAverageOccurance(items, total);

        minimumsAndMaximums.push({ min, max, average, category });
      }
      return minimumsAndMaximums;
    },
    getObjectWithMinimum: (array) => {
      return CommonController.reduceArrayWith(array, (prev, curr) => prev < curr);
    },
    getObjectWithMaximum: (array) => {
      return CommonController.reduceArrayWith(array, (prev, curr) => prev > curr);
    },
    calculateAverageOccurance: (array, total) => {
      let i = array.length;
      let sum = 0;
      while (i--) {
        sum += array[i].count;
      }
      return (sum / total).toFixed(2);
    },
    unoccuredMinimum: (category, total) => {
      const item = Object.assign({}, {
        time: null,
        category,
        count: 0
      });
      return Object.assign({}, new CategoryStatistic(item, total));
    }
  };

  return breakdown;
}
