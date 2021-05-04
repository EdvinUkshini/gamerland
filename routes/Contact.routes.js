module.exports = app => {
    const contacts = require("../controllers/Contact.js");
  
    var router = require("express").Router();
  
    // submit contact form
    router.post("/", contacts.create);
  
    app.use('/api/contact', router);
  };