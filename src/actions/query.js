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
  }
}

export default Query;
