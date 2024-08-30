import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatDashboard from './pages/Chat/ChatDashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='login' element={<Login/>}></Route>
      <Route path='signup' element={<Signup/>}></Route>
      <Route path='chat' element={<ChatDashboard/>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
