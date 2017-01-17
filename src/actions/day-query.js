import paths from '../constants/paths';

class DayQuery {
  setOptions(method, body) {
    return {
      method: method,
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }
  fetchFromServer: (url, method = 'GET', body = null) => {
    const options = this.setOptions(method, body);
    return fetch(url, options).then((response) => {
      return response.json();
    });
  },
  getByYear(year) {
    const url = paths.build(paths.query.daysByYear, { year });
    return this.fetchFromServer(url);
  },
  getByYearAndMonth(year, month) {
    const url = paths.build(paths.query.daysByYearAndMonth, { year, month });
    return this.fetchFromServer(url);
  },
  save(dayObject) {
    const url = path.query.daysSave;
    return this.fetchFromServer(url, 'POST', dayObject);
  }
}

export default new DayQuery();
