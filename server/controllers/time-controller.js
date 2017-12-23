const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // mongoose mpromise is deprecated...so use native.

const Common = require('./common-controller.js')();
const Time = require('../models/time.js');

module.exports = () => {
  return {
    getByDay: (req, res) => {
      Time.getByDay(req.params.day, (err, times) => {
        if (err) return Common.handleErrorResponse(err, res);
        res.jsonp(times);
      });
    },
    save: (req, res) => {
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };
      const query = { _id: req.body._id || new mongoose.mongo.ObjectID() };

      Time.findOneAndUpdate(query, req.body, options, (err, time) => {
        if (err) return Common.handleErrorResponse(err, res);
        res.jsonp(time);
      });
    }
  };
};
