import React from 'react'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'


const ProductScreen = ({product}) => {
  return (
    <div>
     
          <div className="card">
        <Link to={`product/${product._id}`}>
            <img className="medium" src={product.image}alt={product.name}/>
        </Link>
        <div className="card-body">
            <Link to={`product/${product._id}`}><h2>{product.name}</h2></Link>
           <Rating product={product}/>
            <div className="price">${product.price}</div>
        </div>
    </div>
    </div>
  )
}

export default ProductScreen