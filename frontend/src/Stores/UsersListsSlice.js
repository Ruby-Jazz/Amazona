import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const getUsersLists = createAsyncThunk(
  'admin/getUsersLists',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Accessing token from the auth slice
      const { auth: { userInfo } } = getState();
      
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.get('/api/users/userslists', config);
      return data;
    } catch (error) {
      // Improved error extraction
      const message = error.response?.data?.message || error.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);



const usersListsSlice = createSlice({
  name: 'usersLists',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add a 'clearUsers' action here if needed
    clearUsersState: (state) => {
      state.users = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersLists.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.users = []; // Optional: remove if you want to keep old data visible during reload
      })
      .addCase(getUsersLists.fulfilled, (builderState, action) => {
        builderState.loading = false;
        builderState.users = action.payload;
      })
      .addCase(getUsersLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUsersState } = usersListsSlice.actions;
export default usersListsSlice.reducer;