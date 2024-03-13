const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
    title: {type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    image:{type:String},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
  }, {
    timestamps: true,
});

module.exports=mongoose.model("product",productSchema);
