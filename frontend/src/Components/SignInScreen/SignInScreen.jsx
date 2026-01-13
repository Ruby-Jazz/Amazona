import React from 'react'
import { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import './SignInScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser } from '../../Stores/SignInSlice'
import { useEffect } from 'react'
import LoadingBox from '../Loading/LoadingBox'
import MessageBox from '../Loading/MessageBox'
const SignInScreen = () => {
    const {userInfo,loading,error,success} = useSelector(state => state.auth);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search? location.search.split('=')[1]: '/';
    const handleSubmit = (e)=>{
e.preventDefault();
dispatch(signInUser({email,password})) ;

    }
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }

        if(success){
    setEmail('');
    setPassword('');
}
    },[navigate,userInfo,success,redirect])
    
    
    
  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <h1>Sign In</h1>
            </div>
            {error && 
            <MessageBox variant='danger'> {error} </MessageBox>
            }
            <div>
                <label htmlFor="email"> Email  </label>
                    <input type="email" id='email' name='email' 
                    value={email} placeholder='Enter your email here...' 
                    onChange={e=> setEmail(e.target.value)} />
               
            </div>
            <div>
                <label htmlFor="password">Password </label>
                    <input type="text" id='password' name='password' 
                    value={password} placeholder='Enter your password ...' 
                    onChange={e=> setPassword(e.target.value)} />
               
            </div>
            <div>
                <label/>
                <button className='primary' disabled={loading}>
                    {loading? <LoadingBox/> : 'Sign-In'}
                </button>
            </div>
            <div>
            <label/>
            <div>
                New to Amazona? {''}
                <Link to={`/register?redirect=${redirect}`}>Create an Amazona account</Link>
            </div>
            </div>
        </form>
    </div>
  )
}

export default SignInScreen