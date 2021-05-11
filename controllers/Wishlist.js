const db = require("../models");
const Wishlist = db.wishlist;


// Add a new product into wishlist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Prepare data
  const wishlist = new Wishlist({
    productId: req.body.pId,
    user: req.body.uId,
  });

  // add product to wishlist
  wishlist
    .save(wishlist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding product to wishlist"
      });
    });
};

// Retrieve all wishlist products from the database. 
exports.findAll = (req, res) => {

    const userId = req.params.uId;
    var condition = { user:userId }

  Wishlist.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving wishlist."
      });
    });
};



exports.delete = (req, res) => {

  const pId = req.params.pId;
  const userId = req.params.uId;
  var condition = { productId:pId,user:userId }

  Wishlist.find(condition).deleteOne()
    .then(() => {
      res.send({
        message:"Removed successfully"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving wishlist."
      });
    });
};


