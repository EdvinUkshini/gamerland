const db = require("../models");
const Feedback = db.feedback;

// Give a new feedback
exports.giving = (req, res) => {
  // Validate request
  if (!req.body.productId) {
    res.status(400).send({ message: "Feedback not being linked to any product" });
    return;
  }

  // Feedback data
  const feedback = new Feedback({
    productId: req.body.productId,
    comment: req.body.comment,
    productRating: req.body.productRating,
    feedbacker: req.body.feedbacker,
  });

  // Save Feedback in the database
  feedback
    .save(feedback)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while giving feedback"
      });
    });
};

exports.ByProduct = (req, res) => {

    const productId = req.params.pId;
    var condition = { productId:productId }

  Feedback.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feedbacks."
      });
    });
};