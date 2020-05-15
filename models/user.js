const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    accountConfirmed:{
        type:Boolean,
        default:false,
    },
    address:{
        type:String,
    },
    mobileNumber:{
        type:String,
        min:10,
        max:13,
    },

});
module.exports=mongoose.model("User",userSchema);