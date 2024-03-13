const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbConnect = () => {
  try {
    const conn = mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
//mongodb+srv://suntharsureka:sureka@cluster0.fjd5nay.mongodb.net/
mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB!", err);
  });

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const User = require("./model/user");
const Order = require("./model/order");
const product = require("./model/product");
const category = require("./model/category");
const { result, find } = require("lodash");

//endpointn to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //if email is alredy is registerd
    const existinUser = await User.findOne({ email });
    if (existinUser) {
      return res.status(400).json({ message: "Email already registerd" });
    }
    //create new user
    const newUser = new User({ name, email, password });

    //generate and store the verification token

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send verificaation email
  } catch (error) {
    console.log("error register User", error);
    res.status(500).json({ message: "Registerd failed" });
  }
});


const generateScerateKey = () => {
  const scecretKey = crypto.randomBytes(16).toString("hex");
  return scecretKey;
};
const scecretKey = generateScerateKey();

//end point to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invlid email or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    

    const token = jwt.sign({ userId: user._id }, scecretKey, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "login failed" });
  }
});
//get specific userdelails
app.get("/users/:_id", async (req, res) => {
  const usersp = await User.find();
  if (usersp) {
    res.send(usersp);
  } else {
    res.send({ result: "No user" });
  }
});

//get product
app.get("/product", async (req, res) => {
  const products = await product.find();
  if (product.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No products" });
  }
});
//get review
app.get("/review/:productId", async (req, res) => {});

//get categories
app.get("/category", async (req, res) => {
  const categories = await category.find();
  if (category.length > 0) {
    res.send(categories);
  } else {
    res.send({ result: "no categories" });
  }
});
//endpoin store new address
app.post("/address", async (req, res) => {
  try {
    const { userId, address } = req.body;
    //find the user by the user id
    const user = await User.findById(userId);

    if (!user) {
      return req.status(400).json({ message: "user not found" });
    }

    //add the new address to the user's address array
    user.address.push(address);

    //save the  updated user in the backend
    await user.save();
    res.status(200).json({ message: "Address created successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Address" });
  }
});

//endpoint to get all the addressesof a particular user
app.get("/address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const address = user.address;
    res.status(200).json({ address });
  } catch (error) {
    res.status(501).json({ message: "error retreving the addresses" });
  }
});

//endpoin to stroe the all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItem, totalPrice, shippingAddress, paymentMethod } = req.body;
    const user = await User.findById(userId);
    if (!user) {
     return res.status(404).json({ message: "user not fount" });
    }
    //create an array of product object from the items
  const product = cartItem.map((item) =>(
    {
      
        
          name: item?.title,
          quantity: item.quantity,
          price: item.price,
          image: item?.images[0],
       
    }
  ))

    // creteNewOrder
    const order = new Order({
      user: userId,
      product: product,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
    await order.save();
    res.status(200).json({message:'order create succussfully '})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating order" });
  }
});

//get the user profile
app.get('/profile/:userId' , async(req,res) =>{
    try {
        const userId=req.params.userId;
        const user=await User.findById(userId);
        if(!user){
         return    res.status(404).send('No such user found');
        }
        res.status(200).json({user})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'error retive the user profile'})
    }
})

//
app.get('/orders/:userId' , async(req,res) =>{
    try {
        const userId = req.params.userId
        const orders = await Order.find({user : userId })
if(!orders || orders.length===0){
    return res.status(404).send("no orders found")
}
res.status(200).json({orders})
    } catch (error) {
        res.status(500).json({message:'error'})
    }
})
//get the user details
app.put('/useradd/:userId',async(req,res) =>{
  try {
    const userId=req.params.userId;
    const updatedUsers = req.body;
    const addressid = req.params.addressid;
    const user = await User.findById(userId);
    if(!user){
      return   res.status(404).send('No such user found')
    }
    const result = await User.findByIdAndUpdate(userId,addressid, updatedUsers, { new: true });
    res.json(result);
  } catch (error) {
    res.status(400).json({message:'error'})
  }
})