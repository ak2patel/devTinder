const socket = require("socket.io");
const crypto = require("crypto");
const { error } = require("console");
const {Chat} = require("../models/chat")

const getSecretRoomId = (userId, targetUserId)=>{
   return crypto
    .createHash("sha256")
    .update([userId,targetUserId].sort().join("_"))
    .digest("hex");
}

const initializeSocket = (server)=>{
     const io = socket(server,{
      cors :{
        origin:"http://localhost:5173"
    }
});

io.on("connection",(socket)=>{
    //Handle Events
    socket.on("joinChat",({userId, targetUserId})=>{
       // const roomId = [userId,targetUserId].sort().join("_");
        const roomId = getSecretRoomId(userId, targetUserId);
       
        socket.join(roomId);
       // console.log("room ID : ",roomId)

    });

    socket.on("sendMessage",async ({firstName,lastName, userId, targetUserId,text })=>{
        //const roomId = [userId,targetUserId].sort().join("_");
        const roomId = getSecretRoomId(userId, targetUserId);
        
        // save message to the database
        try {
            
            
            let chat = await Chat.findOne({
                participants:{$all: [userId,targetUserId]},
            });
            if(!chat){
                chat = new Chat({
                    participants:[userId,targetUserId],
                    messages:[],
                })
            }
            
            chat.messages.push({
                senderId:userId,
                text,
            });
            await chat.save();
            io.to(roomId).emit("messageReceived",{firstName,lastName,text});


        } catch (err) {
            console.error(err);
        }
    

    });

    socket.on("disconnect",()=>{

    });
    
})
}

module.exports = initializeSocket;