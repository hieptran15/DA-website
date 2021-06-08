import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login_user, reload_cart } from '../../actions/actions'
import { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.css'
function Header() {
  const [cart, setCart] = useState(null)
  const [checkActive, setCheckActive] = useState('')
  const LoginState = useSelector(state => state.login)
  const { user, loading, error, token, carts, role } = LoginState;
  const roleName = JSON.parse(localStorage.getItem('role'));
  const tokens = JSON.parse(localStorage.getItem('aulogin'))
  const userName = JSON.parse(localStorage.getItem('userName'))
  const dispatch = useDispatch();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cartItems")))
    console.log(role);
    console.log(roleName);
  }, [carts])

  const logoutUser = () => {
    if (tokens || token) {
      localStorage.setItem('aulogin', '')
      localStorage.clear()
      dispatch(login_user())
    }
  }

  const testActive = (item) => {
    setCheckActive(item)
    console.log(checkActive);
  }
  const deleteCartItem = (res) => {
    const cartItem = cart.slice();
    // setCartItems(cartItem.filter(x => x._id !== res._id))
    localStorage.setItem("cartItems", JSON.stringify(cartItem.filter(x => x._id !== res._id)))
    dispatch(reload_cart(res))
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  }
  const viewCart = () => {
    return (
      <div className="shopping-item">
        <div className="dropdown-cart-header">
          <span>{cart !== null ? cart.length : 0}  Items</span>
          <Link to="/cart">View Cart</Link>
        </div>
        <ul className="shopping-list">
          {
            cart !== null ? cart.map((value, key) => {
              return (
                <li key={key}>
                  <a onClick={() => deleteCartItem(value)} className="remove" title="Remove this item"><i className="fa fa-remove" /></a>
                  <a className="cart-img" href="#"><img src={value.img_url} alt="#" /></a>
                  <h4><a href="#">{value.name}</a></h4>
                  <p className="quantity">{value.count} - <span className="amount">{formatCurrency(value.price)}</span></p>
                </li>
              )
            }) : <div>giỏ hàng trống</div>
          }
        </ul>
        <div className="bottom">
          <div className="total">
            <span>Total</span>
            <span className="total-amount">{formatCurrency(cart !== null ? cart.reduce((a, c) => a + c.price * c.count, 0) : 0)}</span>
          </div>
          <Link to="/checkout" className="btn animate">Checkout</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <header className="header shop">
        {/* Topbar */}
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-12">
                {/* Top Left */}
                <div className="top-left">
                  <ul className="list-main">
                    <li><i className="ti-headphone-alt" /> +060 (800) 801-582</li>
                    <li><i className="ti-email" /> support@shophub.com</li>
                  </ul>
                </div>
                {/*/ End Top Left */}
              </div>
              <div className="col-lg-8 col-md-12 col-12">
                {/* Top Right */}
                <div className="right-content">
                  <ul className="list-main">
                    <li><i className="ti-location-pin" /> Store location</li>
                    <li><i className="ti-alarm-clock" /> <a href="#">Daily deal</a></li>
                    <li className="setting-admin"><i className="ti-user" />
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {user || userName ? userName || user : 'Account'}
                      </a>
                      <ul className="setting-admin-item">
                        <div>
                          {roleName === 'admin' || role === 'admin' ?
                            <li><i className="ti-power-off" /><Link to="/home-admin">Admin</Link></li> : ''}
                          {roleName === 'user' || role === 'user' ?
                            <li><i className="ti-power-off" /><Link to="/home-admin">User</Link></li> : ''}
                          {tokens || token ? <li><i className="ti-power-off" /><a onClick={() => logoutUser()} href="#">Logout</a></li> :
                            <li><i className="ti-power-off" /><Link to="/login">Login</Link></li>
                          }
                        </div>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* End Top Right */}
              </div>
            </div>
          </div>
        </div>
        {/* End Topbar */}
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-12">
                {/* Logo */}
                <div className="logo">
                  <a href="index.html"><img src="images\logo.png" alt="logo" /></a>
                </div>
                {/*/ End Logo */}
                {/* Search Form */}
                <div className="search-top">
                  <div className="top-search"><a href="#0"><i className="ti-search" /></a></div>
                  {/* Search Form */}
                  <div className="search-top">
                    <form className="search-form">
                      <input type="text" placeholder="Search here..." name="search" />
                      <button value="search" type="submit"><i className="ti-search" /></button>
                    </form>
                  </div>
                  {/*/ End Search Form */}
                </div>
                {/*/ End Search Form */}
                <div className="mobile-nav" />
              </div>
              <div className="col-lg-8 col-md-7 col-12">
                <div className="search-bar-top">
                  <div className="search-bar">
                    <form>
                      <input name="search" placeholder="Search Products Here....." type="search" />
                      <button className="btnn"><i className="ti-search" /></button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <div className="right-bar">
                  {/* Search Form */}
                  <div className="sinlge-bar">
                    <a href="#" className="single-icon"><i className="fa fa-heart-o" aria-hidden="true" /></a>
                  </div>
                  <div className="sinlge-bar">
                    <a href="#" className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true" /></a>
                  </div>
                  <div className="sinlge-bar shopping">
                    <Link to="/cart" className="single-icon"><i className="ti-bag" /> <span className="total-count">{cart !== null ? cart.length : 0}</span></Link>
                    {/* Shopping Item */}
                    {viewCart()}
                    {/*/ End Shopping Item */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Inner */}
        <div className="header-inner">
          <div className="container">
            <div className="cat-nav-head">
              <div className="row">
                <div className="col-lg-3">

                </div>
                <div className="col-lg-9 col-12">
                  <div className="menu-area">
                    {/* Main Menu */}
                    <nav className="navbar navbar-expand-lg">
                      <div className="navbar-collapse">
                        <div className="nav-inner">
                          <ul className="nav main-menu menu navbar-nav">
                            <li><NavLink exact to="/" activeClassName="active-menu" >Home</NavLink></li>
                            <li><NavLink to="/product" activeClassName="active-menu" >Product</NavLink></li>
                            <li><a href="#">Service</a></li>
                            <li><a href="#">Shop<i className={`ti-angle-down`} /><span className="new">New</span></a>
                              <ul className="dropdown">
                                <li><NavLink activeClassName="active-menu" to="/cart" onClick={() => testActive('cart')} >Cart</NavLink></li>
                                <li><NavLink activeClassName="active-menu" to="/checkout" onClick={() => testActive('cart')}>Checkout</NavLink></li>
                              </ul>
                            </li>
                            <li><a href="#">Pages</a></li>
                            <li><a href="#">Blog<i className="ti-angle-down" /></a>
                              <ul className="dropdown">
                                <li><Link to="/blog">Blog Single Sidebar</Link></li>
                              </ul>
                            </li>
                            <li><NavLink activeClassName="active-menu" to="/contact">Contact Us</NavLink></li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                    {/*/ End Main Menu */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ End Header Inner */}
      </header>
      {/*/ End Header */}

    </>
  )
}

export default Header