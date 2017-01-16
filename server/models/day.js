const mongoose = require('mongoose');
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

module.exports = mongoose.model('Day', DaySchema);
