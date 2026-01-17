import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk(
  'products/createOrUpdate',
  async (product, { rejectWithValue, getState }) => {
    try {
      const { auth: { userInfo } } = getState();

      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        if (product[key] !== null && product[key] !== '') {
          formData.append(key, product[key]);
        }
      });

      let response;

      if (product._id) {
        // 🔁 UPDATE
        response = await axios.put(
          `/api/products/${product._id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
      } else {
        // ➕ CREATE
        response = await axios.post(
          '/api/products',
          formData,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
      }

      return response.data.newProduct;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
