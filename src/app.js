const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
require("dotenv").config();


app.use(express.json());


app.post("/signup",async(req,res)=>{
    const user = new User(req.body); 
    try{ 
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("errorn saving the user "+err.message);
    }
});

/*
app.post("/signup",async(req,res)=>{
    const user= new User({
        firstName:"Ankit",
        lastName:"kumar",
        emailId: "abcd@gmail.com",
        password: "passcode",
        gender: "Male",
        age:"22"

    });
    await user.save();
   res.send("User added successfully");
   
});*/
   
    /*const userObj={
        firstName:"Ankit",
        lastName:"kumar",
        emailId: "abcd@gmail.com",
        password: "passcode",
        gender: "Male",
        age:"22"

    }
    //creating a new instance of the User model
    const user =new User(userObj);*/

//});

connectDB()
.then(()=>{
    console.log("Database connected successfully...");
    app.listen(process.env.PORT,()=>{
        console.log("server is successfully listening on port 3000");
    });
})
.catch((err)=>{
    console.error("database cannot be connected !!!")
});

