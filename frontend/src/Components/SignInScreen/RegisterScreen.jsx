import React from 'react'
import { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import './SignInScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import LoadingBox from '../Loading/LoadingBox'
import MessageBox from '../Loading/MessageBox'
import { register } from '../../Stores/RegisterSlice'
const RegisterUser = () => {
    const {userInfo,loading,error,success} = useSelector(state => state.auth);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [password,setPassword] = useState('');
    const [formError,setFormError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search? location.search.split('=')[1]: '/';
    const handleSubmit = (e)=>{
e.preventDefault();
if (password === rePassword) {
    dispatch(register({name,email,password})) ;

}
else {
    setFormError('Password and Confirm Password must match');
}

    }
    useEffect(()=>{
    
        if(userInfo){
            navigate(redirect)
        }


    },[navigate,userInfo,success,redirect])
    
    
    
  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <h1>Register Now</h1>
            </div>
            {error && 
            <MessageBox variant='danger'> {error} </MessageBox>
            }
            <div>
                <label htmlFor="name"> Name  </label>
                    <input type="name" id='name' name='name' 
                    value={name} placeholder='Enter your name here...' 
                    onChange={e=> setName(e.target.value)} />
               
            </div>
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
                    onChange={e=>{ setPassword(e.target.value);
                        setFormError('');
                    }} />
               
            </div>
            {
            formError && <MessageBox variant='danger'> {formError} </MessageBox>
            }
            <div>
                <label htmlFor="rePassword">Confirm Password </label>
                    <input type="text" id='rePassword' name='rePassword' 
                    value={rePassword} placeholder='Enter your password ...' 
                    onChange={e=> {setRePassword(e.target.value);
                        setFormError('');
                    }} />
               
            </div>
            <div>
                <label/>
                <button className='primary' disabled={loading}>
                    {loading? <LoadingBox/> : 'Register!'}
                </button>
            </div>
            <div>
            <label/>
            <div>
                Already have an account? {''}
                <Link to={`/signin?redirect=${redirect}`}>Sign In Here</Link>
            </div>
            </div>
        </form>
    </div>
  )
}

export default RegisterUser;