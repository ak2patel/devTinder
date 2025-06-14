const express = require("express");
const authRouter = express.Router();

const bcrypt= require("bcrypt");
const { Error } = require('mongoose');
const {validateSignup}= require("../utils/validation");
const User = require('../models/user');



//signup
authRouter.post("/signup",async(req,res)=>{
   
    try{ 
        validateSignup(req);
        const {firstName ,lastName ,emailId, password}= req.body;

        const passwordHash =  await bcrypt.hash(password,10);
         
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        }); 
   


       const savedUser =  await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token",token);

        res.json({message:"User added successfully",data:savedUser});
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

//login
authRouter.post("/login",async (req,res)=>{
    try{
        const { emailId, password} = req.body;
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Please SignUp");
        }

        const isPasswordValid = await user.validatepassword(password);

        if(isPasswordValid){

            //Create a JWT Token
            const token = await user.getJWT();
            
            //Add token to cookie and send back to user as response
            res.cookie("token",token);



            res.send(user);
        }

        else {
            throw new Error("Invalid Credentials");
        }


    }catch(err){
        res.status(400).send("ERROR: "+err.message);

    }
});

//logout
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("logout successfull");

});


module.exports = authRouter;