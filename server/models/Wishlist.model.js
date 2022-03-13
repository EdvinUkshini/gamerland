module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        productId:String,
        user:String,
      },
      { timestamps: true }
    );
  
    const Wishlist = mongoose.model("Wishlist", schema);
    return Wishlist;
  };