module.exports = () => {
  return {
    getSunday: (d) => {
      d = new Date(d);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? 0 : 7);
      return new Date(d.setDate(diff));
    }
  };
}
