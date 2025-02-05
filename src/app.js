const express = require('express');
require("./config/database")
const app = express();

const connectDB = require('./config/database');


connectDB()
.then(()=>{
    console.log("Database connected successfully...");
    app.listen(3000,()=>{
        console.log("server is successfully listening on port 3000");
    });
})
.catch((err)=>{
    console.error("database cannot be connected !!!")
});




/*app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000");
});
*/