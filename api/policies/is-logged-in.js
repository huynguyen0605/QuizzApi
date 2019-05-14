module.exports = async function (req, res, proceed) {

    if (req.session.userid) {
      return proceed();
    }
  
    return res.redirect('/login')
};
  