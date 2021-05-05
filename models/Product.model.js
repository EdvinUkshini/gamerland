module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      imgpath:String,
      type:String,
      name: String,
      manufacturer: String,
      description: String,
      stock: Number,
      price: Number,
      discount: Number
    },
    { timestamps: true }
  );

  const Product = mongoose.model("product", schema);
  return Product;
};