import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
      auth : persistedReducer
    },
});
  
export const persistor = persistStore(store)