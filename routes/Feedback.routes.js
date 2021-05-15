module.exports = app => {
    const Feedback = require("../controllers/Feedback.js");
  
    var router = require("express").Router();
  
    router.post("/", Feedback.giving);
  
    router.get("/:pId", Feedback.ByProduct);

    app.use("/api/Feedback", router);
  };