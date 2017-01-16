const Day = require('../models/day.js');

module.exports = () => {
  return {
    getByYear: (req, res) => {
      Day.getByYear(req.params.year, (err, days) => {
        res.send(days);
      });
    },
    getByYearAndMonth: (req, res) => {
      Day.getByYearAndMonth(req.params.year, req.params.month, (err, days) => {
        res.send(days);
      });
    },
    save: (req, res) => {
    	delete req.body._id;
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };

      Day.findOneAndUpdate({}, req.body, options, function (err, day) {
        if (err) {
          console.error(chalk.red(err));
        } else {
          res.jsonp(day);
        }
      });
    }
  };
};
