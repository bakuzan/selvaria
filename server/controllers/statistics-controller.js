const Constants = require('../constants');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const CategoryStatistic = require('../models/category-statistic.js');
const Time = require('../models/time.js');
const Common = require('./common-controller.js')();
const BreakdownService = require('./breakdown-service.js')();

module.exports = () => {
  const statisticsController = {
    getBreakdownData: (req, res) => {
      console.log('query for breakdown => ');
      Time.getForQueryRange(req.params, (err, times) => {
        if (err) return Common.handleErrorResponse(err, res);
        console.log('breakdownData : ', times.length);
        const result = { queryCounts: [], dayOfWeekCounts: [] };
        statisticsController.countCategoriesForQuery(times).then(queryCounts => {
          console.log('=> query counts : ', queryCounts.length);
          result.queryCounts = queryCounts;
          return statisticsController.countCategoriesForDaysOfWeek(times);
        }).then(dayOfWeekCounts => {
          console.log('=> day of week counts : ', dayOfWeekCounts.length);
          res.jsonp(Object.assign(result, { dayOfWeekCounts }));
        });
      });
    },
    buildCountsBasedOnCategory: (times) => {
      const total = { category: Constants.propertyNames.total, count: 0 };
      const counts = [total];
      for(let i = 0, length = times.length; i < length; i++) {
        const time = times[i];
        const category = time.category || 'uncategorised';
        total.count++;

        let countGroup = counts.find(x => x.category === category);
        if(countGroup === undefined) {
          countGroup = { category, count: 1, time };
          counts.push(countGroup);
          continue;
        }
        countGroup.count++;
      }
      return counts.map(item => new CategoryStatistic(item, total.count));
    },
    countCategoriesForQuery: (times) => {
      return new Promise((resolve, reject) => {
        const counts = statisticsController.buildCountsBasedOnCategory(times);
        resolve(counts);
      });
    },
    countCategoriesForDaysOfWeek: (times) => {
      return new Promise((resolve, reject) => {
        const counts = [];
        for(let i = 0, length = Constants.dayNames.length; i < length; i++) {
          const dayName = Constants.dayNames[i];
          const timesForDay = times.filter(x => x.dayOfTheWeek === dayName);
          const occurancesOfDay = timesForDay.length / 48;
          const dayCounts = statisticsController.buildCountsBasedOnCategory(timesForDay);
          counts.push({
            dayName,
            occurancesOfDay,
            counts: dayCounts,
            minimum: BreakdownService.calculateMinimumCount(),
            maximum: BreakdownService.calculateMaximumCount(),
            average: BreakdownService.calculateAverageCounts(),
          });
        }
        resolve(counts);
      });
    }
  };

  return statisticsController;
};
