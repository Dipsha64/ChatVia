import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import socketReducer from "../features/socket/socketSlice";
// import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
      auth : persistedReducer,
      socket : socketReducer
    },
});
  
export const persistor = persistStore(store)