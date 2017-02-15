import { paths } from '../../constants/paths.js';
import Query from './query';

class TimeQuery {
  getByDay(date) {
    const day = date.toISOString();
    const url = paths.build(paths.query.timeByDay, { day });
    return Query.fetchFromServer(url);
  }
  save(timeObject) {
    const url = paths.query.timeSave;
    return Query.fetchFromServer(url, 'POST', timeObject);
  }
}

export default new TimeQuery();
