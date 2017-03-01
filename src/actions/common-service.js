import Constants from '../constants/values';

class CommonService {
  areDatesEqual(dateOne, dateTwo) {
    const d1 = new Date(dateOne);
    d1.setHours(0,0,0,0);
    const d2 = new Date(dateTwo);
    d2.setHours(0,0,0,0);
    return d1.getTime() === d2.getTime();
  }
  formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const fullYear = date.getFullYear();
    return `${this.padNumber(day, 2)} ${Constants.monthNames.short[monthIndex]} ${fullYear}`;
  }
  daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  isWeekend(dayName) {
    return dayName === Constants.dayNames[0] || dayName === Constants.dayNames[6];
  }
  getSunday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? 0 : 7);
    return new Date(d.setDate(diff));
  }
  splitAt(indexToSplitAt, itemToSplit) {
    const splitAt = index => it => [it.slice(0, index), it.slice(index)];
    return splitAt(indexToSplitAt)(itemToSplit);
  }
  padNumber(n, width, z) {
    z = z || '0';
    n += '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  handleErrorResponse(error) {
    // TODO Implement proper handling via toaster type notification.
    console.error(error);
  }
  constructQueryText({ year, month, date }) {
    let dateText = '';
    const monthName = Constants.monthNames.long[month];

    if (date) {
      const sunday = this.getSunday(new Date(year, month, date));
      const rangeStart = new Date(sunday);
      rangeStart.setDate(rangeStart.getDate() - 13);

      dateText = `${this.formatDate(rangeStart)} - ${this.formatDate(sunday)}`;
    }

    return dateText || `${month ? `${monthName} ` : ''}${year}`;
  }
}

export default new CommonService();
