import {  signInUser } from "./SignInSlice";
import { register } from "./RegisterSlice";
import Cookie from 'js-cookie'
import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfile } from "./UserProfileSlice";

const authSlice = createSlice({
  name : 'auth',
      initialState :{
          userInfo : Cookie.get('userInfo')? JSON.parse(Cookie.get('userInfo')): null,
          loading : false,
          error : null,
          profileUpdateSuccess : false,
      },
  reducers: {
    logout: (state) => {
                state.userInfo = null;
                Cookie.remove('userInfo');
            },
            reset_profile_success : state =>{state.profileUpdateSuccess = false}
      
          
  },
  extraReducers: (builder) => {
    builder
    .addCase(signInUser.pending,(state)=>{
        state.loading = true;
        state.error = null
    })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(signInUser.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
      })
    .addCase(register.pending,(state)=>{
        state.loading = true;
        state.error = false
    })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
      })
        .addCase(updateUserProfile.pending,(state)=>{
            state.loading= true;
            state.error = null;
            state.profileUpdateSuccess = false;
        })
        .addCase(updateUserProfile.fulfilled,(state,action)=>{
            state.loading= false;
            state.profileUpdateSuccess = true;
          state.userInfo = action.payload;
             Cookie.set('userInfo', JSON.stringify(action.payload), { expires: 30 });
        })
        .addCase(updateUserProfile.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.payload;
        })
        
     
      
  },
})
export const { logout, reset_profile_success } = authSlice.actions;
export default authSlice.reducer