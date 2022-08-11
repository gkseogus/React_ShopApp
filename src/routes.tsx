import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Googlebutton from './components/GoogleLogin';
import AuthController from './components/AuthControll';

const AllRoutes: React.SFC = () => (
  <div>
    <AuthController />
      <Routes>
        <Route
          path="/" 
          element= {        
          <Navbar>
            <HomePage />
          </Navbar>
          }
        />
      <Route
        path="/cart"
        element = {
          <Navbar>
            <Cart />
          </Navbar>
        }
      />
      <Route 
        path="/GoogleLogin"
        element = {
          <Googlebutton />
        }
      />
    </Routes>
  </div>
);

export default AllRoutes;
