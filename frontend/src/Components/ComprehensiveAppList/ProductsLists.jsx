import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';
import { getProductsLists } from '../../Stores/ProductListsSlice';
import { createProduct } from '../../Stores/CreateProductSlice';
import { fetchProducts, reset_success } from '../../Stores/ProductListSlice';

const ProductsLists = () => {
    const {loading,error,createSuccess,createError,createLoading,products}= useSelector(state=>state.productList);
    const [modalVisible, setModalVisible] = useState(false);
     const [formData, setFormData] = useState({name : '', image : null, brand : '', category : '', description :'', price : '', countInStock :'', _id : null})
        const input = [
            {label : 'Name', htmlFor : 'name', type : 'text',
                id : 'name',  placeholder : 'product name',  name : 'name', },
    
            {label : 'Image', htmlFor : 'image', type : 'file',
                id : 'image',  name : 'image', },
    
            {label : 'Brand', htmlFor : 'brand', type : 'text',
                id : 'brand',  placeholder : 'product brand',  name : 'brand', },
    
            {label : 'Category', htmlFor : 'category', type : 'text',
                id : 'category',  placeholder : ' product category',  name : 'category', },
    
            {label : 'Description', htmlFor : 'description', type : 'text',
                id : 'description',  placeholder : 'product description',  name : 'description', },
    
            {label : 'Price', htmlFor : 'price', type : 'number',
                id : 'price',  placeholder : 'product price',  name : 'price', },
    
            {label : 'Count In Stock', htmlFor : 'countInStock', type : 'text',
                id : 'countInStock',  placeholder : 'product countInStock',  name : 'countInStock', },
        ]
  const openCreateModal = () => {
    setFormData({
      _id : null,
      name: '',
      image: null,
      brand: '',
      category: '',
      description: '',
      price: '',
      countInStock: '',
    });
    setModalVisible(true);
  };

      const openEditModal = (product) => {
    setFormData({
      _id : product._id,
      name: product.name,
      image: null, // user may change it
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
    });
    setModalVisible(true);
  };
    const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  
    const handleSubmit = (e)=>{
        e.preventDefault();
    dispatch(createProduct(formData))
    }
    useEffect(()=>{
      dispatch(fetchProducts())
      dispatch(getProductsLists())
      if(createSuccess) {setModalVisible(false)
        dispatch(reset_success())
      }
    },[dispatch,createSuccess])
  return (
    <div>
      <div>
        <h1>Users Lists</h1>
      </div>

     
{loading ? <LoadingBox/> :error ? <MessageBox variant='danger'>{error} </MessageBox>: 

( <div>
  <div>
   <h3>Products</h3>
<button className='button primary' disabled={modalVisible} onClick={()=>openCreateModal()}>Create products</button>
  
  </div>
  {modalVisible && 
  <div>
            <form className='form' onSubmit={handleSubmit}>
              {createSuccess && <MessageBox variant='success'> Producted 
  created successfully</MessageBox> }
              {createError && <MessageBox variant='danger'>{createError} </MessageBox> }
{input && input.map((item)=> {
    const {label , ...inputProps} = item;
    return(
        <div key={item.id}>
            <label htmlFor={item.htmlFor}>{label} </label>
            <input {...inputProps} onChange={handleChange}
            value={inputProps.type !== 'file' ? formData[inputProps.name] : undefined }/>
        </div>
    )
})}
<div>
    <label/>
    {formData._id? 
  <button className='primary'>{createLoading? 'Upadting Product...' : 'Update Product'}</button>  : <button className='primary'>{createLoading? 'Creating Product' :'Create Product'} </button>
  }
   
</div>
        </form>
  </div>
  }
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
          <button className='small' onClick={()=>openEditModal(product)}>Edit</button>
          <button className='small'>Delete</button>
        </td>
    </tr>
  ))}
</tbody>

            </table>
     </div>   )}


    </div>
  )
}

export default ProductsLists