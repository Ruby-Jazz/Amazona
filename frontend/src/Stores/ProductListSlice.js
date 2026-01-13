import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


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
        products: [], // Changed from {} to [] assuming a list of products
        loading: false,
        error: null,
    },
    reducers: {},
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
    }
})

export default ProductListSlice.reducer;