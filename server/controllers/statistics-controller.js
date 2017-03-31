const Constants = require('../constants');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const CategoryStatistic = require('../models/category-statistic.js');
const Time = require('../models/time.js');
const CommonController = require('./common-controller.js')();
const BreakdownController = require('./breakdown-controller.js')();

module.exports = () => {
  const statisticsController = {
    getBreakdownData: (req, res) => {
      console.log('query for breakdown => ');
      Time.getForQueryRange(req.params, (err, times) => {
        if (err) return CommonController.handleErrorResponse(err, res);
        console.log('breakdownData : ', times.length);
        const result = { totals: {} };
        statisticsController.countCategoriesForQuery(times).then(totals => {
          console.log('=> query counts : ', totals.counts.length);
          result.totals = totals;
          return statisticsController.countCategoriesForDaysOfWeek(times);
        }).then(dayOfWeekCounts => {
          console.log('=> day of week counts : ', dayOfWeekCounts.length);
          res.jsonp(Object.assign({}, result, { dayOfWeekCounts }));
        });
      });
    },
    buildCountsBasedOnCategory: (times) => {
      const total = { time: null, category: Constants.propertyNames.total, count: 0 };
      const counts = [total];
      for(let i = 0, length = times.length; i < length; i++) {
        const time = times[i];
        const category = time.category || 'uncategorised';
        total.count++;

        let countGroup = counts.find(x => x.category === category);
        if(countGroup) {
          countGroup.count++;
          continue;
        }
        countGroup = Object.assign({}, { time, category, count: 1 });
        counts.push(countGroup);
      }
      // console.log('build counts ', counts);
      return counts.map(item => new CategoryStatistic(item, total.count));
    },
    buildMathsFunctions: (times) => {
      const counts = [];
      const groupedTimes = CommonController.groupBy(times, item => [ item.dateTime.toLocaleDateString() ]);
      for(let i = 0, length = groupedTimes.length; i < length; i++) {
        counts.push(...statisticsController.buildCountsBasedOnCategory(groupedTimes[i]));
      }
      return BreakdownController.performFunctionsOnCounts(counts);
    },
    countCategoriesForQuery: (times) => {
      return new Promise((resolve, reject) => {
        const counts = statisticsController.buildCountsBasedOnCategory(times);
        const numberOfDays = times.length / 48;
        const countsBreakdown = statisticsController.buildMathsFunctions(times);

        resolve(Object.assign({}, {
          numberOfDays,
          counts,
          countsBreakdown
        }));
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
          const countsBreakdown = statisticsController.buildMathsFunctions(timesForDay);

          counts.push({
            dayName,
            occurancesOfDay,
            counts: dayCounts,
            countsBreakdown
          });
        }
        resolve(counts);
      });
    }
  };

  return statisticsController;
};
