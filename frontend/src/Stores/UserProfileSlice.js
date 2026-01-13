import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async (userId,{getState,rejectWithValue}) => {

        try {
            const {auth: {userInfo}}= getState();
            const {data} = await axios.get(`/api/users/${userId}`,{headers : {authorization : `Bearer ${userInfo.token}`}});
            return data;
        } catch (error) {
            const err = error.response && error.response.data.message? error.response.data.message : error.message;
            return rejectWithValue(err);
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async(user,{rejectWithValue,getState})=>{
        try {
              const {auth: {userInfo}}= getState();
            const {data} = await axios.put(`/api/users/profile`,user, {headers : {authorization : `Bearer ${userInfo.token}`}});
            return data;
        } catch (error) {
              const err = error.response && error.response.data.message? error.response.data.message : error.message;
            return rejectWithValue(err);
        }
    }
)

const userProfileSlice = createSlice({
    name : 'userProfile',
    initialState : {
        profileDetails : {},
        loading : false,
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getUserProfile.pending,(state)=>{
            state.loading= true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled,(state,action)=>{
            state.loading= false;
            state.profileDetails = action.payload;
        })
        .addCase(getUserProfile.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.payload;
        })
        
        .addCase(updateUserProfile.pending,(state)=>{
            state.loading= true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled,(state,action)=>{
            state.loading= false;
            state.profileDetails = action.payload;
        })
        .addCase(updateUserProfile.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.payload;
        })
        
    }
})

export default userProfileSlice.reducer;