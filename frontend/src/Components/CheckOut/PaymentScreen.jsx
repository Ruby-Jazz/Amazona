import React, { useEffect, useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../Stores/CartScreenSlice';
import { useNavigate } from 'react-router-dom';
import { order_details_reset } from '../../Stores/OrderCrestionSlice';

const PaymentScreen = () => {
    const address = useSelector(state=> state.cartScreen.shippingAddress?.address);
    const payment = useSelector(state =>state.cartScreen?.paymentMethod)
    const navigate = useNavigate();
    useEffect(()=>{
      dispatch(order_details_reset());
        if(!address)
        {
             navigate('/shipping') 
        }
          
    },[address,navigate])
    const [paymentMethod, setPaymentMethod] = useState(payment);
   const  dispatch = useDispatch()
    const handleSumbit =(e)=>{
        e.preventDefault();
      
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
  return (
    <div>
    <CheckOutSteps step1 step2 step3/>
    <form className='form' onSubmit={handleSumbit} >
    <div>
    <h1>Select Payment Method</h1>
    </div>
    <div>
         <div>
        <input type="radio" id='paypal'
        name='paymentMethod'
        value='PayPal'
        checked={paymentMethod === 'PayPal'}
        onChange={e=>setPaymentMethod(e.target.value)}/>
        <label htmlFor='paypal'>PayPal</label>
    </div>
    </div>
  <div> <div>
        <input type="radio" id='opay'
        name='paymentMethod'
        value='Opay'
        checked={paymentMethod === 'Opay'} 
        onChange={e=>setPaymentMethod(e.target.value)}/>
        <label htmlFor='opay'>Opay</label>
    </div>
    </div> 
   <div>
     <div>
        <input type="radio" id='palmpay'
        name='paymentMethod'
        value='Palmpay'
        checked={paymentMethod === 'Palmpay'}
        onChange={e=>setPaymentMethod(e.target.value)}/>
        <label htmlFor='palmpay'>Palmpay</label>
    </div>
   </div>
   
    <div>
        <button className='primary'>Continue</button>
    </div>
   </form>
    </div>
  )
}

export default PaymentScreen