const Constants = require('../constants');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const Common = require('./common-controller.js')();
const Day = require('../models/day.js');
const Time = require('../models/time.js');

module.exports = () => {
  return {
    getByYear: (req, res) => {
      Day.getByYear(req.params.year, (err, days) => {
        if (err) return Common.handleErrorResponse(err, res);
        res.jsonp(days);
      });
    },
    getByYearAndMonth: (req, res) => {
      Day.getByYearAndMonth(req.params.year, req.params.month, (err, days) => {
        if (err) return Common.handleErrorResponse(err, res);
        res.jsonp(days);
      });
    },
    getByGivenPeriod: (req, res) => {
      Day.getByGivenPeriod(
        req.params.year,
        req.params.month,
        req.params.date,
        (err, days) => {
          if (err) return Common.handleErrorResponse(err, res);
          res.jsonp(days);
        }
      );
    },
    save: (req, res) => {
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };
      const query = { _id: req.body._id || new mongoose.mongo.ObjectID() };

      Day.findOneAndUpdate(query, req.body, options, (err, savedDay) => {
        if (err) return Common.handleErrorResponse(err, res);
        Day.populate(savedDay, Constants.childPopulateObject, function(
          err,
          result
        ) {
          res.jsonp(savedDay);
        });
      });
    },
    delete: (req, res) => {
      const _id = req.params.id;

      Day.findById(_id, (err, dayItem) => {
        if (err) return Common.handleErrorResponse(err, res);
        if (!dayItem) {
          return Common.handleErrorResponse(
            `Day not found for Id: ${_id}`,
            res
          );
        }

        const timeIds = dayItem.times;
        Time.remove({ _id: { $in: [...timeIds] } }, (removeErr) => {
          if (removeErr) return Common.handleErrorResponse(removeErr, res);

          Day.remove({ _id }, (error) => {
            if (error) return Common.handleErrorResponse(error, res);
            res.jsonp({ success: true });
          });
        });
      });
    }
  };
};
