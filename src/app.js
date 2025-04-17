const { Error } = require('mongoose');
const connectDB = require('./config/database');
const User = require('./models/user');
const express = require('express');
require("dotenv").config();
const app = express();

app.use(express.json());



app.post("/signup",async(req,res)=>{
    const user = new User(req.body); 
    try{ 
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("error saving the user "+err.message);
    }
});

//Get user by Email
app.get("/user",async(req,res)=>{
    const email=req.body.emailId;
    try{
        const users = await User.find({emailId : email}); 
       
        if(users.length ==0){
            res.status(400).send("Something went wrong");
        }else{ 
        res.send(users); }

    }catch(err){
       res.status(400).send("Something went wrong ...");
    }
});


// Feed API     - GET /feed   - get all the users from the database
app.get("/feed" ,async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch{
        res.status(400).send("Something went wrong ");
    }
    
});


//User update
app.patch("/user/:userId",async(req,res)=>{

    const userId=req.params?.userId;
    const data=req.body;

   
    try{
        const allowed_updates= ["photoUrl" , "about" , "gender","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=>allowed_updates.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("Skill can't more than 10...");
        }    


         await User.findByIdAndUpdate({ _id :userId},data,{
            runValidators:true,
         });
         res.send("user updated successfully...");

    }catch(err){
        res.status(400).send("Update failed"+err.message);
     }

  

});


//User delete 
app.delete("/user",async(req,res)=>{
   const userId = req.body.userId
    try{
            const user= await User.findByIdAndDelete(userId);

            res.send("User deleted successfully...");

    }catch(err){
       res.status(400).send("Something went wrong ...");
    }
})


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

