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
    return `${this.padNumber(day, 2)} ${Constants.monthNames[monthIndex]} ${fullYear}`;
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
  canGetNextDay(date, query) {
    const latestDate = new Date(date);
    latestDate.setHours(0,0,0,0);
    latestDate.setDays(latestDate.getDate() + 1);
    const lastDay = {
      month: query.month ? query.month + 1 : 0,
      year: query.month ? query.year : query.year + 1,
    };
    const lastDateOfQuery = new Date(lastDay.year, lastDay.month, 0);
    return latestDate.getTime() < lastDateOfQuery.getTime();
  }
}

export default new CommonService();
