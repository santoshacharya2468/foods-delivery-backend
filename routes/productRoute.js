const express = require("express");
const router = express.Router();
var path = require('path');
var appDir = path.dirname(require.main.filename);
const multer=require("multer");
const authorization=require("../middlewares/authorization");
const Product=require("../models/prouduct");
const mongoose=require("mongoose");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,appDir+"/public/products");
    },
    filename:(req,file,cb)=>{
        let filename=Date.now()+"_"+file.originalname;
        if(req.uploads==null){
            req.uploads=[];
            req.uploads.push(filename);
            cb(null,filename);
        }
        else{
            req.uploads.push(filename);
            cb(null,filename); 
        }
    }
});
const upload=multer({storage:storage});
router.get("/",async(req,res)=>{
    try{
        const products= await Product.find();
        res.json(products);
    }
    catch(e){
        res.status(500).send({message:"Error retrieving products"});
    }

});
router.get("/:catId",async(req,res)=>{
    let catId=req.params.catId;
    try{
        const products= await Product.find({category:catId});
        res.json(products);
    }
    catch(e){
        res.status(500).send({message:"Error retrieving products"});
    }

});

router.post("/",authorization,upload.array("photos"),async(req,res)=>{
    req.body.photos=req.uploads;
    req.body.category=mongoose.Types.ObjectId(req.body.category);
    let newproduct=new Product(req.body);
    try{
        var result=await newproduct.save();
        res.status(201).send(result);
    }
    catch(e){
        res.status(400).send(e);
    }
});
module.exports=router;