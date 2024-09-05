import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";

const initialState = {
    userInfo : {},
    error : null,
    success : false
}

export const loginAsyncSlice = createAsyncThunk("user/loginUserAPI",async(data)=>{
    const response = await loginUserAPI(data);
    return response.data;
})

const authSlice = createSlice({
    name : "user",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(loginAsyncSlice.pending,(state,action)=>{
            state.userInfo = {};
            state.error = null;
            state.success = false;
        })
        .addCase(loginAsyncSlice.fulfilled,(state,action)=>{
            state.userInfo = action.payload.data;
            state.error = false;
            state.success = true;
        })
    }
})

export const isAuthenticated = (state) => state.auth.userInfo;

export default authSlice.reducer;