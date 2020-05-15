const mongoose=require("mongoose");
const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User",
    },
    time:{
        type:Date,
        dafault:Date.now(),
    },
    quantity:{
        type:Number,
        dafault:1,

    },
    status:{
        type:Number,
        default:1
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },

});
module.exports=mongoose.model("Order",orderSchema);