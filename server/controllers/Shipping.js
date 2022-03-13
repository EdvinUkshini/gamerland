const qdb = require('../config/db');
const db = require("../sqlmodels");
const Shipping = db.shipping;
/* eslint-disable no-unused-vars */
const Op = db.Sequelize.Op;
/* eslint-enable no-unused-vars */

// Create and Save a new Shipping address record
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userid || !req.body.address || !req.body.city || !req.body.country || !req.body.zipcode || !req.body.phonenumber) {
    res.status(400).send({
      message: "Fill form"
    });
    return;
  }

  // Shipping information form data
  const shipping = {
    userId:req.body.userid,
    address:req.body.address,
    city:req.body.city,
    country:req.body.country,
    zipCode:req.body.zipcode,
    phoneNumber:req.body.phonenumber
  };

  // Store data in db
  Shipping.create(shipping)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred during the request"
      });
    });
};
exports.findOne = (req, res) => {

  if (!req.params.userId) {
    res.status(400).send({
      message: "No user found"
    });
    return;
  }
  qdb.query(
    `SELECT * FROM shippingaddress WHERE userId = ${qdb.escape(req.params.userId)};`,
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
          msg: 'No address found'
        });
      }else{
          return res.status(200).send(result[0]);
      }
    
    });

  }

  exports.delete = (req, res) => {
    const userId = req.params.userId;
  
    Shipping.destroy({
      where: { userId: userId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Shipping address was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete shipping address.`
          });
        }
      })
      
      .catch(err => {
        res.status(500).send({
          message: "Could not delete shipping address"+err
        });
      });
  };