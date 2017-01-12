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
  getTimeBlocks() {
    let array = [];
    for(let i = 0; i < 24; i++) {
      array.push({ id: this.padNumber(i, 4), time: `${i}`, category: null, isEditMode: false });
      array.push({ id: this.padNumber(`${i}30`, 4), time: '', category: null, isEditMode: false });
    }
    return array;
  }
  getDays() {
    const timeBlocks = this.getTimeBlocks();
    const today = new Date();
    let days = [];
    let day = new Date(2017, 0, 1); // 01/01/2017

    while(day < today) {
      days.push({
        id: (day.getTime() * 10000) + 621355968000000000,
        date: this.formatDate(day),
        times: timeBlocks
      });
      day.setDate(day.getDate() + 1);
    }
    return days;
  }
}

export default new Query();
