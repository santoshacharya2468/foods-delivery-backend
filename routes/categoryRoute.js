const mongoose = require("express");
const express = require("express");
const router = express.Router();
var path = require('path');
var appDir = path.dirname(require.main.filename);
const multer=require("multer");
const authorization=require("../middlewares/authorization");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,appDir+"/public/categories");
    },
    filename:(req,file,cb)=>{
        let filename=Date.now()+"_"+file.originalname;
            req.upload=filename;
            cb(null,filename);
    }
});
const upload=multer({storage:storage});
const Category=require("../models/category");
router.get("/",async(req,res)=>{
    try{
        const categories= await Category.find();
        res.json(categories);
    }
    catch(e){
       res.status(500).send({message:"Error retrieving categories"});
    }
});
router.post("/",authorization,upload.single("photo"),async(req,res)=>{
    let alreadcategory= await Category.findOne({name:req.body.name});
    if(alreadcategory==null){
    let category=new Category({
        name:req.body.name,
        photo:req.upload,
    });
    try{
        var result=await category.save();
        res.status(201).send(result);
    }
    catch(e){
        res.status(400).send(e);
    }
}
else{
    res.status(409).send({message:"A Category with given name already exits"});
}
});
module.exports=router;