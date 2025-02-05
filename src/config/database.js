const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://Akp:Akp121004@akp.l2s1a.mongodb.net/?retryWrites=true&w=majority&appName=Akp"
         );    
}

//module.exports = connectDB

/*connectDB()
.then(()=>{
    console.log("Database connected successfully...");
   
})
.catch((err)=>{
    console.error("database cannot be connected !!!")
});*/

module.exports = connectDB;
