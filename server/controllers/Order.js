const qdb = require('../config/db');
const db = require("../sqlmodels");
const Order = db.order;
/* eslint-disable no-unused-vars */
const Op = db.Sequelize.Op;
/* eslint-enable no-unused-vars */

// Create and Save a new Tutorial

exports.findAll = (req, res) => {

  if (!req.params.userId) {
    res.status(400).send({
      message: "No orders found"
    });
    return;
  }
  qdb.query(
    `SELECT * FROM orders WHERE userId = ${qdb.escape(req.params.userId)};`,
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
          msg: 'No order found'
        });
      }else{
          return res.status(200).send(result);
      }
    
    });

  }

  exports.delete = (req, res) => {
    const oId = req.params.oId;
  
    Order.destroy({
      where: { id: oId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order data with id: "+oId+" was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete order data.`
          });
        }
      })
      
      .catch(err => {
        res.status(500).send({
          message: "Could not delete order data"+err
        });
      });
  };