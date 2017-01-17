const Day = require('../models/day.js');

module.exports = () => {
  return {
    getByYear: (req, res) => {
      Day.getByYear(req.params.year, (err, days) => {
        res.jsonp(days);
      });
    },
    getByYearAndMonth: (req, res) => {
      Day.getByYearAndMonth(req.params.year, req.params.month, (err, days) => {
        res.jsonp(days);
      });
    },
    save: (req, res) => {
    	delete req.body._id;
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };

      Day.findOneAndUpdate({}, req.body, options, (err, day) => {
        if (err) {
          return res.status(400).send({
            error: err
          });
          console.error(chalk.red(err));
        } else {
          res.jsonp(day);
        }
      });
    }
  };
};
