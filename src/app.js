const express = require('express');
require("./config/database")
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');



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
   
});
   
    /*const userObj={
        firstName:"Ankit",
        lastName:"kumar",
        emailId: "abcd@gmail.com",
        password: "passcode",
        gender: "Male",
        age:"22"

    }
    const user =new User(userObj);*/

//});

connectDB()
.then(()=>{
    console.log("Database connected successfully...");
    app.listen(3000,()=>{
        console.log("server is successfully listening on port 3000");
    });
})
.catch((err)=>{
    console.error("database cannot be connected !!!")
});




/*app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});
*/