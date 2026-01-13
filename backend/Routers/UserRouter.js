import User from "../Models/UserModels.js"; // Ensure .js extension if using ES Modules
import express from 'express';
import data from "../Data.js";
import bcrypt  from "bcryptjs";
import expressAsyncHandler from 'express-async-handler'
import { generateToken, isAdmin, isAuth } from "../util.js";
const userRouter = express.Router(); // Use Router(), not express()

userRouter.get('/seed',
     expressAsyncHandler(async (req, res) => {
  
        // 1. Await the database call
        const users = await User.find({});

        // 2. Check the length of the array
        if (users.length === 0) {
            const createdUsers = await User.insertMany(data.users);
            return res.status(201).send(createdUsers);
        }

        // 3. If users exist, send them
        res.send({msg : 'users already created',users});
    
}));


userRouter.post('/register',
    expressAsyncHandler( async (req,res)=>{
    const existsUser = await User.findOne({email : req.body.email})
    if (existsUser) {
        res.send({message: 'email already exists'})
        return;
    }
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password,8)
        });
        const newUser = await user.save();
        if(newUser){
    res.send({
         _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token : generateToken(newUser)
    })
    
   
}
    else { res.send({msg : 'invalid user Data'})}
}))

userRouter.post('/signin', expressAsyncHandler(
    async(req,res)=>{
        const user = await User.findOne({email: req.body.email})
        if(user){
           const password = bcrypt.compareSync(req.body.password,user.password);
           if(password){
            res.send({
                _id: user._id,
                name : user.name,
                isAdmin : user.isAdmin,
                email: user.email,
                token : generateToken(user),
            })
            return;
           }
        }
        res.status(401).send({message: 'Invalid email or Password'});
    }
)
)
userRouter.get('/userslists', isAuth, isAdmin,
    expressAsyncHandler(
        async(req,res)=>{
            const users = await User.find({}).select('_id name email').lean();
            if (users.length > 0){
              
            return    res.status(200).send(users)
            }
            else {
                return res.status(404).send({message : 'Users Not Found'})
            }
        }
    )
)
userRouter.get('/:id',isAuth, expressAsyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.params.id);
        if(user){
            return res.status(200).send(user);

        }
        return res.status(404).send({message: 'User Not Found'})
    }
))

userRouter.put('/profile', isAuth, expressAsyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.user._id);
        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password,8);
            }

            const updatedUserProfile = await user.save();
        return    res.status(200).send({
                _id : updatedUserProfile._id,
                name : updatedUserProfile.name,
                email : updatedUserProfile.email,
                isAdmin : updatedUserProfile.isAdmin,
           
                token : generateToken(updatedUserProfile)
            })
        }
        else {
            return res.status(404).send({message: 'User Profile Not Found'})
        }
    }
))


export default userRouter;