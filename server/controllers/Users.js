const db = require('../config/db');
/* eslint-disable no-unused-vars */

exports.getData = (req, res) => {
  // Validate request
  if (!req.params.userId) {
    res.status(400).send({
      message: "No user found"
    });
    return;
  }
  db.query(
    `SELECT * FROM users WHERE id = ${db.escape(req.params.userId)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        /* eslint-disable no-unreachable */
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'No user found'
        });
      }else{
          return res.status(200).send(result[0]);
      }
    
    });
    

    };