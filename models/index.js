const dbConfig = require("../config/mongodb");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.product = require("./Product.model.js")(mongoose);
db.wishlist = require("./Wishlist.model.js")(mongoose);

module.exports = db;