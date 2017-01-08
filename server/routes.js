const express = require('express');

const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
	console.log('Query fired! : ', req.url);
	next(); // pass to next handler.
});

//Add routes to endpoints here...

module.exports = router;
