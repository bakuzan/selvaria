export const paths = {
  build: (path, params) => {
    for(let k in params) {
      if (params.hasOwnProperty(k)) {
        path = path.replace(`:${k}`, params[k]);
      }
    }
    return path;
  },
  base: '/selvaria/',
  about: 'about',
  query: {
    daysByYear: '/api/days/:year',
    daysByYearAndMonth: '/api/days/:year/:month',
    daysByGivenPeriod: '/api/days/:year/:month/:day',
    daysSave: '/api/day',
    timeByDay: '/api/times/:day',
    timeSave: '/api/time'
  }
};
