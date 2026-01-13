import express from 'express';
import expressAsyncHandler from "express-async-handler";
import Products from "../Models/ProductModels.js";
import data from "../Data.js";
import { isAdmin, isAuth } from '../util.js';

const productRouter = express.Router();

// 1. Seed Route
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const products = await Products.find({});
    if (products.length === 0) {
        const createdProducts = await Products.insertMany(data.products);
        return res.status(201).send(createdProducts);
    }
    res.send({ message: 'Products already exist', products });
}));
productRouter.get('/productslists', isAuth,isAdmin, 
    expressAsyncHandler(async(req, res) => {
    // This only grabs the fields you listed
    const products = await Products.find({}).select('_id name image brand price countInStock');

    if (products && products.length > 0) {
        res.status(200).send(products);
    } else {
        res.status(404).send({ message: 'Products Not Found' });
    }
})
)
// 2. Get All Products (FIXED LOGIC)
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Products.find({});
    // We send the array regardless. If empty, it's just [].
    // If you want an error when empty, check products.length === 0
    res.status(200).send(products);
}));

// 3. Get Single Product
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

export default productRouter;