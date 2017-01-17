class CommonService {
  areDatesEqual(d1, d2) {
    d1.setHours(0);
    d1.setMinutes(0);
    d2.setHours(0);
    d2.setMinutes(0);
    return d1.getTime() === d2.getTime();
  }
}

export default new CommonService();
