import { paths } from '../../constants/paths.js';
import Query from './query';

class DayQuery {
  getByYear({ year }) {
    console.log('days by year: ', year);
    const url = paths.build(paths.query.daysByYear, { year });
    return Query.fetchFromServer(url);
  }
  getByYearAndMonth({ year, month }) {
    console.log('days by year and month: ', year, month);
    const url = paths.build(paths.query.daysByYearAndMonth, { year, month });
    return Query.fetchFromServer(url);
  }
  getByGivenPeriod({ date }) {
    const dateParts = date.split('-');
    const url = paths.build(paths.query.daysByGivenPeriod, { year: dateParts[0], month: dateParts[1], day: dateParts[2] });
    return Query.fetchFromServer(url);
  }
  save(dayObject) {
    console.log('saving: ', dayObject);
    const url = paths.query.daysSave;
    return Query.fetchFromServer(url, 'POST', dayObject);
  }
}

export default new DayQuery();