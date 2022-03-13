module.exports = app => {
    const Wishlist = require("../controllers/Wishlist.js");
  
    var router = require("express").Router();
  
    router.post("/", Wishlist.create);
  
    router.get("/:uId", Wishlist.findAll);

    router.delete("/:pId/:uId", Wishlist.delete);
  
    app.use("/api/Wishlist", router);
  };