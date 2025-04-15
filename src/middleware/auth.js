const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked...");
    token="xyz";
    const isAdminAuthorized = token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else {next();}
};

const userAuth = (req,res,next)=>{
    console.log("User Auth is getting checked...");
    const token="1234";
    const isUserAuthorized = token==="1234";
    if(!isUserAuthorized){
        res.status(401).send("user doesn't exist...");
    }
    else {next();}
};

module.exports ={
    adminAuth,
    userAuth,
}