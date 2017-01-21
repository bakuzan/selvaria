const Time = require('../models/time.js');

module.exports = () => {
  return {
    getByDay: (req, res) => {
      Time.getByDay(req.params.day, (err, times) => {
        res.jsonp(times);
      });
    },
    save: (req, res) => {
      console.log('save this', req.body, 'OR', new Time(req.body));
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      };

      Time.findOneAndUpdate({ _id: req.body._id }, req.body, options, (err, time) => {
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
