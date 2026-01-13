import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../Models/OrderModel.js';
import { isAdmin, isAuth } from '../util.js';
const orderRouter = express.Router();

orderRouter.post('/', isAuth,
    expressAsyncHandler(
        async(req,res)=>{

        const orderItems = req.body.orderItems;
        if(orderItems.length === 0){
       return     res.send({message : 'Cart is Empty.'})
        }
        const userOder = new Order({
            orderItems : req.body.orderItems,
            shippingAddress : req.body.shippingAddress,
            paymentMethod : req.body.paymentMethod,
            itemsPrice : req.body.itemsPrice,
            shippingPrice : req.body.shippingPrice,
            taxPrice : req.body.taxPrice,
            totalPrice : req.body.totalPrice,
            user : req.user._id,
        });
const newOrder = await userOder.save();
if(newOrder){ return res.status(201).send({message: 'New order Created', order:newOrder})}
        }
    )
)
orderRouter.get('/mine', isAuth,
    expressAsyncHandler(
    async (req,res)=>{
        const orders = await Order.find({user:req.user._id});
        if(orders.length > 0){
            return res.status(200).send(orders)
        }
        else{res.status(404).send({message: 'Orders Not Found'})}
    }
    )
)
orderRouter.get('/orderslists', isAuth,isAdmin,
    expressAsyncHandler(
        async(req,res)=>{
            const orders = await Order.find({}).populate('user','name email');
            if(orders.length >0) {
                return res.status(200).send(orders);
            }
            else{ return res.status(404).send({message : 'Order Not Found'})}
        }
    )
)
orderRouter.get('/:id', isAuth,
    expressAsyncHandler(
        async(req,res) =>{
const order = await Order.findById(req.params.id);
if(order){
    res.status(200).send(order);
}
else {res.status(404).send({message: 'Order Not Found'})}
        }
    )
)
orderRouter.put('/:id/pay',isAuth,
    expressAsyncHandler(
        async(req,res)=> {
            const order = await Order.findById(req.params.id);
            if(order){
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id : req.body.id,
                    status : req.body.status,
                    update_time : req.body.update_time,
                    email_address : req.body.payer.email_address,

                }
            
    const updatedOrder = await order.save();
    res.status(200).send({message: 'Order Paid', order: updatedOrder});}
         else{
            res.status(404).send({message:'Order Not Found'});
         }   
        }
    )
)
export default orderRouter;