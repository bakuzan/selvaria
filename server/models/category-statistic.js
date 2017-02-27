class CategoryStatistic {
  constructor({ category, count }, total) {
    this.category = category;
    this.count = count;

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
