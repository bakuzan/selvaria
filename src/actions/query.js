import CommonService from './common-functions';
import DayQuery from './day-query';
import TimeQuery from './time-query';
import Constants from '../contants/values';

class Query {
  constructor() {
    this.monthNames = Constants.monthNames;
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
    return TimeQuery.save(timeBlock);
  }
  getTimeBlocks(day = new Date()) {
    let array = [];
    for(let i = 0; i < 24; i++) {
      let dateTime = new Date(day);
      dateTime.setHours(i);
      dateTime.setMinutes(0);
      array.push(this.createTimeBlock(i, dateTime));
      dateTime.setMinutes(30);
      array.push(this.createTimeBlock(`${i}30`, dateTime));
    }
    return Promise.all(array);
  }
  getNextDay(latestDate) {
    return new Promise(resolve => {
      let days = [];
      let day = new Date(2017, 0, 1, 0, 0);
      if (latestDate) {
        const latest = new Date(latestDate);
        if (latest.getTime() < new Date().getTime()) {
          day = latest;
          day.setDate(day.getDate() + 1);
        }
      }

      this.getTimeBlocks(day).then(timeBlocks => {
        console.log('saving time blocks: ', timeBlocks);
        const dayObj = {
          date: day,
          times: timeBlocks
        };

        DayQuery.save(dayObj).then(response => {
          console.log('saved day: ', response);
          //response.times = timeBlocks;
          days.push(response);
          resolve(days);
        }).catch(error => CommonService.handleErrorResponse(error));
      });
    });
  }
}

export default new Query();
