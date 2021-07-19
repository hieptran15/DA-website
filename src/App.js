import React from 'react'
import { BrowserRouter ,Route, Switch, useLocation } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import CheckOut from './components/Checkout/CheckOut';
import Contact from './components/Contact/Contact';
import Blog_Slide_bar from './components/Blog-slide-bar/Blog_Slide_bar';
import "./App.css"
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import Products from './components/Products/Products';
import Product_details from './components/Product-details/Product_details';
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import { useState } from 'react';
import { useEffect } from 'react';
import HistoryOrderUser from './components/HistoryOrderUser/HistoryOrderUser';
import { useSelector } from 'react-redux';
function App() {
  // const query = new URLSearchParams(useLocation().search);
  // const path = query.get("/");
  // const [scrollClass, setScrollClass] = useState('');
  const loadReducer = useSelector(state => state.load)
  const { loadParma} = loadReducer;
  const [keyUrl, setKeyUrl] = useState('')
  useEffect(() => {
    // window.addEventListener('scroll', () => {
    //   let activeClass = '';
    //   if (window.scrollY > 500) {
    //     activeClass = 'top';
    //   }
    //   setScrollClass(activeClass);
    //   console.log(scrollClass);
    console.log(loadParma);
    setKeyUrl(window.location.pathname);
    },[loadParma]);
  // });
  return (
    <div>
      <BrowserRouter>
        {keyUrl !== "/home-admin" && (
           <Header/>
        )}
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
          <Route path="/history-order-user" component={HistoryOrderUser} />
        </Switch>
        {keyUrl !== "/home-admin" && (
           <Footer/>
        )}
      </BrowserRouter>
    </div>

  );
}

export default App;
