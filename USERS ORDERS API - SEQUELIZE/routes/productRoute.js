const express = require("express");
const { Productmodel } = require("../model/productModel");
const productRouter = express.Router();

productRouter.post("/create",async(req,res)=>{
   const {productname,productprice} = req.body;
   const order = await Productmodel.create({productname,productprice})
    res.json("Product Created !" + order);
})

module.exports = {productRouter}