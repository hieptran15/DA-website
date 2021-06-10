import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import CheckOut from './components/Checkout/CheckOut';
import Contact from './components/Contact/Contact';
import Blog_Slide_bar from './components/Blog-slide-bar/Blog_Slide_bar';
import "./App.css"
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Products from './components/Products/Products';
import Product_details from './components/Product-details/Product_details';
import { ScrollTop } from 'primereact/scrolltop';
import { ScrollPanel } from 'primereact/scrollpanel';
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [scrollClass, setScrollClass] = useState('');
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let activeClass = '';
      if (window.scrollY > 500) {
        activeClass = 'top';
      }
      setScrollClass(activeClass);
      console.log(scrollClass);
    })
  });
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog_Slide_bar} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/product" component={Products} />
          <Route path="/product-details" component={Product_details} />
          <Route path="/home-admin" component={HomeAdmin} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
