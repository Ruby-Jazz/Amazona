import React from 'react'
import './CheckOutSteps.css'
import { Link } from 'react-router-dom'
const CheckOutSteps = ({step1,step2,step3,step4}) => {
  return (
    <div className='row checkout-steps'>
        <div className={step1? 'active' : ''}>Sign-In</div>
        <div className={step2? 'active' : ''}><Link to='/shipping' className='link'>Shipping</Link></div>
        <div className={step3? 'active' : ''}><Link to='/payment' className='link'>Payment</Link></div>
        <div className={step4? 'active' : ''}><Link to='/placeorder' className='link'>Place Order</Link></div>
        
    </div>
  )
}

export default CheckOutSteps 