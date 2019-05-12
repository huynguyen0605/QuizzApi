module.exports = function notpermission() {

  var req = this.req;
  var res = this.res;
  res.status(401);
  return res.json({ s: 401, errmsg: 'Chỉ admin mới được thực hiện quyền này', d: null });

};
