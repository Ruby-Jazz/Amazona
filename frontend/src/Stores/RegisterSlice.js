import { createAsyncThunk} from "@reduxjs/toolkit";
import Cookie from 'js-cookie'
import  axios from "axios";

export  const register= createAsyncThunk(
    'auth/register',
async ({name,email,password},{rejectWithValue}) => {

    try {
        const {data} = await axios.post('/api/users/register', {name,email,password})
    Cookie.set('userInfo',JSON.stringify(data),{expires: 30})
    return data;
    } catch (error) {
        const err = error.response && error.response.data.message || error.message;
    return rejectWithValue(err)
}}
)
