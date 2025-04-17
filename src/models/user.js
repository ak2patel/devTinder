const mongoose = require("mongoose");
const validator =require("validator");
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
            if(!(["male","female","others"].includes(value))){
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
})

const User = mongoose.model("user",userSchema);
module.exports = User;