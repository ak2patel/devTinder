const socket = require("socket.io");

const initializeSocket = (server)=>{
     const io = socket(server,{
      cors :{
        origin:"http://localhost:5173"
    }
});

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