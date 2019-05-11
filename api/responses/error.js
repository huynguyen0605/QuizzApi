var resList = require('../const/ResponseList')
module.exports = function serverError(data) {
  res.status(500);
  return res.json(resList.errServer(data));
};
