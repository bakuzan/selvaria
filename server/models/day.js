const Constants = require('../constants');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Common = require('../controllers/common-controller.js')();

const DaySchema = new Schema({
  date: {
    type: Date,
    unique: true,
    required: true
  },
  times: [{
    type: ObjectId,
    ref: 'Time'
  }]
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

DaySchema.virtual('dateString').get(function() {
  const date = new Date(this.date);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const fullYear = date.getFullYear();
  return `${(`0${day}`).slice(-2)} ${Constants.monthNames[monthIndex]} ${fullYear}`;
});

DaySchema.virtual('day').get(function() {
  const date = new Date(this.date);
  return date.getDate();
});

DaySchema.virtual('month').get(function() {
  const date = new Date(this.date);
  return date.getMonth() + 1;
});

DaySchema.virtual('year').get(function() {
  const date = new Date(this.date);
  return date.getFullYear();
});

DaySchema.virtual('daysSinceRecordsBegan').get(function() {
  const start = new Date(2017, 0, 1);
  const date = new Date(this.date);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (24*60*60*1000));
});

DaySchema.virtual('dayOfTheWeek').get(function() {
  return Common.getDayOfWeek(this.date);
});

// Statics for querying.
DaySchema.statics.getByYear = function(year, callback) {
  const params = Common.buildYearQuery({ year });
  return this.find({ date: params }).populate(Constants.childPopulateObject).exec(callback);
};

DaySchema.statics.getByYearAndMonth = function(year, month, callback) {
  const params = Common.buildMonthQuery({ year, month });
  return this.find({ date: params }).populate(Constants.childPopulateObject).exec(callback);
};

DaySchema.statics.getByGivenPeriod = function(year, month, date, callback) {
  const params = Common.buildTwoWeekPeriodQuery({ year, month, date });
  return this.find({ date: params }).populate(Constants.childPopulateObject).exec(callback);
};

module.exports = mongoose.model('Day', DaySchema);
