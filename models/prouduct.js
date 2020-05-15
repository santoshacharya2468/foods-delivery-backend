const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    descriptions:{
        type:String,
        required:true,

    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        requred:true,
    },
    price:{
        type:Number,
        required:true,

    },
    rating:{
        type:Number,
        default:1,
    },
    photos:[{
        type:String,
        required:true,
    }]

});
module.exports=mongoose.model("Product",productSchema);