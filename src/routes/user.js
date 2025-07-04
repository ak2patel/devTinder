const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
//const connectionRequest = require("../models/connectionRequest");
const { set } = require("mongoose");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName skills age gender about photoUrl"

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName age gender skills about photoUrl  ")
        //.populate("fromUserId",["firstName","lastName"]);

        res.json({message:"Data fetched successfully ", data:connectionRequests})




    }catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
})

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
      
        const connectionRequests = await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
            ],
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        const data = connectionRequests.map((row)=>{ 
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            
            return row.fromUserId;

        });


        res.json({data})

        
    }catch(err){
        res.status(400).send({message: err.message});
    }
})

userRouter.get("/feed",userAuth , async (req,res)=>{
    try{
        const loggedInUser = req.user;
        // const page  = parseInt(req.query.page)  || 1;
        // let limit = parseInt(req.query.limit) || 10;
        // limit = limit>50?50:limit;
        // const skip = (page-1)*limit;

        const connectionRequests = await connectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId")
        .populate("fromUserId","firstName")
        .populate("toUserId","firstName");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            // hideUsersFromFeed.add(req.fromUserId.toString());
            // hideUsersFromFeed.add(req.toUserId.toString());

            hideUsersFromFeed.add(req.fromUserId._id?.toString?.() || req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId._id?.toString?.() || req.toUserId.toString());

        })

         hideUsersFromFeed.add(loggedInUser._id.toString());
        const users = await User.find({
           $and: [{_id: {$nin: Array.from(hideUsersFromFeed)}},
                  {_id: {$ne:loggedInUser._id}}]
        }).select(USER_SAFE_DATA);//.skip(skip).limit(limit);

        res.json({users})

    }catch(err){
        res.status(400).send({message :err.message})
    }

})

module.exports = userRouter;