import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../Stores/CartScreenSlice';
import MessageBox from '../Loading/MessageBox'
const CartScreen = () => {
  const {cartItems} = useSelector(state => state.cartScreen);
  const dispatch = useDispatch();
    const {id} = useParams();
    const location = useLocation();
  const qty =  location.search? Number(location.search.split('=')[1]) :1;
const navigate = useNavigate();
  useEffect(()=>{
  if(id) {
    dispatch(addToCart({productId:id,qty}));
    navigate('/cart', { replace: true });
  }
  },[dispatch,id,qty])
  const handleRemoveFromCart = (id)=>{
    if(id) {
      dispatch(removeFromCart(id))
    }
  }
  const handleCheckOut = ()=>{
    navigate('/signin?redirect=/shipping')
  }
  return (
    <div className='row top'>
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <MessageBox>Cart is Empty.<Link to='/'> Go Shopping</Link></MessageBox> : (
         <ul>
          {cartItems.map(x => 
            <li key={x.product}>
<div className="row">
  <div>
    <img src={x.image} alt={x.name} className='small' />
  </div>
  <div className="min-30">
    <Link to={`/product/${x.id}`}>{x.name}</Link>
  </div>
  <div>
    <select value={x.qty} onChange={e=>dispatch(addToCart({productId:x.id,qty:Number(e.target.value)}))}>
      {[...Array(x.countInStock).keys()].map(x =>
                            <option key={x+1} value={x+1}>{x+1}</option>
                          )}
    </select>
  </div>
  <div>${x.price}</div>
  <div>
    <button onClick={()=>handleRemoveFromCart(x.id)}>Delete</button>
  </div>
</div>
            </li>
          )}
         </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a,c)=>a+c.qty,0)})Items:
                ${cartItems.reduce((a,c)=>a+c.qty*c.price,0)}
              </h2>
            </li>
            <li>
              <button className='primary block' disabled={cartItems.length ===0} onClick={handleCheckOut}>Proceed to Checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CartScreen