module.exports = function success(data) {
  var req = this.req;
  var res = this.res;
  res.status(200);
  return res.json(data);
};
