const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/selvaria', function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
	console.log('Query fired! : ', req.url);
	next(); // pass to next handler.
});

//Add routes to endpoints here...

module.exports = router;
