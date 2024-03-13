const  mongoose =  require('mongoose');
const categorySchema = new mongoose.Schema({

name: {type:String,required:true},
parent: {type:mongoose.Types.ObjectId, ref:'Category'},
properties: [{type:Object}]

})
module.exports=mongoose.model("category",categorySchema);