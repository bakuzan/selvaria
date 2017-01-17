const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/selvaria', (err) => {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
const day = require('./controllers/day-controller.js')();

const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
	console.log('Query fired! : ', req.url);
	next(); // pass to next handler.
});

//Add routes to endpoints here...
router.post('/api/days', day.save);
router.get('/api/days/:year', day.getByYear);
router.get('/api/days/:year/:month', day.getByYearAndMonth);

module.exports = router;
