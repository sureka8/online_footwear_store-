const  mongoose =  require('mongoose');
const userScheme =new mongoose.Schema({
    name:{
        type:String,
        required:true},

    email: {
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true},
    
        verified:{
            type:Boolean,
            default:false
        },
        verificationToken:String,
        address:[
            {
                name:String,
                mobileNo:String,
                houseNo:String,
                street:String,
                landMark:String,
                city:String,
                country:String,
                postalCode:String
            }
        ],
        oreders:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Order'
            }
        ],
        createtedAt:{
            type:Date,
            default:Date.now,
        },
});
const user= mongoose.model("User",userScheme);

module.exports = user