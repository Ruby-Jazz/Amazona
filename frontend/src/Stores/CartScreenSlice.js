import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { logout } from './AuthSlice';
export const addToCart = createAsyncThunk(
    'cartScreen/addToCart',
    async ({ productId, qty }, { getState, rejectWithValue }) => {
        try {
            const { cartScreen: { cartItems } } = getState();
            const existItem = cartItems.find((x) => x.id === productId);

            let item;

            // OPTIMIZATION: If item already exists in cart, just update qty. 
            // Don't waste a network request fetching data we already have.
            if (existItem) {
                item = { ...existItem, qty };
            } else {
                // If item is NEW, fetch details from the server
                const response = await api.get(`/api/products/${productId}`);
                const data = response.data;
                item = {
                    product: data._id,
                    name: data.name,
                    brand: data.brand,
                    image: data.image,
                    countInStock: data.countInStock,
                    price: data.price,
                    qty,
                };
            }

            // Generate the updated array
            const updatedCart = existItem
                ? cartItems.map((x) => (x.id === productId ? item : x))
                : [...cartItems, item];

            // Sync with LocalStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));

            return updatedCart;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response?.data || 'Product Not Found');
        }
    }
);

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(saveToShipping(data));
  localStorage.setItem(
    'shippingAddress',
    JSON.stringify(data)
  );
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(addPaymentMethod(data));
  localStorage.setItem(
    'paymentMethod',
    JSON.stringify(data)
  );
};

const cartScreenSlice = createSlice({
    name: 'cartScreen',
    initialState: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems')) 
            : [],
            shippingAddress : localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) :{},
            paymentMethod : localStorage.getItem('paymentMethod')? JSON.parse(localStorage.getItem('paymentMethod')) :'',
    },

    reducers: {
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        saveToShipping : (state,action) => {
            state.shippingAddress = action.payload
        },
        addPaymentMethod : (state,action) => {
            state.paymentMethod = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.paymentMethod = '';
        })
        .addCase(logout,(state)=>{
            state.cartItems = [];
            state.shippingAddress ={};
            state.paymentMethod = '';
            localStorage.removeItem('cartItems')
            localStorage.removeItem('shippingAddress')
            localStorage.removeItem('paymentMethod')
        })
       
    }
});

export const { removeFromCart,addPaymentMethod,saveToShipping } = cartScreenSlice.actions;
export default cartScreenSlice.reducer;