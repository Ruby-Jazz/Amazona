import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEachProduct } from '../../Stores/ProductDetailsSlice';
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Destructure state from Redux
  const { product, loading, error } = useSelector(state => state.productDetails);

  useEffect(() => {
    // Use the id from useParams directly
    if (id) {
      dispatch(fetchEachProduct(id));
    }
  }, [dispatch, id]); // Dependency array ensures this runs only when ID changes

  const [qty,setQty] = useState(1);
  const handleAddToCart = ()=>{
navigate(`/cart/${id}?qty=${qty}`
  
)

  }

  return (
<div>
     { loading? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) :
     
   ( <div className='row top product-details-container'>
       <Link to='/' className='back'>Back to result</Link>
       
       <div className="col-2">
         <img className='large' src={product.image} alt={product.name} />
       </div>

       <div className="col-1">
         <ul>
           <li><h1>{product.name}</h1></li>
           <li><Rating product={product}/></li>
           <li>Price: ${product.price}</li>
           <li>Description: <p>{product.description}</p></li>
         </ul>  
       </div>
    
       <div className="col-1">
         <div className="card card-body">
           <ul>
             <li>
               <div className="row">
                 <div>Price</div>
                 <div className='price'> <b>$ {product.price}</b></div>
               </div>
             </li>
             <li>
               <div className="row">
                 <div>Status</div>
                 <div>
                   {product.countInStock > 0
                     ? (<span className='success'>In Stock</span>) 
                     : (<span className='danger'>Unavailable</span>) 
                   }
                 </div>
               </div>
             </li>
             {product.countInStock > 0 && (
              <> 
               <li>
                    <div className='row'>
                      <div>Qty</div>
                      <div>
                        <select value={qty} onChange={e=> setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(x =>
                            <option key={x+1} value={x+1}>{x+1}</option>
                          )}
                        </select>
                      </div>
                    </div>
                   </li>
               <li>
                 <button className='primary block' onClick={()=>handleAddToCart()}>Add to Cart</button>
               </li>
          </>   )}
           </ul>
         </div>
       </div>
    </div>)
    }</div>
  )
}

export default ProductDetails;