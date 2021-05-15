module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        productId:String,
        comment:String,
        productRating:Number,
        feedbacker: String
      },
      { timestamps: true }
    );
  
    const Feedback = mongoose.model("feedback", schema);
    return Feedback;
  };