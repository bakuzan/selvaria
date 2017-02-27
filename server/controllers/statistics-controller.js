const Constants = require('../constants');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const CategoryStatistic = require('../models/category-statistic.js');
const Time = require('../models/time.js');
const Common = require('./common-controller.js')();

module.exports = () => {
  const statisticsController = {
    getBreakdownData: (req, res) => {
      console.log('query for breakdown => ');
      Time.getForQueryRange(req.params, (err, times) => {
        if (err) return Common.handleErrorResponse(err, res);
        console.log('breakdownData : ', times.length);

        statisticsController.countCategoriesForQuery(times).then(queryCounts => {
          console.log('=> query counts : ', queryCounts);
          return statisticsController.countCategoriesForDaysOfWeek(times);
        }).then(dayOfWeekCounts => {
          console.log('=> day of week counts : ', dayOfWeekCounts);
          res.jsonp({ queryCounts, dayOfWeekCounts });
        });
      });
    },
    buildCountsBasedOnAttribute: (times, propertyName) => {
      const total = { category: Constants.propertyNames.total, count: 0 };
      const counts = [total];
      for(let i = 0, length = times.length; i < length; i++) {
        const time = times[i];
        const category = time[propertyName] || 'uncategorised';
        total.count++;

        let countGroup = counts.find(x => x[propertyName] === category);
        if(countGroup === undefined) {
          countGroup = { category, count: 1 };
          counts.push(countGroup);
          continue;
        }
        countGroup.count++;
      }
      console.log(`${propertyName} counts`);
      return counts.map(item => {
        console.log('test log inside map func');
        return new CategoryStatistic(item, total.count);
      });
    },
    countCategoriesForQuery: (times) => {
      return new Promise((resolve, reject) => {
        const counts = statisticsController.buildCountsBasedOnAttribute(times, Constants.propertyNames.category);
        resolve(counts);
      });
    },
    countCategoriesForDaysOfWeek: (times) => {
      return new Promise((resolve, reject) => {
        const counts = statisticsController.buildCountsBasedOnAttribute(times, Constants.propertyNames.dayOfWeek);
        resolve(counts);
      });
    }
  };

  return statisticsController;
};
