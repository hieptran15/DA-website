import React, { useEffect } from 'react'
import { Link, NavLink, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login_user, reload_cart } from '../../actions/actions'
import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { useTranslation } from 'react-i18next';
import './Header.css'
function Header() {
  const listLangKey = [
    { name: 'Việt Nam', code: 'vi' },
    { name: 'English', code: 'en' }
  ]
  const [cart, setCart] = useState([]);
  const [checkActive, setCheckActive] = useState('');
  const [langKey, setlangKey] = useState({ name: 'Việt Nam', code: 'vi' },);
  const [langSelect, setlangSelect] = useState('vi')
  const [valueSearch, setValueSearch] = useState('')
  const LoginState = useSelector(state => state.login)
  const { user, loading, error, token, carts, role } = LoginState;
  const roleName = JSON.parse(localStorage.getItem('role'));
  const tokens = JSON.parse(localStorage.getItem('aulogin'));
  const userName = JSON.parse(localStorage.getItem('userName'));
  const query = new URLSearchParams(useLocation().search);
  const keySearch = query.get("search");
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setCart(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [])
  }, [carts])

  useEffect(() => {
    i18n.changeLanguage(langSelect);
    console.log('lang');
  }, [langSelect])

  const logoutUser = () => {
    if (tokens || token) {
      localStorage.setItem('aulogin', '');
      localStorage.clear();
      dispatch(login_user());
    }
  }

  const onLangChange = (event) => {
    setlangKey(event.value);
    setlangSelect(event.value.code)
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
  const onChangeInput = (e) => {
    setValueSearch(e.target.value)
    console.log(e.target.value);
  }
  const viewCart = () => {
    return (
      <div className="shopping-item">
        <div className="dropdown-cart-header">
          <span>{cart.length !== 0 ? cart.length : 0}  {t('home.menu.items')}</span>
          <Link to="/cart">{t('home.menu.viewCart')}</Link>
        </div>
        <ul className="shopping-list">
          {
            cart.length !== 0 ? cart.map((value, key) => {
              return (
                <li key={key}>
                  <a onClick={() => deleteCartItem(value)} className="remove" title="Remove this item"><i className="fa fa-remove" /></a>
                  <a className="cart-img" href="#"><img src={value.img_url} alt="#" /></a>
                  <h4><a href="#">{value.name}</a></h4>
                  <p className="quantity">{value.count} x <span className="amount">{formatCurrency(value.price)}</span></p>
                </li>
              )
            }) : <div>{t('home.menu.emptyCart')}</div>
          }
        </ul>

        <div className="bottom">
          <div className="total">
            <span>{t('home.menu.total')}</span>
            <span className="total-amount">{formatCurrency(cart.length !== 0 ? cart.reduce((a, c) => a + c.price * c.count, 0) : 0)}</span>
          </div>
          {
            cart.length !== 0 && (
              <Link to="/checkout" className="btn animate">{t('home.menu.checkout')}</Link>
            )
          }
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
                    <li><i className="ti-headphone-alt" /> 034 2925252</li>
                    <li><i className="ti-email" />Hieptv@gmail.com</li>
                  </ul>
                </div>
                {/*/ End Top Left */}
              </div>
              <div className="col-lg-8 col-md-12 col-12">
                {/* Top Right */}
                <div className="right-content">
                  <ul className="list-main">
                    {/* <li><i className="ti-location-pin" /> Store location</li>
                    <li><i className="ti-alarm-clock" /> <a href="#">Daily deal</a></li> */}
                    <li><a href="#">{t('language.1')}:</a><Dropdown value={langKey} options={listLangKey} optionLabel="name" placeholder="language" onChange={onLangChange} /></li>
                    <li className="setting-admin"><i className="ti-user" />
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {user || userName ? userName || user : 'Account'}
                      </a>
                      <ul className="setting-admin-item">
                        <div>
                          {roleName === 'admin' || role === 'admin' ?
                            <li><i className="ti-settings" /><Link to="/home-admin">{t('home.menu.manage')}</Link></li> : ''}
                          {roleName === 'ROLE_USER' || role === 'ROLE_USER' ?
                            <li><i className="ti-id-badge" /><Link to="#">{t('home.menu.profile')}</Link></li> : ''}
                          {roleName === 'ROLE_USER' || role === 'ROLE_USER' ?
                            <li><i className="ti-harddrives" /><Link to="/history-order-user">{t('home.menu.orderHistory')}</Link></li> : ''}
                          {tokens || token ? <li><i className="ti-unlock" /><a onClick={() => logoutUser()} href="#">{t('home.menu.logout')}</a></li> :
                            <li><i className="ti-lock" /><Link to="/login">{t('home.menu.login')}</Link></li>
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
                      <input onChange={(e) => onChangeInput(e)} name="search" placeholder={t('search')} type="search" />
                      <Link to={`/product?search=${valueSearch}`}><button className="btnn"><i className="ti-search" /></button></Link>
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
                    <Link to="/cart" className="single-icon"><i className="ti-bag" /> <span className="total-count">{cart.length !== 0 ? cart.length : 0}</span></Link>
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
                            <li><NavLink exact to="/" activeClassName="active-menu" >{t('home.menu.home')}</NavLink></li>
                            <li><NavLink to="/product" activeClassName="active-menu" >{t('home.menu.product')}</NavLink></li>
                            <li><a href="#">{t('home.menu.service')}</a></li>
                            <li><a href="#">Shop<i className={`ti-angle-down`} /></a>
                              <ul className="dropdown">
                                <li><NavLink activeClassName="active-menu" to="/cart" onClick={() => testActive('cart')} >{t('home.menu.cart')}</NavLink></li>
                                {cart.length !== 0 && (
                                  <li><NavLink activeClassName="active-menu" to="/checkout" onClick={() => testActive('cart')}>{t('home.menu.checkout')}</NavLink></li>
                                )}
                              </ul>
                            </li>
                            {/* <li><NavLink activeClassName="active-menu" to="/blog">{t('home.menu.introduce')}</NavLink></li> */}
                            {/* <li><a href="#">Blog<i className="ti-angle-down" /></a>
                              <ul className="dropdown">
                                
                              </ul>
                            </li> */}
                            <li><NavLink activeClassName="active-menu" to="/blog">{t('home.menu.news')}</NavLink></li>
                            <li><NavLink activeClassName="active-menu" to="/contact">{t('home.menu.contactus')}</NavLink></li>
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
