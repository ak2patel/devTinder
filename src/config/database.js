const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(process.env.DB);    
}
module.exports = connectDB;

/*connectDB()
.then(()=>{
    console.log("Database connected successfully...");
   
})
.catch((err)=>{
    console.error("database cannot be connected !!!")
});


module.exports = connectDB;
*/