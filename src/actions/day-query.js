import { paths } from '../constants/paths.js';
import Query from './query';

class DayQuery {
  getByYear(year) {
    const url = paths.build(paths.query.daysByYear, { year });
    return Query.fetchFromServer(url);
  }
  getByYearAndMonth(year, month) {
    const url = paths.build(paths.query.daysByYearAndMonth, { year, month });
    return Query.fetchFromServer(url);
  }
  save(dayObject) {
    console.log('saving: ', dayObject);
    const url = paths.query.daysSave;
    return Query.fetchFromServer(url, 'POST', dayObject);
  }
}

export default new DayQuery();
