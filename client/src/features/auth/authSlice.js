import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "./authAPI";

const initialState = {
    userInfo : {},
    error : null,
    success : false,
    token : "",
    onlineUsers:null,
}

export const loginAsyncSlice = createAsyncThunk("user/loginUserAPI",async(data)=>{
    const response = await loginUserAPI(data);
    return response.data;
})

const authSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setOnlineUsers : (state,action) => {
            state.onlineUsers = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(loginAsyncSlice.pending,(state,action)=>{
            state.userInfo = {};
            state.error = null;
            state.success = false;
            state.token = "";
        })
        .addCase(loginAsyncSlice.fulfilled,(state,action)=>{
            console.log("action.payload.." ,action.payload);
            state.userInfo = action.payload.data;
            state.error = false;
            state.success = true;
            state.token = action.payload.token;
        })
    }
})

export const { setOnlineUsers } = authSlice.actions;

export const onlineUserList = (state) => state.auth.onlineUsers;
export const isAuthenticated = (state) => state.auth.userInfo;

export default authSlice.reducer;