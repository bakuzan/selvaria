import update from 'immutability-helper';
import TimeQuery from './query/time-query';
import CommonService from './common-functions';
import Constants from '../constants/values';

class DataService {
  canGetNextDay(date, query) {
    const latestDate = new Date(date);
    latestDate.setHours(0,0,0,0);
    latestDate.setDate(latestDate.getDate() + 1);

    let lastDayDate = 0;
    let lastDayMonth = query.month ? query.month + 1 : 0;
    let lastDayYear = query.month ? query.year : query.year + 1;
    if (query.date) {
      const theDate = CommonService.getSunday(new Date(query.year, query.month, query.date));
      lastDayDate = theDate.getDate();
      lastDayMonth = theDate.getMonth();
      lastDayYear = theDate.getFullYear();
    }

    const lastDateOfQuery = new Date(lastDayYear, lastDayMonth, lastDayDate, 23, 59, 59);
    return latestDate.getTime() < lastDateOfQuery.getTime();
  }
  getQueryStartDate(query) {
    const month = query.month || 0;
    return new Date(query.year, month, 0);
  }
  getQueryTypeFromValues({ year, month, date }) {
    if (date && month) return Constants.queryTypes.date;
    if (!date && month) return Constants.queryTypes.month;
    if (!date && !month) return Constants.queryTypes.year;
  }
  updateQueryValues(queryValues, property, newValue) {
    let updatedQuery = update(queryValues, {
      [property]: { $set: newValue }
    });
    return update(updatedQuery, {
      date: { $set: updatedQuery.month ? updatedQuery.date : '' }
    });
  }
  mirrorDayCategories(day, dayToMirror) {
    const updatedTimes = day.times.map((item, index) => {
      const reflectedTime = update(item, { category: { $set: dayToMirror.times[index].category } });
      return TimeQuery.save(reflectedTime).then(response => {
        console.log(response);
        return response;
      });
    });
    Promise.all(updatedTimes).then(times => {
      return update(day, { times: { $set: updatedTimes } }));
    });
  }
}

export default new DataService();
