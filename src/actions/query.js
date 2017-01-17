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
  getTimeBlocks(day = new Date()) {
    let array = [];
    for(let i = 0; i < 24; i++) {
      let dateTime = day;
      dateTime.setHours(i);
      dateTime.setMinutes(0);
      array.push({ id: this.padNumber(i, 4), dateTime: new Date(dateTime), time: `${i}`, category: null, isEditMode: false });
      dateTime.setMinutes(30);
      array.push({ id: this.padNumber(`${i}30`, 4), dateTime: new Date(dateTime), time: '', category: null, isEditMode: false });
    }
    return array;
  }
  getDays() {
    const today = Date.now();
    let days = [];
    let day = new Date(2017, 0, 1, 0, 0); // 01/01/2017

    while(day < today) {
      const date = new Date(day);
      days.push({
        date: date,
        dateString: this.formatDate(date),
        times: this.getTimeBlocks(new Date(date))
      });
      day.setDate(day.getDate() + 1);
    }
    return days;
  }
}

export default new Query();
