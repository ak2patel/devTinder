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

const validateEditProfileData = (req)=>{
   const allowedEditFields = ["firstName", "lastName", "age","about","skills","photoUrl","gender"];
   const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
);
return isEditAllowed;
}

module.exports={
    validateSignup,
    validateEditProfileData,
}