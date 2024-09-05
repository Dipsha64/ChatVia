import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatDashboard from './pages/Chat/ChatDashboard';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Protected from "./store/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='login' element={<Login/>}></Route>
      <Route path='signup' element={<Signup/>}></Route>
      <Route path='chat' element={<Protected><ChatDashboard/></Protected>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}>
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
