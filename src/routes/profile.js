const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const { validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");
require("dotenv").config();


//view profile
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
        
    try {
       const user=req.user;  
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);  
    }
});

//edit profile
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try {
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit request...");
       }

       const user = req.user;
        user.set(req.body);
        
        
        //Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));
        
        await  user.save();
        res.send(`${user.firstName}, your profile updated successfully`);
             

        
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
});

//change password
profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
   try{
       const {password} = req.body;
    
       if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
       
       const passwordHash =  await bcrypt.hash(password,10);
      

       const user = await User.findByIdAndUpdate(
        req.user._id,
        { password: passwordHash },
        { new: true }
    );

    if (!user) {
        throw new Error("User not found");
    }


        res.send("Password added successfully");

   }catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
});


module.exports=profileRouter;