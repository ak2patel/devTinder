const socket = require("socket.io");
const crypto = require("crypto");

const initializeSocket = (server)=>{
     const io = socket(server,{
      cors :{
        origin:"http://localhost:5173"
    }
});

const getRoomId = ({userId,targetUserId})=>{
    crypto
    .createHash("sha256")
    .update([userId,targetUserId].sort().join("116"))
    .digest("hex");
}

io.on("connection",(socket)=>{
    //Handle Events
    socket.on("joinChat",({userId, targetUserId})=>{
        const roomId = [userId,targetUserId].sort().join("_");
        socket.join(roomId);
        console.log("room ID : ",roomId)

    });

    socket.on("sendMessage",({firstName, userId, targetUserId,text })=>{
        const roomId = [userId,targetUserId].sort().join("_");
        console.log(firstName+" "+text);
        io.to(roomId).emit("messageReceived",{firstName,text});
        

    });

    socket.on("disconnect",()=>{

    });
    
})
}

module.exports = initializeSocket;