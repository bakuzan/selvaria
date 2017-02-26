
module.exports = () => {
  const categoryStatistic = () => {
    create: (category, count, total) => {
      const obj = {};
      console.log('CategoryStatistic constructor: ', obj);
      obj.category = category;
      obj.count = count;

      this.setHours(obj);
      this.setPercentage(obj, total);
    },
    setHours: (obj) => {
      obj.hours = `${Math.round(obj.count / 2)}h`;
    },
    setPercentage: (obj, total) => {
      obj.percentage = `${parseFloat(Math.round(obj.count / total) * 100).toFixed(2)}%`;
    }
  };

  return categoryStatistic;
};
