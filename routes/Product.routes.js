module.exports = app => {
    const Product = require("../controllers/Product.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", Product.create);
  
    // Retrieve all Product
    router.get("/", Product.findAll);
  
    // Retrieve a single Product with id
    router.get("/:id", Product.findOne);
  
    // Update a Product with id
    router.put("/:id", Product.update);
  
    // Delete a Product with id
    router.delete("/:id", Product.delete);
  
    // Create a new Product
    router.delete("/", Product.deleteAll);
  
    router.post("/upload", Product.upload);
  
    app.use("/api/Product", router);
  };