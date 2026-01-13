import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrdersList = createAsyncThunk(
  'admin/getOrdersList',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Accessing token from the auth slice
      const { auth: { userInfo } } = getState();
      
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/orders/orderslists', config);
      return data;
    } catch (error) {
      // Improved error extraction
      const message = error.response?.data?.message || error.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);



const orderslistsSlice = createSlice({
  name: 'ordersList',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add a 'clearUsers' action here if needed
    clearOrdersState: (state) => {
      state.orders = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.users = []; // Optional: remove if you want to keep old data visible during reload
      })
      .addCase(getOrdersList.fulfilled, (builderState, action) => {
        builderState.loading = false;
        builderState.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrdersState } = orderslistsSlice.actions;
export default orderslistsSlice.reducer;