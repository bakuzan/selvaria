const Time = require('../models/time.js');

module.exports = () => {
  return {
    getByDay: (req, res) => {
      Time.getByDay(req.params.day, (err, times) => {
        res.jsonp(times);
      });
    },
    save: (req, res) => {
    	delete req.body._id;
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };

      Time.findOneAndUpdate({}, req.body, options, (err, time) => {
        if (err) {
          return res.status(400).send({ error: err });
          console.error(chalk.red(err));
        } else {
          res.jsonp(time);
        }
      });
    }
  };
};
