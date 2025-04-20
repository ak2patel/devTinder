const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const { validateEditProfileData} = require("../utils/validation");
require("dotenv").config();



profileRouter.get("/profile/view",userAuth,async(req,res)=>{
        
    try {
       const user=req.user;  
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);  
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try {
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit request...");
       }

       const user = req.user;
       console.log(user);
       
       Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));

       res.send(`${user.firstName}, your profile updated successfully`);
       await  user.save();


        
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
});


module.exports=profileRouter;