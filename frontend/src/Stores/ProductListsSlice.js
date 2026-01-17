
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const getProductsLists = createAsyncThunk(
  'admin/getProductsLists',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Accessing token from the auth slice
      const { auth: { userInfo } } = getState();
      
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.get('/api/products/productslists', config);
      return data;
    } catch (error) {
      // Improved error extraction
      const message = error.response?.data?.message || error.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);



const productslistsSlice = createSlice({
  name: 'productsLists',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add a 'clearUsers' action here if needed
    clearProductsState: (state) => {
      state.users = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsLists.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.users = []; // Optional: remove if you want to keep old data visible during reload
      })
      .addCase(getProductsLists.fulfilled, (builderState, action) => {
        builderState.loading = false;
        builderState.products = action.payload;
      })
      .addCase(getProductsLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductsState } = productslistsSlice.actions;
export default productslistsSlice.reducer;