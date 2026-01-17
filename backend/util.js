import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();
 export const generateToken = (user)=>{
  return  jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email :user.email,
            isAdmin : user.isAdmin,
        },
        process.env.JWT_SECRET,{expiresIn : '30d'}
    )
}

export const isAuth = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7,authorization.length);
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
                if(err){res.status(401).send({message: 'Invalid Token'})}
                else {
                    req.user = decode;
                    next();
                }
            })
        }
    }
    else {
        res.status(401).send({message: 'No Token'})
    }
}

export const isAdmin =(req,res,next) =>{
    if(req.user && req.user.isAdmin){
       next(); 
       return
    }
      else {
        res.status(401).send({message: 'Invalid Admin Token'})
    }
}



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Current Cloudinary Config:", cloudinary.config().api_key);
export default cloudinary;
