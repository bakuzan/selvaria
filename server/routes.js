const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
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


/*
MongoClient.connect('mongodb://localhost/selvaria', function (err, db) {
  if (err) console.log(err);
	else console.log(`Connected to mongodb instance: selvaria`)
});
*/

module.exports = router;
