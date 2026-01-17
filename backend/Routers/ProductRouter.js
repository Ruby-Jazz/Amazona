import express from 'express';
import expressAsyncHandler from "express-async-handler";
import Products from "../Models/ProductModels.js";
import data from "../Data.js";
import { isAdmin, isAuth } from '../util.js';
import cloudinary from '../util.js';
import { upload } from '../multer.js';

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
    const products = await Products.find({}).select('_id name image brand price countInStock description category');

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
productRouter.post('/', isAuth, isAdmin,upload.single('image'), expressAsyncHandler(
    async(req,res) =>{
         if(!req.file){ return res.status(404).json('no files uploaded')}
            const base64 = req.file.buffer.toString('base64');
            const dataURL = `data:${req.file.mimetype};base64,${base64}`;
            const result = await cloudinary.uploader.upload(dataURL);
const product = new Products({
    name : req.body.name,
    brand : req.body.brand,
    price : req.body.price,
    image : result.secure_url,
    cloudinary_id : result.public_id,
    countInStock : req.body.countInStock,
    description : req.body.description,
    category : req.body.category,
})
const newProduct = await product.save();
return res.status(201).json({message: 'new product Created Successfully', newProduct})
    }))
productRouter.put('/:id', isAuth,isAdmin, upload.single('image'), expressAsyncHandler(async(req,res)=>{
const product = await Products.findById(req.params.id);
if(!product){return res.status(404).json({message : 'no product found'})}

let image = product.image;
let cloudinary_id = product.cloudinary_id;
if(req.file){
 const base64 = req.file.buffer.toString('base64');
            const dataURL = `data:${req.file.mimetype};base64,${base64}`;
            const result = await cloudinary.uploader.upload(dataURL);
            if(cloudinary_id){ 
                await cloudinary.uploader.destroy(cloudinary_id)
            }

            cloudinary_id = result.public_id;
            image = result.secure_url;
}
product.name = req.body.name || product.name;
product.brand = req.body.brand || product.brand;
product.image = image || product.image;
product.price = req.body.price || product.price;
product.category = req.body.category || product.category;
product.description = req.body.description || product.description;
product.numReviews = req.body.numReviews || product.numReviews;
product.rating = req.body.rating || product.rating;
product.countInStock = req.body.countInStock || product.countInStock;
product.cloudinary_id = cloudinary_id || product.cloudinary_id;
const newProduct = await product.save();
return res.status(200).json({message: 'product updated successfully', newProduct})

}))


// 3. Get Single Product
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}))

export default productRouter;