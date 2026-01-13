import React, { useEffect, useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { saveShippingAddress } from '../../Stores/CartScreenSlice'
const ShippingScreen = () => {
    const navigate = useNavigate();
    const {userInfo } = useSelector(state => state.auth);
    const shippingAddress = useSelector(state =>state.cartScreen.shippingAddress) || {};
    
    
    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAdress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')
    const dispatch = useDispatch();
useEffect(()=>{


            if(!userInfo){
navigate('/signin')

setFullName(shippingAddress.fullName);
setAdress(shippingAddress.address);
setCity(shippingAddress.city);
setPostalCode(shippingAddress.postalCode);
setCountry(shippingAddress.country);
  }  },[navigate,userInfo,shippingAddress])

    const handleSubmit =(e)=>{
e.preventDefault();
     
        dispatch(saveShippingAddress({
            fullName,address,city,postalCode,country
        }));
        navigate('/payment')
    }
    
  return (
    <div>
        <CheckOutSteps step1 step2/>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <h1>
                    Shipping Address
                </h1>
            </div>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id='fullName'
                placeholder='Enter your full name...'
                value={fullName}
                onChange={e=> setFullName(e.target.value)}required/>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" id='address'
                placeholder='Enter your address...'
                value={address}
                onChange={e=> setAdress(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input type="text" id='city'
                placeholder='Enter your city...'
                value={city}
                onChange={e=> setCity(e.target.value)}required />
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id='postalCode'
                placeholder='Enter your postalc code...'
                value={postalCode}
                onChange={e=> setPostalCode(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input type="text" id='country'
                placeholder='Enter your country...'
                value={country}
                onChange={e=> setCountry(e.target.value)} required />
            </div>
            <div>
                <label/>
                <button className='primary'>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default ShippingScreen