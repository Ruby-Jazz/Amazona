import React from 'react'
import { Link, Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import HomeScreen from './Components/HomeScreen/HomeScreen'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartScreen from './Components/CartScreen/CartScreen'
import { useDispatch, useSelector } from 'react-redux'
import SignInScreen from './Components/SignInScreen/SignInScreen'
import { logout } from './Stores/AuthSlice'
import RegisterUser from './Components/SignInScreen/RegisterScreen'
import ShippingScreen from './Components/CheckOut/ShippingScreen'
import PaymentScreen from './Components/CheckOut/PaymentScreen'
import PlaceOrderScreen from './Components/CheckOut/PlaceOrderScreen'
import OrderDetailsScreen from './Components/CheckOut/OrderDetalisScreen'
import OrderHistory from './Components/ComprehensiveAppList/OrderHistory'
import UserProfile from './Components/SignInScreen/UserProfile'
import ProfileRoute from './Components/ProtectedRoutes/ProfileRoute'

import UsersLists from './Components/ComprehensiveAppList/UsersLists'
import AdminRoutes from './Components/ProtectedRoutes/AdminRoutes'
import OrdersLists from './Components/ComprehensiveAppList/OrdersList'
import ProductsLists from './Components/ComprehensiveAppList/ProductsLists'
const App = () => {
  const {userInfo} = useSelector(state=> state.auth)
  const  {cartItems} = useSelector(state => state.cartScreen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogOut = ()=>{
  dispatch(logout());
  navigate('/signin')
}
  return (
  
     <div className="grid-container">
            <header className="row">
<div>
    <Link className="brand" to="/">Amazona</Link>
</div>
<div>
    <Link to="/cart">Cart{cartItems.length >0 && <span className='badge'> {cartItems.length} </span> }
    </Link>
  {userInfo ? (
  <div className="dropdown">
    <Link to="/profile" className="dropdown-toggle">
      {userInfo.name} <i className="fa-solid fa-caret-down"></i>
    </Link>

    <ul className="dropdown-content">
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to='/orderhistory'>Order History</Link>
      </li>
      <li>
        <button type="button" onClick={handleLogOut} >
          Sign Out
        </button>
      </li>
    </ul>
  </div>
) : (
  <Link to="/signin">Sign In</Link>
)}

{userInfo && userInfo.isAdmin && (
   <div className="dropdown">
    <Link to="/#admin" className="dropdown-toggle">
      Admin <i className="fa-solid fa-caret-down"></i>
    </Link>

    <ul className="dropdown-content">
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/productslist">Products</Link>
      </li>
      <li>
        <Link to="/orderslist">Orders</Link>
      </li>
      <li>
        <Link to='/userslist'>Users</Link>
      </li>
      
    </ul>
  </div>
)

}     
 
  
   
</div>
            </header>
            <main>
<Routes>
    <Route path='/' element={<HomeScreen/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path= '/cart/:id?' element={<CartScreen/>}/>
    <Route path='/signin' element={<SignInScreen/>}/>
    <Route path='/register' element={<RegisterUser/>}/>
    <Route path='/shipping' element={<ShippingScreen/>}/>
    <Route path='/payment' element={<PaymentScreen/>}/>
    <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
    <Route path='/order/:id' element={<OrderDetailsScreen/>}/>
    <Route path='/orderhistory' element={<OrderHistory/>}/>
    <Route element={<ProfileRoute />}>
  <Route path="/profile" element={<UserProfile />} />
</Route>
<Route element={<AdminRoutes/>}> 
<Route path='/orderslist' element={<OrdersLists/>}/>
<Route path='/productslist' element={<ProductsLists/>}/>
   <Route path='/userslist' element={<UsersLists/>}/></Route>
</Routes>
   </main>
            <footer className='row center'>
All Rights Reserved
            </footer >
        </div>
   

  )
}

export default App