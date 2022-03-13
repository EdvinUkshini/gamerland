module.exports = app => {
  const Product = require("../controllers/Product.js");

  var router = require("express").Router();

  router.post("/", Product.create);

  router.get("/", Product.findAll);

  router.get("/latestProducts/:number", Product.findX);

  router.get("/:id", Product.findOne);

  router.put("/:id", Product.update);

  router.delete("/:id", Product.delete);

  router.delete("/", Product.deleteAll);

  router.post("/upload", Product.upload);

  app.use("/api/Product", router);
};