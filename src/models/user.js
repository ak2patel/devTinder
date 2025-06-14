const mongoose = require("mongoose");
const validator =require("validator");
const jwt=require("jsonwebtoken");
const bcrypt= require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
    firstName  : {type :String
        ,required:true,
        minLength:3,
        maxLength:20

    },
    lastName   : {type :String,
        minLength:3,
        maxLength:20},
    emailId    : {type :String
        ,lowercase:true
        ,required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value);
            }
        }
    },
    password   : {type :String
        ,required:true
    },
    age        : {type :Number,min:18},
    gender     : {type :String,
        validate(value){
            if(!(["Male","Female","Others"].includes(value))){
                throw new Error("Gender data not valid");
            }
        }
    },
    photoUrl : {
        type:String,
        default:"https://tg-stockach.de/wp-content/uploads/2020/12/5f4d0f15338e20133dc69e95_dummy-profile-pic-300x300.png"
    },
    about:{type:String,
        default:"This is default description of the user"
    },

    skills:{ type :[String]}
},{
    timestamps:true,
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"this is a secret key",{expiresIn: "7d"});
    return token;
};

userSchema.methods.validatepassword = async function(passwordInputByUser){
    const user =this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("user",userSchema);
module.exports = User;