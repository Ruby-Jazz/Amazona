import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchEachProduct = createAsyncThunk(
    'productDetails/fetchEachproduct',
    async (productId,{rejectWithValue}) =>{
        try {
            const response = await axios.get(`/api/products/${productId}`);
            return  response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to Fetch this Product')
            
        }
    }
)

const ProductDetailsSlice = createSlice({
    name: 'product',
    initialState :{
        product : {},
        loading : false,
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchEachProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.product = {}

        })
        .addCase(fetchEachProduct.fulfilled,(state,action)=>{
            state.loading= false;
            state.product = action.payload;
        })
        .addCase(fetchEachProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ProductDetailsSlice.reducer;