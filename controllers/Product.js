var path = require('path');
const db = require("../models/Product.model");
const Product = db.Product;

global.appRoot = path.join(__dirname, '../');
const uploadPath = appRoot.concat("/src/assets/images/products");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.imgpath) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Product
  const Product = new Product({
    imgpath: req.body.imgpath,
    type:req.body.type,
    manufacturer: req.body.manufacturer,
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
  });

  // Save Product in the database
  Product
    .save(Product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database. 
exports.findAll = (req, res) => {
  const name = req.query.name;
  const theLatest = req.query.theLatest;
  const minPriceFilter = req.query.lessThan;
  const maxPriceFilter = req.query.greaterThan;
  var condition = name ? { cpu: { $regex: new RegExp(name), $options: "i" } } : {price: {$gte: minPriceFilter, $lte: maxPriceFilter}};

  Product.find(condition).limit(parseInt(theLatest))
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Product were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Product."
      });
    });
};

exports.upload = (req, res) => {

  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`${uploadPath}/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
}