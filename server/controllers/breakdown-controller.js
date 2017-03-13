const Constants = require('../constants');
const CommonController = require('./common-controller.js')();

module.exports = () => {
  const breakdown = {
    performFunctionsOnCounts: (categoryCounts) => {
      const minimumsAndMaximums = [];
      let total;
      const totalDays = CommonController.findDistinct(categoryCounts, 'date').length;
      for (let i = 0, length = Constants.categories.length; i < length; i++) {
        const category = Constants.categories[i].name;
        const items = categoryCounts.filter(x => x.category === category);
        if (items.length === 0) continue;

        const min = breakdown.getObjectWithMinimum(items);
        const max = breakdown.getObjectWithMaximum(items);
        total = category === 'work' ? CommonController.findDistinct(items, 'date').length : totalDays;
        const average = breakdown.calculateAverageOccurance(items, total);
        minimumsAndMaximums.push({ min, max, average, category });
      }
      // console.log('min-max-avg : ', minimumsAndMaximums);
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
    }
  };

  return breakdown;
}
