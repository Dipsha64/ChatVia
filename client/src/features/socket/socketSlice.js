import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket : null
}

const socketSlice = createSlice({
    initialState,
    name : "socket",
    reducers : {
        setSocket : (state,action) => {
            state.socket = action.payload;
        }
    }
})

export const {setSocket} = socketSlice.actions;

export const isSocketConnection = (state) => state.socket.socket;

export default socketSlice.reducer;