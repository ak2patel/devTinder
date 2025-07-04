const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest")
const requestRouter = express.Router();
const User = require("../models/user");

const {run} = require("../utils/sendEmail"); 

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested","rejected"];
    if(!allowedStatus.includes(status)){
       return  res.status(400).json({message:"Invalid status type " + status})
    }
    const toUser  = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).send({message: "User not found"});
    }
    const existingConnectionRequest = await connectionRequestModel.findOne({
       $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
       ]
        
    })
    
    if(existingConnectionRequest){
       return  res.status(400).send({message:"connection request already exist"})
    }

    const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
    })

    const data = await connectionRequest.save();
    
  // this feature will be added later**********************
    // const emailRes = await run("akpate100601@gmail.com",
    //   "noreply@devtinder.apdev.live",
    //   "DevTinder Email Verification OTP",
    //   `<h3>Your OTP is 56895. It will expire in 5 minutes.</h3>`,
    //   `Your OTP is 47855. It will expire in 5 minutes.`);
    // console.log(emailRes);

    res.json({
        message:"Connection request send successfully",
        data
    })

 
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=>{
    try{
    const loggedInUser = req.user;
    const {status,requestId}= req.params;
    const alloowedStatus = ["accepted","rejected"];
    
    if(!alloowedStatus.includes(status)){
        return res.status(400).json({message: "Status not allowed"});

    }

    const connectionRequest = await connectionRequestModel.findOne({
        fromUserId:requestId,
        toUserId:loggedInUser._id,
        status:"interested",
    })

    if(!connectionRequest){
        return res.status(404).json({message:"connection request not found"})
    }

    connectionRequest.status = status
    const data = await connectionRequest.save();

    res.json({message:"connection request is "+status,data})

    }catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }

})

module.exports = requestRouter;
