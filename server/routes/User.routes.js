module.exports = app => {
    const users = require("../controllers/Users.js");
  
    var router = require("express").Router();
  
    router.get("/details/:userId", users.getData);
  
    app.use('/api/users', router);
  };