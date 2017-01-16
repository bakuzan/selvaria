const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TimeSchema = new Schema({
  dateTime: Date,
  category: {
    type: String,
    default: null
  }
});

TimeSchema.virtual('time').get(() => {
  const hh = this.dateTime.getHours();
  const mh = this.dateTime.getMinutes();
  return `${('0' + hh).slice(-2)}${('0' + mm).slice(-2)}`;
});

module.exports = mongoose.model('Time', TimeSchema);
