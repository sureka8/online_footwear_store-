const  mongoose =  require('mongoose');
const reviewSchema = new mongoose.Schema({
    title: String,
    description: String,
    stars: Number,
    product: {type:Schema.Types.ObjectId},
  }, {timestamps: true});

  module.exports=mongoose.model("review",reviewSchema);