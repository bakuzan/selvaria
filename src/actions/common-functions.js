class CommonService {
  areDatesEqual(dateOne, dateTwo) {
    const d1 = new Date(dateOne);
    d1.setHours(0);
    d1.setMinutes(0);
    const d2 = new Date(dateTwo);
    d2.setHours(0);
    d2.setMinutes(0);
    return d1.getTime() === d2.getTime();
  }
}

export default new CommonService();
