import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrders = createAsyncThunk(
    'cart/createOrders',
    async (order,{getState,rejectWithValue})=> {
        try {
            const {auth : {userInfo}} = getState();
            const {data} = await axios.post('/api/orders',order ,{
                headers : {
                    authorization : `Bearer ${userInfo.token}`
                }
        
            });
            return data.order;
        } catch (error) {
            const err = error.response && error.response.data.message? error.response.data.message :error.message;
    return        rejectWithValue(err);
        }
    }
)


const orderCreationSlice = createSlice({
    name : 'orders',
    initialState : {
        order : {},
        loading : false,
        error : null,
        success :false,
    },
    reducers : {
          order_details_reset : (state)=> {
                    state.loading = false;
                    state.error = null;
                    state.order = {};
                    state.success= false;
                }
    },
    extraReducers : (builder)=> {
        builder
        .addCase(createOrders.pending,(state)=>{
            state.loading = true;
            state.error = false;
        })
        .addCase(createOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
            state.success = true;
        })
        .addCase(createOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export const {order_details_reset} = orderCreationSlice.actions;
export default orderCreationSlice.reducer;