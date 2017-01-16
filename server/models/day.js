const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DaySchema = new Schema({
  dateInTicks: Number,
  times: [{
    type: ObjectId,
    ref: Time
  }]
});

DaySchema.virtual('date').get(() => {
  const date = new Date(this.dateInTicks);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const fullYear = date.getFullYear();
  return `${('0' + day).slice(-2)} ${monthIndex + 1} ${fullYear}`;
});

DaySchema.virtual('day').get(() => {
  const date = new Date(this.dateInTicks);
  return date.getDate();
});

DaySchema.virtual('month').get(() => {
  const date = new Date(this.dateInTicks);
  return date.getMonth() + 1;
});

DaySchema.virtual('year').get(() => {
  const date = new Date(this.dateInTicks);
  return date.getFullYear();
});

module.exports = mongoose.model('Day', DaySchema);
