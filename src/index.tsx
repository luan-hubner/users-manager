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

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>

      <Route path="/users" element={<Users />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);