import { paths } from '../constants/paths.js';

class TimeQuery {
  setOptions(method, body) {
    return {
      method: method,
      body: body ? JSON.stringify(body) : body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }
  fetchFromServer(url, method = 'GET', body = null) {
    const options = this.setOptions(method, body);
    return fetch(url, options).then((response) => {
      return response.json();
    });
  }
  getByDay(date) {
    const day = date.toISOString();
    const url = paths.build(paths.query.timeByDay, { day });
    return this.fetchFromServer(url);
  }
  save(timeObject) {
    console.log('saving: ', timeObject);
    const url = paths.query.timeSave;
    return this.fetchFromServer(url, 'POST', timeObject);
  }
}

export default new TimeQuery();
