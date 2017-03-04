class CategoryStatistic {
  constructor({ dateTime, category, count }, total) {
    this.category = category;
    this.count = count;
    console.log('cat stat: ', dateTime);
    this.date = dateTime.split('T')[0];

    this.setHours();
    this.setPercentage(total);
  }
  setHours() {
    this.hours = `${Math.round(this.count / 2)}h`;
  }
  setPercentage(total) {
    this.percentage = `${parseFloat((this.count / total) * 100).toFixed(2)}%`;
  }
}

module.exports = CategoryStatistic;
