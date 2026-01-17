import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const getOrderHistory = createAsyncThunk(
  'order/getOrderHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();

      const { data } = await api.get('/api/orders/mine', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(err);
    }
  }
);

const orderHistorySlice = createSlice({
    name : 'orders history',
    initialState : {
        orders : [],
        loading : false,
        error : null,
    
    },
    reducers : {},
    extraReducers : (builder)=> {
        builder
        .addCase(getOrderHistory.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.orders = [];
            
        })
        .addCase(getOrderHistory.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
           
        })
        .addCase(getOrderHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.orders =[];
        })
    }
})

export default orderHistorySlice.reducer;