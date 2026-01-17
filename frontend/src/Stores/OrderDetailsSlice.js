import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";


export const orderDetails = createAsyncThunk(
    'cart/orderDetails',
    async (order,{getState,rejectWithValue})=> {
        try {
            const {auth : {userInfo}} = getState();
            const {data} = await api.get(`/api/orders/${order}` ,{
                headers : {
                    authorization : `Bearer ${userInfo.token}`
                }
        
            });
            return data;
        } catch (error) {
            const err = error.response && error.response.data.message? error.response.data.message :error.message;
    return        rejectWithValue(err);
        }
    }
)

const orderDetailsSlice = createSlice({
    name : 'orders',
    initialState : {
        order : {},
        loading : false,
        error : null,
        success :false,
    },
    reducers : {
      
    },
    extraReducers : (builder)=> {
        builder
        .addCase(orderDetails.pending,(state)=>{
            state.loading = true;
            state.error = false;
            state.order = {};
        })
        .addCase(orderDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
           
        })
        .addCase(orderDetails.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default orderDetailsSlice.reducer;