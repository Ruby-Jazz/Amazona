import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from 'js-cookie';

export const signInUser = createAsyncThunk(
    'auth/signin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // 1. Use .post instead of .get
            // 2. Pass the data object as the second argument
            const response = await axios.post('/api/users/signin', { email, password });
            
            const data = response.data;

            // 3. Save to Cookie
            Cookie.set('userInfo', JSON.stringify(data), { expires: 30 });
            
            return data;
        } catch (error) {
            // Axios catches errors automatically, including 401 Unauthorized
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            return rejectWithValue(message);
        }
    }
);

