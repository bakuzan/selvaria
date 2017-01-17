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
  getTimeBlocks(dayId, day) {
    let array = [];
    let dateTime = day;
    for(let i = 0; i < 24; i++) {
      dateTime.setHours(i);
      dateTime.setMinutes(0);
      array.push({ id: this.padNumber(i, 4), dateTime: dateTime, time: `${i}`, category: null, isEditMode: false });
      dateTime.setMinutes(30);
      array.push({ id: this.padNumber(`${i}30`, 4), dateTime: dateTime, time: '', category: null, isEditMode: false });
    }
    return array;
  }
  getDays() {
    const today = new Date();
    let days = [];
    let day = new Date(2017, 0, 1); // 01/01/2017

    while(day < today) {
      const dayInTicks = (day.getTime() * 10000) + 621355968000000000;
      days.push({
        id: dayInTicks,
        date: day,
        dateString: this.formatDate(day),
        times: this.getTimeBlocks(dayInTicks, day)
      });
      day.setDate(day.getDate() + 1);
    }
    return days;
  }
}

export default new Query();
