const chalk = require('chalk');
const Constants = require('../constants');

module.exports = () => {
  const commonService = {
    reduceArrayWith: (array, mathFunction) => {
      return array.reduce((prev, curr) => {
        return mathFunction(prev.count, curr.count) ? prev : curr;
      });
    },
    findDistinct: (array, property) => {
      const unique = {};
      const distinct = [];
      array.forEach(x => {
        const value = x[property];
        if(!unique[value]) {
          distinct.push(value);
          unique[value] = true;
        }
      });
      return distinct;
    },
    groupBy: (array, f) => {
      const groups = {};
      array.forEach(o => {
        let group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      return Object.keys(groups).map(group => groups[group]);
    },
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
      // console.log('values : ', year, month, date);
      if (date) return { queryType: Constants.queryTypes.date, queryValues: { year, month, date } };
      if (!date && month) return { queryType: Constants.queryTypes.month, queryValues: { year, month } };
      if (!date && !month) return { queryType: Constants.queryTypes.year, queryValues: { year } };
    },
    constructQueryRangeFromParams: (params) => {
      const { queryType, queryValues } = commonService.getQueryTypeAndValues(params);
      // console.log('constructor: ', queryType, queryValues);
      switch(queryType) {
        case Constants.queryTypes.date:
          return commonService.buildTwoWeekPeriodQuery(queryValues);
        case Constants.queryTypes.month:
          return commonService.buildMonthQuery(queryValues);
        case Constants.queryTypes.year:
          return commonService.buildYearQuery(queryValues);
        default:
          console.log('no query range found - defaulting to year query.');
          return commonService.buildYearQuery(queryValues);
      }
    },
    buildTwoWeekPeriodQuery: ({ year, month, date }) => {
      console.log(`period query: ${year}-${month}-${date}`);
      const day = new Date(year, month, date);
      const comingSunday = commonService.getSunday(day);
      const mondayLastWeek = new Date(comingSunday);
      mondayLastWeek.setDate(mondayLastWeek.getDate() - 13);

      return { $gte: mondayLastWeek, $lte: comingSunday };
    },
    buildMonthQuery: ({ year, month }) => {
      console.log(`month query: ${year}-${month}`);
      const lessThanYear = Number(year);
      const nextMonth = Number(month) + 1;

      return { $gte: new Date(year, month, 1), $lt: new Date(year, nextMonth, 1) };
    },
    buildYearQuery: ({ year }) => {
      console.log(`year query: ${year}`);
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
