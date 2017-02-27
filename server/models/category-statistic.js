class CategoryStatistic {
  constructor({ category, count }, total) {
    console.log('CategoryStatistic constructor: ');
    this.category = category;
    this.count = count;

    this.setHours();
    this.setPercentage(total);
  }
  setHours() {
    this.hours = `${Math.round(this.count / 2)}h`;
  }
  setPercentage(total) {
    this.percentage = `${parseFloat(Math.round(this.count / total) * 100).toFixed(2)}%`;
  }
}

module.exports = CategoryStatistic;
