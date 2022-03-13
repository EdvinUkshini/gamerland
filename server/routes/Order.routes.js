module.exports = app => {
    const orders = require("../controllers/Order.js");
  
    var router = require("express").Router();
 
    router.get("/:userId", orders.findAll);
    router.delete("/:oId", orders.delete);
  
    app.use('/api/order', router);
  };