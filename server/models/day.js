const mongoose = require('mongoose');
const Time = require('./time.js');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DaySchema = new Schema({
  date: {
    type: Date,
    unique: true,
    required: true
  },
  times: [{
    type: ObjectId,
    ref: Time
  }]
});

DaySchema.virtual('dateString').get(() => {
  const date = this.date;
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const fullYear = date.getFullYear();
  return `${('0' + day).slice(-2)} ${monthIndex + 1} ${fullYear}`;
});

DaySchema.virtual('day').get(() => {
  return this.date.getDate();
});

DaySchema.virtual('month').get(() => {
  return this.date.getMonth() + 1;
});

DaySchema.virtual('year').get(() => {
  return this.date.getFullYear();
});

// Statics for querying.
DaySchema.statics.getByYear = function(year, callback) {
  year = Number(year);
  const params = { '$gte': new Date(year, 0, 1), '$lt': new Date(year, 11, 31)}
  return this.find({ date: params }, callback);
};

DaySchema.statics.getByYearAndMonth = function(year, month, callback) {
  let lessThanYear = Number(year);
  let nextMonth = Number(month) + 1;

  if (nextMonth > 11) {
    nextMonth = 0;
    lessThanYear = Number(year) + 1;
  }

  const params = { '$gte': new Date(year, month, 1), '$lt': new Date(lessThanYear, nextMonth, 1)}
  return this.find({ date: params }, callback);
};

module.exports = mongoose.model('Day', DaySchema);
