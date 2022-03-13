module.exports = app => {
    const shippings = require("../controllers/Shipping.js");
  
    var router = require("express").Router();
 
    router.post("/", shippings.create);
    router.get("/:userId", shippings.findOne);
    router.delete("/:userId", shippings.delete);
  
    app.use('/api/shipping', router);
  };