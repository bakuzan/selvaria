const Constants = require('../constants');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const Day = require('../models/day.js');
const Common = require('./common-controller.js')();

module.exports = () => {
  return {
    getBreakdownData: (req, res) => {
      const { queryType, queryValues } = Common.getQueryTypeAndValues(req.params);
      console.log('query for breakdown : ', queryType, queryValues);
      Day[queryType](...queryValues, (err, days) => {
        if (err) return Common.handleErrorResponse(err, res);
        console.log('breakdownData : ', days.length);
      });
    }
  };
};
