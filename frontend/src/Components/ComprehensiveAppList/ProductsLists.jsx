import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';
import { getProductsLists } from '../../Stores/ProductListsSlice';

const ProductsLists = () => {
    const {loading,error,products}= useSelector(state=>state.productsLists);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getProductsLists())
    },[dispatch])
  return (
    <div>
      <div>
        <h1>Users Lists</h1>
      </div>
{loading ? <LoadingBox/> :error ? <MessageBox variant='danger'>{error} </MessageBox>:

(
            <table className='table'>
                <thead>
                   <tr>
                    <th>ID</th>
                
                    <th>NAME</th>
                    <th>BRAND</th>
                    <th>IMAGE</th>
                    <th>PRICE</th>
                    <th>NUM LEFT</th>
                    <th> ACTION</th>
                  
                   </tr>
                </thead>
                <tbody>
  { products && products.map(product => (
    <tr key={product._id}>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.brand}</td>
      <td>
        <img src={product.image} alt={product.name}  className='small'/>
      </td>
      <td>${product.price.toFixed(2)}</td>
        <td>{product.countInStock}</td>
        <td>
          <button className='small'>Edit</button>
          <button className='small'>Delete</button>
        </td>
    </tr>
  ))}
</tbody>

            </table>
        )}


    </div>
  )
}

export default ProductsLists