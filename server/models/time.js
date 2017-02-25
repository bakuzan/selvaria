const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Common = require('../controllers/common-controller.js')();

const TimeSchema = new Schema({
  dateTime: {
    type: Date,
    unique: true,
    require: true
  },
  category: {
    type: String,
    default: null
  }
}, {
  toObject: {
    virtuals: true,
    getters: true
  },
  toJSON: {
    virtuals: true,
    getters: true
  }
});

TimeSchema.virtual('time').get(function() {
  const date = new Date(this.dateTime);
  const hh = date.getHours();
  const mm = date.getMinutes();
  return `${('0' + hh).slice(-2)}${('0' + mm).slice(-2)}`;
});

TimeSchema.virtual('dayOfTheWeek').get(function() {
  return Common.getDayOfWeek(this.dateTime);
});

// Statics for querying.
TimeSchema.statics.getByDay = function(dateString, callback) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const params = { $gte: new Date(year, month, day, 0, 0), $lt: new Date(year, month, day, 23, 59) };
  return this.find({ dateTime: params }, callback);
};

TimeSchema.statics.getForQueryRange = function(params, callback) {
  const queryRange = Common.constructQueryRangeFromParams(params);
  return this.find({ dateTime: queryRange }, callback);
};

module.exports = mongoose.model('Time', TimeSchema);
