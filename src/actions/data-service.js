class DataService {
  canGetNextDay(date, query) {
    const latestDate = new Date(date);
    latestDate.setHours(0,0,0,0);
    latestDate.setDate(latestDate.getDate() + 1);
    const lastDay = {
      month: query.month ? query.month + 1 : 0,
      year: query.month ? query.year : query.year + 1,
    };
    const lastDateOfQuery = new Date(lastDay.year, lastDay.month, 0, 23, 59, 59);
    return latestDate.getTime() < lastDateOfQuery.getTime();
  }
  getQueryStartDate(query) {
    const month = query.month || 0;
    return new Date(query.year, month, 0);
  }
}

export default new DataService();
