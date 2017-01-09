const Query = {
  padNumber(number) {
    return number <= 9999 ? ('000'+number).slice(-4) : number;
  },
  getTimeBlocks: () => {
    let array = [];
    for(let i = 0; i < 24; i++) {
      array.push({ id: this.padNumber(i), time: `${i}`, category: null });
      array.push({ id: this.padNumber(`${i}30`), time: '', category: null });
    }
    return array;
  },
  getDays: () => {
    const timeBlocks = this.getTimeBlocks();
    const today = new Date();
    let days = [];
    let day = new Date(2017, 0, 1); // 01/01/2017
    
    while(day < today) {
      days.push({ date: day.toISOString(), times: timeBlocks });
      day.setDate(day.getDate() + 1);
    }
    return days;
  }
}

export default Query;
