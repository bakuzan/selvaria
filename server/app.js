const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

//loads .env file into process.env
dotenv.config();

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use('/selvaria/static', express.static(path.resolve(__dirname, '..', 'build/static')));

//Body parsing for POST-ing
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Routes
app.use(require('./routes'));

// Always return the main index.html, so react-router render the route in the client
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

module.exports = app;
