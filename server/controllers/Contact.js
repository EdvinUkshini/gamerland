const db = require("../sqlmodels");
const Contact = db.contacts;
/* eslint-disable no-unused-vars */
const Op = db.Sequelize.Op;
/* eslint-enable no-unused-vars */

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.subject || !req.body.description) {
    res.status(400).send({
      message: "Fill form"
    });
    return;
  }

  // Contact form data
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    subject:req.body.subject,
    description:req.body.description
  };

  // Store data in db
  Contact.create(contact)
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