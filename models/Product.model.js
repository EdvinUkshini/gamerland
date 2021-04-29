module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        imgpath:String,
        type:String,
        manufacturer:String,
        name: String,
        description: String,
        stock: Number,
        price: Number
      },
      { timestamps: true }
    );
  
    const Product = mongoose.model("product", schema);
    return Product;
  };