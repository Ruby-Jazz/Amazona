import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import CheckOutSteps from './CheckOutSteps';
import { Link, useNavigate } from 'react-router-dom';
import { createOrders } from '../../Stores/OrderCrestionSlice';
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';

const PlaceOrderScreen = () => {
    const {shippingAddress,cartItems,paymentMethod} = useSelector(state => state.cartScreen);
    const {order,loading,error,success} = useSelector(state=> state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!paymentMethod){
            navigate('/payment')}
            if (success){navigate(`/order/${order._id}`)}
          
        
    },[paymentMethod,success,order])
    const toPrice = (num)=>Number(num.toFixed(2));
    const itemsPrice = toPrice(cartItems.reduce((a,c)=>a +c.price * c.qty,0));
    const shippingPrice = itemsPrice > 1200? 0 : toPrice(10);
    const taxPrice = toPrice(itemsPrice * 0.075);
    const totalPrice =  toPrice(itemsPrice + shippingPrice+ taxPrice)
    const handlePlaceOrder = ()=>{
     
      dispatch(createOrders({orderItems :cartItems,shippingAddress,paymentMethod,itemsPrice,shippingPrice,taxPrice,totalPrice}))
    }
  return ( 
    
    <div>
            <CheckOutSteps step1 step2 step3 step4/>
       
<div className='row top'>
      
        <div className="col-2">
            <ul>
                <li>
                    <div className="card card-body">
                        <h1>Shipping</h1>
                        <p>
                            <strong>Name: </strong>{shippingAddress.fullName} <br />
                            <strong>Address: </strong>{shippingAddress.address},{shippingAddress.city},{shippingAddress.postalCode},{shippingAddress.country}.
                        </p>
                    </div>
                </li>
                <li>
                    <div className="card card-body">
                        <h1>Payment</h1>
                        <p>
                            <strong>Method: </strong>{paymentMethod} </p> </div>
                </li>
                <li>
                    <div className="card card-body">
                        <h1>Order Items</h1>
  <ul>
          {cartItems.map(x => 
            <li key={x.id}>
<div className="row">
  <div>
    <img src={x.image} alt={x.name} className='small' />
  </div>
  <div className="min-30">
    <Link to={`/product/${x.id}`}>{x.name}</Link>
  </div>

  <div>${x.price} x {x.qty} =  ${x.qty * x.price}</div>

</div> 
            </li>
          )}
         </ul>

                      </div>
                </li>
            </ul>
        </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h1>Order Summary</h1>
            </li>
            <li>
              <div className="row">
                <div><strong>Items Price</strong></div> <div>${itemsPrice.toFixed(2)}</div>
                 </div>
   </li>
            
            <li>
              <div className="row">
                <div>Shipping Price</div> <div className={shippingPrice=== 0? 'success' : ''}>{shippingPrice=== 0? 'free' : `$${shippingPrice.toFixed(2)}`}</div>
                 </div>
   </li>
            
            <li>
              <div className="row">
                <div>Tax Price</div> <div>${taxPrice.toFixed(2)}</div>
                 </div>
   </li>
            
            <li>
              <div className="row">
                <div><strong>Total Price</strong> </div> <div>${totalPrice.toFixed(2)}</div>
                 </div>
   </li>
   <li>
    <button className='primary block' disabled={cartItems.length ===0} onClick={()=>handlePlaceOrder()}>{loading? <LoadingBox/> : success? 'Orders Created!': 'Place Order'}</button>
   </li>
          {loading && <LoadingBox/>}  
           {error && <MessageBox variant='danger'> {error} </MessageBox>}
          </ul>
        </div>
        </div>  
    </div> </div>
  )
}

export default PlaceOrderScreen