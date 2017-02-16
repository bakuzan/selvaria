import update from 'immutability-helper';
import Constants from '../constants/values';

class DataService {
  canGetNextDay(date, query) {
    const latestDate = new Date(date);
    latestDate.setHours(0,0,0,0);
    latestDate.setDate(latestDate.getDate() + 1);
    const lastDay = {
      month: query.month ? query.month + 1 : 0,
      year: query.month ? query.year : query.year + 1,
    };
    const lastDateOfQuery = new Date(lastDay.year, lastDay.month, 0, 23, 59, 59);
    return latestDate.getTime() < lastDateOfQuery.getTime();
  }
  getQueryStartDate(query) {
    const month = query.month || 0;
    return new Date(query.year, month, 0);
  }
  getQueryTypeFromValues({ year, month, date }) {
    if (date && month) return Constants.strings.date;
    if (!date && month) return Constants.strings.month;
    if (!date && !month) return Constants.strings.year;
  }
  updateQueryValues(queryValues, property, newValue) {
    let updatedQuery = update(queryValues, {
      [property]: { $set: newValue }
    });
    return update(updatedQuery, {
      date: { $set: updatedQuery.month ? updatedQuery.date : '' }
    });
  }
}

export default new DataService();
