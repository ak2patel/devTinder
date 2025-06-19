const connectDB = require('./config/database');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const cookieParser = require('cookie-parser');
const http = require("http");
const initializeSocket = require("./utils/socket")


//const { Error } = require('mongoose');
//const User = require('./models/user');
//const bcrypt= require("bcrypt");
//const {validateSignup}= require("./utils/validation")
//const jwt = require("jsonwebtoken");
//const {userAuth} = require("./middleware/auth");
app.use(cors({
    origin:"http://localhost:5173",
    credentials : true
}
));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter =require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");


app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);


const server = http.createServer(app); 
initializeSocket(server);



connectDB()
.then(()=>{
    console.log("Database connected successfully...");
    server.listen(process.env.PORT,()=>{
        console.log("server is successfully listening on port 3000");
    });
})
.catch((err)=>{
    console.error("database cannot be connected !!!")
});





// app.post("/signup",async(req,res)=>{
   
//     try{ 
//         validateSignup(req);
//         const {firstName ,lastName ,emailId, password}= req.body;

//         const passwordHash =  await bcrypt.hash(password,10);
         
//         const user = new User({
//             firstName,
//             lastName,
//             emailId,
//             password:passwordHash,
//         }); 
   


//         await user.save();
//         res.send("User added successfully");
//     }
//     catch(err){
//         res.status(400).send("ERROR: "+err.message);
//     }
// });

// //login
// app.post("/login",async (req,res)=>{
//     try{
//         const { emailId, password} = req.body;
//         const user = await User.findOne({emailId});
//         if(!user){
//             throw new Error("Please SignUp or Register first");
//         }

//         const isPasswordValid = await user.validatepassword(password);

//         if(isPasswordValid){

//             //Create a JWT Token
//             const token = await user.getJWT();
            
//             //Add token to cookie and send back to user as response
//             res.cookie("token",token);



//             res.send("Login successful...");
//         }

//         else {
//             throw new Error("Enter correct password");
//         }


//     }catch(err){
//         res.status(400).send("ERROR: "+err.message);

//     }
// });

// //Profile Api
// app.get("/profile",userAuth,async(req,res)=>{
        
//     try {
//     //     const cookie= req.cookies;
//     //     const{token}=cookie;
//     //     if(!token){
//     //         throw new Error("Invalid Token Login again");
//     //     }
//     //     //Validate the token
//     //     const isTokenValid = await jwt.verify(token,"this is a secret key")
//     //    // console.log(isTikenValid);
//     //    const{_id}= isTokenValid;
//     //   const user = await User.findById({_id});

//     // if(!user){
//     //     throw new Error("User does not exist");
//     //    }
       

//        // console.log(cookie);
//        const user=req.user;  
//         res.send(user);
//     } catch (err) {
//         res.status(400).send("ERROR: "+err.message);  
//     }
// });












// //Get user by Email
// app.get("/user",async(req,res)=>{
//     const email=req.body.emailId;
//     try{
//         const users = await User.find({emailId : email}); 
       
//         if(users.length ==0){
//             res.status(400).send("Something went wrong");
//         }else{ 
//         res.send(users); }

//     }catch(err){
//        res.status(400).send("Something went wrong ...");
//     }
// });


// // Feed API     - GET /feed   - get all the users from the database
// app.get("/feed" ,userAuth,async(req,res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch{
//         res.status(400).send("Something went wrong ");
//     }
    
// });


// //User update
// app.patch("/user/:userId",async(req,res)=>{

//     const userId=req.params?.userId;
//     const data=req.body;

   
//     try{
//         const allowed_updates= ["photoUrl" , "about" , "gender","skills"];

//         const isUpdateAllowed = Object.keys(data).every((k)=>allowed_updates.includes(k));
//         if(!isUpdateAllowed){
//             throw new Error("Update not allowed");
//         }
//         if(data?.skills.length>10){
//             throw new Error("Skill can't more than 10...");
//         }    


//          await User.findByIdAndUpdate({ _id :userId},data,{
//             runValidators:true,
//          });
//          res.send("user updated successfully...");

//     }catch(err){
//         res.status(400).send("Update failed"+err.message);
//      }

  

// });


// //User delete 
// app.delete("/user",async(req,res)=>{
//    const userId = req.body.userId
//     try{
//             const user= await User.findByIdAndDelete(userId);

//             res.send("User deleted successfully...");

//     }catch(err){
//        res.status(400).send("Something went wrong ...");
//     }
// })


