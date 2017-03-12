class CategoryStatistic {
  constructor({ time, category, count }, total) {
    this.category = category;
    this.count = count;
    // console.log('stat args : ', !!time ? time.dateTime : 'time is falsey');
    this.date = !!time && !!time.dateTime ? time.dateTime.toISOString().split('T')[0] : null;

    this.setHours();
    this.setPercentage(total);
  }
  setHours() {
    this.hours = `${(this.count / 2).toFixed(1)}h`;
  }
  setPercentage(total) {
    this.percentage = `${parseFloat((this.count / total) * 100).toFixed(2)}%`;
  }
}

module.exports = CategoryStatistic;
