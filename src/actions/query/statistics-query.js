import { paths } from '../../constants/paths.js';
import Query from './query';

class StatisticsQuery {
  getBreakdownData(query) {
    const url = paths.build(paths.query.breakdownData, query);
    return Query.fetchFromServer(url);
  }
}

export default new StatisticsQuery();
