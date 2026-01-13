import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const payOrder = createAsyncThunk(
    'order,payOrder',
    async({order,paymentResult},{getState,rejectWithValue})=>{

        try {
            const {auth : {userInfo}}= getState();
            const {data} = await axios.put(`/api/orders/${order._id}/pay`, paymentResult,{
    headers : {
        authorization : `Bearer ${userInfo.token}`
    }})
    return data.order;
        } catch (error) {
            const err = error.response && error.response.data.message? error.response.data.message : error.message;
            return rejectWithValue(err)
        }


    }
)

const payOrderSlice = createSlice({
    name : 'payOrder',
    initialState: {
        loading : false,
        error: null,
        success : false,
    },
    reducers :{
        orderPayReset : (state)=> {
            state.success = false;
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(payOrder.pending,(state)=>{
            state.loading =true;
            state.error = null;
            state.success = false;
        })
        .addCase(payOrder.fulfilled,(state)=>{
            state.loading = false;
            state.success = true;
        })
        .addCase(payOrder.rejected,(state,action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    }
})
export const {orderPayReset} = payOrderSlice.actions;
export default payOrderSlice.reducer;