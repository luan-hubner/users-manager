import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './pages/Login';
import Users from './pages/Users';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>

        <Route path="/users" element={<Users />}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);