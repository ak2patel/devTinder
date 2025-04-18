const validator = require("validator");
const validateSignup = (req)=>{
    const {firstName ,lastName ,emailId, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid ");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Enter a valid Email")
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
}

module.exports={
    validateSignup,
}