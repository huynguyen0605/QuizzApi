function createJson(errCode, errMsg, data) {
  return { s: errCode, errmsg: errMsg, d: data };
}
module.exports = {
  errServer: function (err, errmsg = sails.__('serverError')) {
    return createJson("error", errmsg, err);

  },
  success: function (msg, data) {
    return createJson("0", msg, data);
  },
  errBusiness: function (errmsg) {
    return createJson("1", errmsg, null);
  },
};
