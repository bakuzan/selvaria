const chalk = require('chalk');
const Constants = require('../constants');

module.exports = () => {
  const categoryService = {
    getCategoryList: (req, res) => {
      res.jsonp(Constants.categories);
    }
  };

  return categoryService;
}
