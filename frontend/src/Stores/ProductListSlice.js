import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createProduct } from './CreateProductSlice';


export const fetchProducts = createAsyncThunk(
    'productList/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            // 1. Axios puts the data in a .data property
            const response = await axios.get('/api/products');

            return response.data; 
        } catch (error) {
            // 2. Use rejectWithValue to pass the error to the 'rejected' case
            return rejectWithValue(error.response?.data || 'Failed to Fetch Products');
        }
    }
)

const ProductListSlice = createSlice({
    name: 'products',
   initialState: {
  products: [],
  loading: false,
  createLoading: false,
  error: null,
  createError: null,
  createSuccess: false,
}
,
    reducers: {
        reset_success : (state)=>{ state.createSuccess = false;}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                // 3. action.payload contains the value from rejectWithValue
                state.error = action.payload || action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
                state.createSuccess = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createLoading = false;
                state.createSuccess = true;
                const index = state.products.findIndex((p)=> p._id === action.payload._id);
                if (index >=0) {
                    state.products[index] = action.payload;
                }
                else {
                      state.products = [...state.products, action.payload]
                }
              
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.createLoading = false;
                // 3. action.payload contains the value from rejectWithValue
                state.createError = action.payload || action.error.message;
            })
    }
})
export const {reset_success} = ProductListSlice.actions;
export default ProductListSlice.reducer;