var resList = require('../const/ResponseList')
module.exports = function success(data) {
  var req = this.req;
  var res = this.res;
  res.status(200);
  return res.json(resList.success(data));
};
