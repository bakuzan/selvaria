const Constants = require('../constants');

module.exports = () => {
  const commonService = {
    getDayOfWeek: (d) => {
      const date = new Date(d);
      const index = date.getDay();
      return Constants.dayNames[index];
    },
    getSunday: (d) => {
      d = new Date(d);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? 0 : 7);
      return new Date(d.setDate(diff));
    },
    getQueryTypeAndValues: ({ year, month, date }) => {
      if (date) return { queryType: Constants.queryTypes.getByGivenPeriod, queryValues: { year, month, date } };
      if (!date && month) return { queryType: Constants.queryTypes.getByYearAndMonth, queryValues: { year, month } };
      if (!date && !month) return { queryType: Constants.queryTypes.getByYear, queryValues: { year } };
    },
    constructQueryRangeFromParams: (params) => {
      console.log('construct query range : ', commonService, params);
      const { queryType, queryValues } = commonService.getQueryTypeAndValues(params);
      switch(queryType) {
        case Constants.queryTypes.getByGivenPeriod:
          return commonService.buildTwoWeekPeriodQuery(queryValues);
        case Constants.queryTypes.getByYearAndMonth:
          return commonService.buildMonthQuery(queryValues);
        case Constants.queryTypes.getByYear:
          return commonService.buildYearQuery(queryValues);
        default:
          console.log('no query range found - defaulting to year query.');
          return commonService.buildYearQuery(queryValues);
      }
    },
    buildTwoWeekPeriodQuery: ({ year, month, date }) => {
      const day = new Date(year, month, date);
      const comingSunday = commonService.getSunday(day);
      const mondayLastWeek = new Date(comingSunday);
      mondayLastWeek.setDate(mondayLastWeek.getDate() - 13);

      return { $gte: mondayLastWeek, $lte: comingSunday };
    },
    buildMonthQuery: ({ year, month }) => {
      const lessThanYear = Number(year);
      const nextMonth = Number(month) + 1;

      return { $gte: new Date(year, month, 1), $lt: new Date(year, nextMonth, 1) };
    },
    buildYearQuery: ({ year }) => {
      const firstDay = new Date(year, 0, 1);
      const nextYear = new Date(firstDay);
      nextYear.setYear(nextYear.getFullYear() + 1);

      return { $gte: firstDay, $lt: nextYear };
    },
    handleErrorResponse: (err, res) => {
      console.error(chalk.red(err));
      return res.status(400).send({ error: err });
    }
  };

  return commonService;
}
