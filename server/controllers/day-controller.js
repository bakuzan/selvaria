const Constants = require('../constants');
const mongoose = require('mongoose');
const Day = require('../models/day.js');

module.exports = () => {
  return {
    getByYear: (req, res) => {
      Day.getByYear(req.params.year, (err, days) => {
        if (err) {
          console.error(chalk.red(err));
          return res.status(400).send({ error: err });
        } else {
          res.jsonp(days);
        }
      });
    },
    getByYearAndMonth: (req, res) => {
      Day.getByYearAndMonth(req.params.year, req.params.month, (err, days) => {
        if (err) {
          return res.status(400).send({ error: err });
          console.error(chalk.red(err));
        } else {
          res.jsonp(days);
        }
      });
    },
    save: (req, res) => {
      console.log('save this day', req.body);
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };
      const query = { _id: req.body._id || new mongoose.mongo.ObjectID() };

      Day.findOneAndUpdate(query, req.body, options, (err, day) => {
        if (err) {
          return res.status(400).send({ error: err });
          console.error(chalk.red(err));
        } else {
          Day.populate(day, Constants.childPopulateObject, function (err, day) {
            res.jsonp(day);
          });
        }
      });
    }
  };
};
