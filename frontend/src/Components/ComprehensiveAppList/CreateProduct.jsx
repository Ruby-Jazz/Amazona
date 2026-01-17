import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { createProduct } from '../../Stores/CreateProductSlice'

const CreateProduct = () => {
 const [formData, setFormData] = useState({name : '', image : '', brand : '', category : '', description :'', price : '', countInStock :''})
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
   
const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  setFormData({
    ...formData,
    // If it's a file input, grab the file object; otherwise, grab the text/number value
    [name]: type === 'file' ? files[0] : value,
  });
};
const dispatch = useDispatch()
const handleSubmit = (e)=>{
    e.preventDefault();
dispatch(createProduct(formData))
}
  return (
   <div>
        <form className='form' onSubmit={handleSubmit}>
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
    <button className='primary'>Create Product </button>
</div>
        </form>
    </div>
  )
}

export default CreateProduct