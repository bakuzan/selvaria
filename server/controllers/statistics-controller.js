const Constants = require('../constants');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const Time = require('../models/time.js');
const Common = require('./common-controller.js')();

module.exports = () => {
  const statisticsController = {
    getBreakdownData: (req, res) => {
      console.log('query for breakdown => ');
      Time.getForQueryRange(req.params, (err, times) => {
        if (err) return Common.handleErrorResponse(err, res);
        console.log('breakdownData : ', times.length);

        return statisticsController.countCategoriesForQuery(times).then(counts => {
          console.log('=> counts : ', counts);
          res.jsonp(counts);
        });
      });
    },
    countCategoriesForQuery: (times) => {
      return new Promise((resolve, reject) => {
        const counts = [{ category: Constants.propertyNames.total, count: 0 }];
        for(let i = 0, length = times.length; i < length; i++) {
          const time = times[i];
          const category = time.category || 'uncategorised';
          const total = counts.find(x => x.category === Constants.propertyNames.total);
          total.count++;

          let countGroup = counts.find(x => x.category === category);
          if(countGroup === null) {
            countGroup = { category, count: 1 };
            continue;
          }
          countGroup.count++;
        }
        resolve(counts);
      });
    }
  };

  return statisticsController;
};
