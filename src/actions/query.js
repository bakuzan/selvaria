import DayQuery from './day-query';
import TimeQuery from './time-query';

class Query {
  constructor() {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const fullYear = date.getFullYear();
    return `${this.padNumber(day, 2)} ${this.monthNames[monthIndex]} ${fullYear}`;
  }
  padNumber(n, width, z) {
    z = z || '0';
    n += '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  createTimeBlock(id, array) {
    const timeBlock = { id: this.padNumber(id, 4), dateTime: new Date(dateTime), time: id, category: null, isEditMode: false };
    TimeQuery.save(timeBlock).then(savedTime => {
      console.log('created time block: ', savedTime);
      array.push(savedTime);
    });
  }
  getTimeBlocks(day = new Date()) {
    return new Promise(resolve => {
      let array = [];
      for(let i = 0; i < 24; i++) {
        let dateTime = day;
        dateTime.setHours(i);
        dateTime.setMinutes(0);
        this.createTimeBlock(i, array);
        dateTime.setMinutes(30);
        this.createTimeBlock(`${i}30`, array);
      }
      resolve(array);
    });
  }
  getDays(latestDate) {
    return new Promise(resolve => {
      const today = Date.now();
      let days = [];
      let day = latestDate ? new Date(latestDate) : new Date(2017, 0, 1, 0, 0); // 01/01/2017

      while(day < today) {
        const date = new Date(day);
        this.getTimeBlocks(new Date(date)).then(timeBlocks => {
          const dayObj = {
            date: date,
            dateString: this.formatDate(date),
            times: timeBlocks
          };

          DayQuery.save(dayObj).then(response => {
            console.log('saved day: ', response);
            days.push(response);
          });
          day.setDate(day.getDate() + 1);
        });
      }
      resolve(days);
    });
  }
}

export default new Query();
