const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    // Is firstname typed
    if (!req.body.firstname) {
        return res.status(400).send({
          msg: 'Please enter your first name'
        });
    }    
    // Is lastname typed
    if (!req.body.lastname) {
      return res.status(400).send({
        msg: 'Please enter your last name'
      });
    }
    // Email min length
    if (!req.body.email) {
      return res.status(400).send({
        msg: 'Please enter a valid email'
      });
    }
    // Passwords min length
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }
    // Making sure passwords are the same
    if (
      !req.body.cpassword ||
      req.body.password != req.body.cpassword
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'GAMERLAND'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }
  
};