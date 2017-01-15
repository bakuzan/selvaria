const mongoose = require('mongoose');
const = Schema = mongoose.Schema;

const DaySchema = new Schema({
  dateInTicks: Number,
  times: [{
    type: Schema.ObjectId,
    ref: Time
  }]
});

DaySchema.virtual('date').get(() => {
  const date = new Date(this.dateInTicks);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const fullYear = date.getFullYear();
  return `${this.padNumber(day, 2)} ${this.monthNames[monthIndex]} ${fullYear}`;
});

mongoose.model('Day', DaySchema);
