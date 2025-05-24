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
            gender,
            age,
            skills,
            emailId,
            password:passwordHash,
        }); 
   


        await user.save();
        res.send("User added successfully");
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
            throw new Error("Please SignUp or Register first");
        }

        const isPasswordValid = await user.validatepassword(password);

        if(isPasswordValid){

            //Create a JWT Token
            const token = await user.getJWT();
            
            //Add token to cookie and send back to user as response
            res.cookie("token",token);



            res.send("Login successful...");
        }

        else {
            throw new Error("Enter correct password");
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