const Category=require("../models/category");
const categoryExists= async function(req,res,next){
    let category= await Category.findById(req.body.category);
    if (category != null) {
            req.category=category;
            return next();
    }
    else {
        return res.status(403).send({message:"Category not found..."});
    }
}
module.exports=categoryExists;