import CommonService from './common-functions';
import DayQuery from './day-query';
import TimeQuery from './time-query';

class Query {
  constructor() {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
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
  getTimeBlockModel(id, dateTime) {
    return { dateTime: new Date(dateTime), time: id, category: null, isEditMode: false };
  }
  getTimeSheetHeader() {
    let array = [];
    const day = new Date();
    for(let i = 0; i < 24; i++) {
      let dateTime = day;
      dateTime.setHours(i);
      dateTime.setMinutes(0);
      array.push(this.getTimeBlockModel(i, dateTime));
      dateTime.setMinutes(30);
      array.push(this.getTimeBlockModel(`${i}30`, dateTime));
    }
    return array;
  }
  createTimeBlock(id, dateTime, array) {
    const timeBlock = this.getTimeBlockModel(id, dateTime);
    TimeQuery.save(timeBlock).then(savedTime => {
      array.push(savedTime);
    }).catch(error => CommonService.handleErrorResponse(error));
  }
  getTimeBlocks(day = new Date()) {
    return new Promise(resolve => {
      let array = [];
      for(let i = 0; i < 24; i++) {
        let dateTime = day;
        dateTime.setHours(i);
        dateTime.setMinutes(0);
        this.createTimeBlock(i, dateTime, array);
        dateTime.setMinutes(30);
        this.createTimeBlock(`${i}30`, dateTime, array);
      }
      resolve(array);
    });
  }
  getDays(latestDate) {
    return new Promise(resolve => {
      let days = [];
      const day = latestDate ? new Date(latestDate) : new Date(2017, 0, 1, 0, 0); // 01/01/2017

      this.getTimeBlocks(day).then(timeBlocks => {
        console.log('saving time blocks: ', timeBlocks);
        const dayObj = {
          date: day,
          times: timeBlocks
        };

        DayQuery.save(dayObj).then(response => {
          console.log('saved day: ', response);
          days.push(response);
        }).catch(error => CommonService.handleErrorResponse(error));
      });

      resolve(days);
    });
  }
}

export default new Query();
