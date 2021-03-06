const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');
const category = require('./controllers/category-controller.js')();
const day = require('./controllers/day-controller.js')();
const time = require('./controllers/time-controller.js')();
const statistics = require('./controllers/statistics-controller.js')();

const environment = process.env.NODE_ENV || 'development';
const db = mongoose.connect(
  `mongodb://localhost/selvaria-${environment}`,
  (err) => {
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(chalk.red(err));
    }
  }
);

const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
  console.log('Query fired! : ', req.url);
  next(); // pass to next handler.
});

//Add route for category list
router.get('/api/category-list', category.getCategoryList);

//Add routes from Day.
router.post('/api/day', day.save);
router.get('/api/days/:year', day.getByYear);
router.get('/api/days/:year/:month', day.getByYearAndMonth);
router.get('/api/days/:year/:month/:date', day.getByGivenPeriod);
router.delete('/api/day/:id', day.delete);

//Add routes for Time.
router.post('/api/time', time.save);
router.get('/api/times/:day', time.getByDay);

//Add routes for Statistics
router.get('/api/statistics/breakdown/:year', statistics.getBreakdownData);
router.get(
  '/api/statistics/breakdown/:year/:month',
  statistics.getBreakdownData
);
router.get(
  '/api/statistics/breakdown/:year/:month/:date',
  statistics.getBreakdownData
);

module.exports = router;
