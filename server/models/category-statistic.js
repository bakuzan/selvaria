class CategoryStatistic {
  constructor({ time, category, count }, total) {
    this.category = category;
    this.count = count;
    // console.log('stat args : ', !!time ? time.dateTime : 'time is falsey');
    this.date = !!time && !!time.dateTime ? time.dateTime.toLocaleDateString() : null;

    this.setHours();
    this.setPercentage(total);
  }
  setHours() {
    const hours = (this.count / 2).toFixed(2);
    const parts = hours.split('.');
    const hoursString = `${parts[0]}h`;
    const minutes = (hours - parts[0]) * 60;
    const minutesString = minutes > 0 ? `${minutes}m` : null;
    this.hours = `${hoursString}${minutesString ? ` ${minutesString}` : ''}`;
  }
  setPercentage(total) {
    this.percentage = `${parseFloat((this.count / total) * 100).toFixed(2)}%`;
  }
}

module.exports = CategoryStatistic;
