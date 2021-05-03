import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import Contact from './components/Contact';
import Blog_Slide_bar from './components/Blog_Slide_bar';
import "./App.css"
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Products from './components/Products';
import Product_details from './components/Product_details';

import DashboardAdmin from './components/Admin/DashboardAdmin';
import LoginAdmin from './components/Admin/Auth-admin/LoginAdmin';
import ProductAdmin from './components/Admin/ProductAdmin';
import OrderAdmin from './components/Admin/OrderAdmin';
function App() {
  return (
        <div > 
          <Router>
              <Switch> 
                  <Route exact path="/" component={Home}/>
                  <Route  path="/cart" component={Cart}/>
                  <Route  path="/checkout" component={CheckOut}/>
                  <Route  path="/contact" component={Contact}/>
                  <Route  path="/blog" component={Blog_Slide_bar}/>
                  <Route  path="/login" component={Login}/>
                  <Route  path="/register" component={Register}/>
                  <Route  path="/product" component={Products}/>
                  <Route  path="/product-details" component={Product_details}/>
                  <Route  path="/login-admin" component={LoginAdmin}/>
                  <Route  path="/dashboard-admin" component={DashboardAdmin}/>
                  <Route exact path="/Product-admin" component={ProductAdmin}/>
                  <Route  path="/order-admin" component={OrderAdmin}/>
              </Switch>
          </Router>
        </div>
    
  );
}

export default App;
