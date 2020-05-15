const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/prouduct");
router.get("/", async (req, res) => {
    try {
        let orders = await Order.find({ user: req.user.id }).populate("product");
        res.json(orders);
    }
    catch (e) {

        res.status(500).send({ message: "Error retriving orders...." })
    }
});
router.get("/myorders",async (req, res) => {
    try {
        let orders = await Order.find({ hotel: req.user.hotel}).populate("product").populate("user",["_id","email","address","mobileNumber"]).sort({_id:-1});
        res.json(orders);
    }
    catch (e) {

        res.status(500).send({ message: "Error retriving orders...." })
    }
});
router.post("/",async(req,res)=>{
    var status=false;
    try{
    for(var p in req.body){
        console.log(p);
        let product = await Product.findById(req.body[p].product);
        if (product != null) {
            let newOrder = new Order({
                user: req.user.id,
                product: product,
                quantity:req.body[p].quantity,
            });
             var result = await newOrder.save();
             status=true;
        }
    }
}
    catch(e){
        status=false;
        console.log(e);
        res.status(400).send({message:e.message});
    }
    
    if(status){
        res.status(201).send({message:"order success"});
    }
    else{
        res.status(400).send({message:"order failed"});
    }
});
router.post("/:productId", async (req, res) => {
    try {
        let product = await Product.findById(req.params.productId);
        if (product != null) {
            let newOrder = new Order({
                user: req.user.id,
                product: req.params.productId,
                quantity: req.body.quantity,
            });
            try {
                var result = await newOrder.save();
                await Hotel.findOneAndUpdate({ _id: product.hotel }, { $push: { orders: result } });

                //notify owner of hotel with socket.io
                res.status(201).send(result);

            }
            catch (e) {
                res.status(400).send(e);
            }
        }
        else {
            res.status(404).send({ message: "Proudct that you are  looking for does not exists" });

        }

    }
    catch (e) {
        res.status(500).send({ message: "Error try again" });

    }

});
module.exports = router;