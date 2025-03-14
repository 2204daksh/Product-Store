import Product from "../models/Productmodel.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) => {

    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({
            success:false,
            message:"Please enter all the fields"
        })
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        return res.status(201).json({
            success:true,
            data:newProduct
        })
    }   
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Error in saving the new Product : ",err
        })
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,
            message:"Enter a Valid id"
        })
    }

    try{
        const product = await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            data:product
        })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }

}

export const getAllProducts = async(req,res) => {
    try{
        const products = await Product.find({});
        return res.status(200).json({
            success:true,
            data:products
        })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Products Not Found "
        })
    }
}

export const updateProduct = async(req,res) => {

    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,
            message:"Enter a Valid id"
        })
    }
    
    try{
        const products = await Product.findByIdAndUpdate(id, product, {new:true});
        return res.status(200).json({
            success:true,
            data:products
        })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Products Not Updated", err
        })
    }
}