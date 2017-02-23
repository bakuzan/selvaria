const Constants = require('../constants');

module.exports = () => {
  return {
    getSunday: (d) => {
      d = new Date(d);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? 0 : 7);
      return new Date(d.setDate(diff));
    }
    getQueryTypeAndValues({ year, month, date }) {
      if (date) return { queryType: Constants.queryTypes.getByGivenPeriod, queryValues: { year, month, date } };
      if (!date && month) return { queryType: Constants.queryTypes.getByYearAndMonth, queryValues: { year, month } };
      if (!date && !month) return { queryType: Constants.queryTypes.getByYear, queryValues: { year } };
    }
    handleErrorResponse(err, res) {
      console.error(chalk.red(err));
      return res.status(400).send({ error: err });
    }
  };
}
