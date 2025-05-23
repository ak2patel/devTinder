const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest")
const requestRouter = express.Router();
const User = require("../models/user");

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

    res.json({
        message:"Connection request send successfully",
        data
    })

 
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = requestRouter;
