module.exports = async function (req, res, proceed) {

    if (req.session.isadmin) {
      return proceed();
    }
  
    return res.notpermission();
  
};
  