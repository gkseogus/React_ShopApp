import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import Googlebutton from "./components/GoogleLogin";

const Routes: React.SFC = () => (
  <div>
      {/* 첫 번째 route */}
      <Route
        exact
        path="/" 
        render={() => ( 
          <Navbar>
            <HomePage/>
          </Navbar>
        )}
      />
      {/* 두 번째 route */}
      <Route
        path="/cart" 
        render={() => ( 
          <Navbar>
            <Cart />
          </Navbar>
        )}
      />
      <Route 
        path="/GoogleLogin" 
        render={() => ( 
          <Googlebutton/>
        )}
      />
  </div>
);

export default Routes;
