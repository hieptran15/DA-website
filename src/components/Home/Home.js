import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { load_param, reload_cart } from '../../actions/actions';
import { Link, NavLink } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

function Home() {
  const sizes = [
    { name: 'S', code: 'S' },
    { name: 'L', code: 'L' },
    { name: 'XL', code: 'XL' },
  ];
  const colors = [
    { name: 'Xanh' },
    { name: 'Đỏ' },
    { name: 'Cam' },
    { name: 'Vàng' },
  ];
  const [category, setCategory] = useState([]);
  const [keyCategory, setKeyCategory] = useState('');
  const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [modalView, setModalView] = useState(false);
  const [viewAddCart, setViewAddCart] = useState(null);
  const [number, setNumber] = useState(1);
  const [modalViewAddCart, setModalViewAddCart] = useState(false);
  const loadReducer = useSelector(state => state.load)
  const { loadParma } = loadReducer;
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("http://localhost:8080/api/category/get-all-category").then((result) => {
      setCategory(result.data);
      if (result.data.length !== 0) {
        getAllProducts(result.data[0].category);
      } else {
        getAllProducts('');
      }
    });
    window.scrollTo(0, 0)
    dispatch(load_param(''))
  }, [])

  const { t, i18n } = useTranslation();

  const formatCurrency = (value) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  }

  const onSizeChange = (e) => {
    setSelectedSize(e.value);
    setSize(e.value.name)
  }
  const onColorChange = (e) => {
    setSelectedColor(e.value)
    setColor(e.value.name)
  }

  const checkActive = (value) => {
    setKeyCategory(value);
    if (value !== '') {
      getAllProducts(value);
    } else {
      setProducts([])
    }
  }
  const quickView = ((item) => {
    setView(item);
    setNumber(1);
    setModalView(true);
  })
  const reduceNumber = () => {
    setNumber(number - 1)
  }
  const addNumber = () => {
    setNumber(number + 1)
  }
  const closeModal = () => {
    setModalView(false)
    setNumber(1)
  }
  const closeModalViewCart = () => {
    setModalViewAddCart(false)
  }

  const addToCart = (res) => {
    setModalViewAddCart(true)
    const cart = cartItems.slice();
    let alreadyInCart = false;
    cart.forEach((item) => {
      if (item._id === res._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cart.push({ ...res, count: number, size: size !== '' ? size : '', color: color !== '' ? color : '' });
    }
    setCartItems(cart);
    setViewAddCart(res);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    console.log(cart);
    dispatch(reload_cart(cart));
    setModalView(false)
  }

  const onlyAddCart = (res) => {
    setModalViewAddCart(true)
    setViewAddCart(res);
    const cart = cartItems.slice();
    let alreadyInCart = false;
    cart.forEach((item) => {
      if (item._id === res._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cart.push({ ...res, count: number });
    }
    setCartItems(cart)
    localStorage.setItem("cartItems", JSON.stringify(cart))
    console.log(cart);
    dispatch(reload_cart(cart));
  }

  const getAllProducts = (value) => {
    setKeyCategory(value);
    if (value !== '') {
      Axios.get(`http://localhost:8080/api/product/get-product?category=${value}`).then((result) => {
        setProducts(result.data.datas);
      })
    } else {
      setProducts([])
    }
  }

  const divStyle = {
    backgroundImage: 'url("/images/slider/slidecopy02.jpg")',
  };
  const divStyle2 = {
    backgroundImage: 'url("/images/slider-image2.jpg")',
  };
  return (
    <>
      {/* <Header /> */}
      {/* Slider Area */}
      <section className="hero-slider">
        {/* Single Slider */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div style={divStyle} className="single-slider">
                <div className="container">
                  <div className="row no-gutters">
                    <div className="col-lg-9 offset-lg-3 col-12">
                      <div className="text-inner">
                        <div className="row">
                          <div className="col-lg-7 col-12">
                            <div className="hero-text">
                              <h1><span>{t('home.carousel.upto')}</span>{t('home.carousel.shirtForMan')}</h1>
                              <p>{t('home.carousel.description1')} <br /> {t('home.carousel.description2')}</p>
                              <div className="button">
                                <a href="#" className="btn">{t('home.carousel.shopNow')}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div style={divStyle2} className="single-slider">
                <div className="container">
                  <div className="row no-gutters">
                    <div className="col-lg-9 offset-lg-3 col-12">
                      <div className="text-inner">
                        <div className="row">
                          <div className="col-lg-7 col-12">
                            <div className="hero-text">
                              <h1><span>{t('home.carousel.upto')}</span>{t('home.carousel.shirtForMan')}</h1>
                              <p>{t('home.carousel.description1')} <br /> {t('home.carousel.description2')}</p>
                              <div className="button">
                                <a href="#" className="btn">{t('home.carousel.shopNow')}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div style={divStyle} className="single-slider">
                <div className="container">
                  <div className="row no-gutters">
                    <div className="col-lg-9 offset-lg-3 col-12">
                      <div className="text-inner">
                        <div className="row">
                          <div className="col-lg-7 col-12">
                            <div className="hero-text">
                              <h1><span>{t('home.carousel.upto')}</span>{t('home.carousel.shirtForMan')}</h1>
                              <p>{t('home.carousel.description1')} <br /> {t('home.carousel.description2')}</p>
                              <div className="button">
                                <a href="#" className="btn">{t('home.carousel.shopNow')}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>


        {/*/ End Single Slider */}
      </section>
      {/*/ End Slider Area */}
      {/* Start Small Banner  */}
      <section className="small-banner section">
        <div className="container-fluid">
          <div className="row">
            {/* Single Banner  */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-banner">
                <img src="images\mini-banner1.jpg" alt="#" />
                <div className="content">
                  <p>{t('home.banner.manCollection')}</p>
                  <h3>{t('home.banner.summerTravel')}<br /> {t('home.banner.summerTravel2')}</h3>
                  <a href="#">{t('home.banner.discoverNow')}</a>
                </div>
              </div>
            </div>
            {/* /End Single Banner  */}
            {/* Single Banner  */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-banner">
                <img src="images\mini-banner2.jpg" alt="#" />
                <div className="content">
                  <p>{t('home.banner.bagCollection')}</p>
                  <h3>{t('home.banner.awesomeBag')}</h3>
                  <a href="#">{t('home.carousel.shopNow')}</a>
                </div>
              </div>
            </div>
            {/* /End Single Banner  */}
            {/* Single Banner  */}
            <div className="col-lg-4 col-12">
              <div className="single-banner tab-height">
                <img src="images\mini-banner3.jpg" alt="#" />
                <div className="content">
                  <p>{t('home.banner.flashSale')}</p>
                  <h3>{t('home.banner.midSeason')} <br /> {t('home.banner.midSeason2')}</h3>
                  <a href="#">{t('home.banner.discoverNow')}</a>
                </div>
              </div>
            </div>
            {/* /End Single Banner  */}
          </div>
        </div>
      </section>
      {/* End Small Banner */}
      {/* Start Product Area */}
      <div className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t('home.product.trendingItem')}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="product-info">
                <div className="nav-main">
                  {/* Tab Nav */}
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {category ? [...category].map((item, key) => {
                      return (
                        <li key={item._id} className="nav-item"><a className={"" + '' + (keyCategory !== '' ? keyCategory === item.category ? 'active' : '' : '')} onClick={() => checkActive(item.category)} data-toggle="tab" href="#man" role="tab">{item.category}</a></li>
                      )
                    }) : ''}
                  </ul>
                  {/*/ End Tab Nav */}
                </div>
                <div className="tab-content" id="myTabContent">
                  {/* Start Single Tab */}
                  <div className="tab-pane fade show active" id="man" role="tabpanel">
                    <div className="tab-single">
                      <div className="row">
                        {
                          products.length !== 0 ? products.map((value, key) => {
                            return (
                              <div key={value._id} className="col-xl-3 col-lg-4 col-md-4 col-12">
                                <Link>
                                  <div className="single-product" >
                                    <div className="product-img">
                                      <Link to={`/product-details?userId=${value._id}`}>
                                        <img className="default-img" src={value.img_url} alt="#" />
                                        {/* <img className="hover-img" src="images\products\p2.jpg" alt="#" /> */}
                                      </Link>
                                      <div className="button-head">
                                        <div className="product-action">
                                          <a data-toggle="modal" onClick={() => quickView(value)}><i className=" ti-eye" /><span>Quick Shop</span></a>
                                          <a title="Wishlist" href="#"><i className=" ti-heart " /><span>Add to Wishlist</span></a>
                                          <a title="Compare" href="#"><i className="ti-bar-chart-alt" /><span>Add to Compare</span></a>
                                        </div>
                                        <div className="product-action-2">
                                          <a title={t('products.addToCart')} onClick={() => onlyAddCart(value)}>{t('products.addToCart')}</a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="product-content">
                                      <h3><Link to={`/product-details?userId=${value._id}`}>{value.name}</Link></h3>
                                      <div className="product-price">
                                        <span>{formatCurrency(value.price)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            )
                          }) : <h3>{t('home.product.noProducts')}</h3>
                        }
                      </div>
                    </div>
                    {/*/ End Single Tab */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Product Area */}
      {/* Start Shop Home List  */}
      <section className="shop-home-list section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="shop-section-title">
                    <h1>{t('home.homeList.onSale')}</h1>
                  </div>
                </div>
              </div>
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list1.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h4 className="title"><a href="#">Đồ nữ</a></h4>
                      <p className="price with-discount">200.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list2.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h4 className="title"><a href="#">Đồ nữ</a></h4>
                      <p className="price with-discount">200.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list3.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h4 className="title"><a href="#">Đồ nữ</a></h4>
                      <p className="price with-discount">200.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="shop-section-title">
                    <h1>{t('home.homeList.bestSeller')}</h1>
                  </div>
                </div>
              </div>
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list4.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h4 className="title"><a href="#">Đồ nữ</a></h4>
                      <p className="price with-discount">200.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list5.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h5 className="title"><a href="#">Áo nam</a></h5>
                      <p className="price with-discount">300.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list6.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h4 className="title"><a href="#">Đồ nữ</a></h4>
                      <p className="price with-discount">200.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="shop-section-title">
                    <h1>{t('home.homeList.topViewed')}</h1>
                  </div>
                </div>
              </div>
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list7.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h4 className="title"><a href="#">Đồ nữ</a></h4>
                      <p className="price with-discount">200.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list8.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h5 className="title"><a href="#">Áo nam</a></h5>
                      <p className="price with-discount">300.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
              {/* Start Single List  */}
              <div className="single-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="list-image overlay">
                      <img src="images\list\shop-list9.jpg" alt="#" />
                      <a href="#" className="buy"><i className="fa fa-shopping-bag" /></a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 no-padding">
                    <div className="content">
                      <h5 className="title"><a href="#">Áo nam</a></h5>
                      <p className="price with-discount">300.000 đ</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single List  */}
            </div>
          </div>
        </div>
      </section>
      {/* End Shop Home List  */}
      {/* Start Shop Blog  */}
      <section className="shop-blog section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t('home.shopBlog.fromBlog')}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              {/* Start Single Blog  */}
              <div className="shop-single-blog">
                <img src="images\blog1.jpg" alt="#" />
                <div className="content">
                  <p className="date">22 July , 2020. Monday</p>
                  <a href="#" className="title">Sed adipiscing ornare.</a>
                  <a href="#" className="more-btn">Continue Reading</a>
                </div>
              </div>
              {/* End Single Blog  */}
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              {/* Start Single Blog  */}
              <div className="shop-single-blog">
                <img src="images\blog2.jpg" alt="#" />
                <div className="content">
                  <p className="date">22 July, 2020. Monday</p>
                  <a href="#" className="title">Man’s Fashion Winter Sale</a>
                  <a href="#" className="more-btn">Continue Reading</a>
                </div>
              </div>
              {/* End Single Blog  */}
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              {/* Start Single Blog  */}
              <div className="shop-single-blog">
                <img src="images\blog3.jpg" alt="#" />
                <div className="content">
                  <p className="date">22 July, 2020. Monday</p>
                  <a href="#" className="title">Women Fashion Festive</a>
                  <a href="#" className="more-btn">Continue Reading</a>
                </div>
              </div>
              {/* End Single Blog  */}
            </div>
          </div>
        </div>
      </section>
      {/* End Shop Blog  */}
      {/* Start Shop Services Area */}
      <section className="shop-services section home">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-rocket" />
                <h4>{t('home.shopServices.freeShip')}</h4>
                <p>{t('home.shopServices.ordersOver')} 500.000 đ</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-reload" />
                <h4>{t('home.shopServices.freeReturn')}</h4>
                <p>{t('home.shopServices.dayReturns')}</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-lock" />
                <h4>{t('home.shopServices.sucurePayment')}</h4>
                <p>{t('home.shopServices.securePayment')}</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-tag" />
                <h4>{t('home.shopServices.bestPeice')}</h4>
                <p>{t('home.shopServices.guaranteedPrice')}</p>
              </div>
              {/* End Single Service */}
            </div>
          </div>
        </div>
      </section>
      {/* End Shop Services Area */}
      {/* Start Shop Newsletter  */}
      <section className="shop-newsletter section">
        <div className="container">
          <div className="inner-top">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-12">
                {/* Start Newsletter Inner */}
                <div className="inner">
                  <h4>{t('home.shopServices.newsletter')}</h4>
                  <p> {t('home.shopServices.description')} <span>10%</span> {t('home.shopServices.description2')}</p>
                  <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                    <input name="EMAIL" placeholder="Email" required type="email" />
                    <button className="btn">{t('home.shopServices.subscribe')}</button>
                  </form>
                </div>
                {/* End Newsletter Inner */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Shop Newsletter */}
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span className="ti-close" aria-hidden="true" /></button>
            </div>
            <div className="modal-body">
              <div className="row no-gutters">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  {/* Product Slider */}
                  <div className="product-gallery">
                    <div className="quickview-slider-active">
                      <div className="single-slider">
                        <img src="images\modal1.png" alt="#" />
                      </div>
                      <div className="single-slider">
                        <img src="images\modal2.png" alt="#" />
                      </div>
                      <div className="single-slider">
                        <img src="images\modal3.png" alt="#" />
                      </div>
                      <div className="single-slider">
                        <img src="images\modal4.png" alt="#" />
                      </div>
                    </div>
                  </div>
                  {/* End Product slider */}
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="quickview-content">
                    <h2>Flared Shift Dress</h2>
                    <div className="quickview-ratting-review">
                      <div className="quickview-ratting-wrap">
                        <div className="quickview-ratting">
                          <i className="yellow fa fa-star" />
                          <i className="yellow fa fa-star" />
                          <i className="yellow fa fa-star" />
                          <i className="yellow fa fa-star" />
                          <i className="fa fa-star" />
                        </div>
                        <a href="#"> (1 customer review)</a>
                      </div>
                      <div className="quickview-stock">
                        <span><i className="fa fa-check-circle-o" /> in stock</span>
                      </div>
                    </div>
                    <h3>$29.00</h3>
                    <div className="quickview-peragraph">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iste laborum ad impedit pariatur esse optio tempora sint ullam autem deleniti nam in quos qui nemo ipsum numquam.</p>
                    </div>
                    <div className="size">
                      <div className="row">
                        <div className="col-lg-6 col-12">
                          <h5 className="title">Size</h5>
                          <select>
                            <option selected="selected">s</option>
                            <option>m</option>
                            <option>l</option>
                            <option>xl</option>
                          </select>
                        </div>
                        <div className="col-lg-6 col-12">
                          <h5 className="title">Color</h5>
                          <select>
                            <option selected="selected">orange</option>
                            <option>purple</option>
                            <option>black</option>
                            <option>pink</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="quantity">
                      {/* Input Order */}
                      <div className="input-group">
                        <div className="button minus">
                          <button type="button" className="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                            <i className="ti-minus" />
                          </button>
                        </div>
                        <input type="text" name="quant[1]" className="input-number" data-min={1} data-max={1000} defaultValue={1} />
                        <div className="button plus">
                          <button type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                            <i className="ti-plus" />
                          </button>
                        </div>
                      </div>
                      {/*/ End Input Order */}
                    </div>
                    <div className="add-to-cart">
                      <a href="#" className="btn">Add to cart</a>
                      <a href="#" className="btn min"><i className="ti-heart" /></a>
                      <a href="#" className="btn min"><i className="fa fa-compress" /></a>
                    </div>
                    <div className="default-social">
                      <h4 className="share-now">Share:</h4>
                      <ul>
                        <li><a className="facebook" href="#"><i className="fa fa-facebook" /></a></li>
                        <li><a className="twitter" href="#"><i className="fa fa-twitter" /></a></li>
                        <li><a className="youtube" href="#"><i className="fa fa-pinterest-p" /></a></li>
                        <li><a className="dribbble" href="#"><i className="fa fa-google-plus" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {viewAddCart && (
        <Modal footer={false} centered visible={modalViewAddCart} width={500} onCancel={() => closeModalViewCart()}>
          <div style={{ marginBottom: "15px", color: "#84b767", fontSize: "18px" }}><i style={{ marginRight: '10px' }} class="fa fa-check-circle"></i>Thêm vào giỏ hàng thành công!</div>
          <div style={{ marginBottom: "10px" }} className="d-flex">
            <div style={{ marginRight: "25px" }}>
              <img src={viewAddCart.img_url} style={{ width: "200px", height: "220px", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>{viewAddCart.name}</p>
              <i>số lượng: {number}</i>
              <br />
              <b>{formatCurrency(viewAddCart.price)}</b>
            </div>
          </div>
          <div className="d-flex">
            <NavLink style={{ width: "50%" }} to="/cart">
              <button style={{ width: "100%", padding: "10px", backgroundColor: "#31353d", color: "white" }}>Đi tới giỏ hàng</button>
            </NavLink>
            <NavLink style={{ width: "50%" }} to="/checkout">
              <button style={{ width: "100%", padding: "10px", backgroundColor: "#f6435b", color: "white" }}>Thanh toán</button>
            </NavLink>
          </div>
        </Modal>
      )}
      {/* Modal */}
      {view && (
        <Modal footer={false} centered visible={modalView} width={1000} onCancel={() => closeModal()}>
          <div>
            <div >
              <div >
                <div className="modal-body">
                  <div className="row no-gutters">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      {/* Product Slider */}
                      {/* <div className="product-gallery">
                                             <div className="quickview-slider-active">
                                                 <div className="single-slider">
                                                     <img src={view ? view.img_url : ''} alt="#" />
                                                 </div>
                                             </div>
                                         </div> */}
                      <img src={view.img_url ? view.img_url : ''} alt="#" />
                      {/* End Product slider */}
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="quickview-content">
                        <h2>{view.name ? view.name : ''}</h2>
                        <div className="quickview-ratting-review">
                          <div className="quickview-ratting-wrap">
                            <div className="quickview-ratting">
                              <i className="yellow fa fa-star" />
                              <i className="yellow fa fa-star" />
                              <i className="yellow fa fa-star" />
                              <i className="yellow fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                            <a href="#"> (1 customer review)</a>
                          </div>
                          <div className="quickview-stock">
                            <span><i className="fa fa-check-circle-o" /> in stock</span>
                          </div>
                        </div>
                        <h3>{formatCurrency(view.price)}</h3>
                        <div className="quickview-peragraph edit-ckeditor-show">
                          <p>{view.description ? parse(view.description) : ''}</p>
                        </div>
                        <div className="size">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <h5 className="title">Size</h5>
                              <Dropdown value={selectedSize} options={sizes} optionLabel="name" onChange={onSizeChange} placeholder="Chọn size" />
                            </div>
                            <div className="col-lg-6 col-12">
                              <h5 className="title">Color</h5>
                              <Dropdown value={selectedColor} options={colors} optionLabel="name" onChange={onColorChange} placeholder="Chọn color" />
                            </div>
                          </div>
                        </div>
                        <div className="quantity">
                          {/* Input Order */}
                          <div className="input-group">
                            <div className="button minus">
                              <button type="button" disabled={number === 1} className="btn btn-primary btn-number" onClick={() => reduceNumber()} data-type="minus">
                                <i className="ti-minus" />
                              </button>
                            </div>
                            <input type="text" className="input-number" data-min={1} data-max={1000} value={number} />
                            <div className="button plus">
                              <button type="button" className="btn btn-primary btn-number" onClick={() => addNumber()} data-type="plus" >
                                <i className="ti-plus" />
                              </button>
                            </div>
                          </div>
                          {/*/ End Input Order */}
                        </div>
                        <div className="add-to-cart">
                          <a href="#" className="btn" onClick={() => addToCart(view)}>Add to cart</a>
                          {/* <a href="#" className="btn min"><i className="ti-heart" /></a>
                                                        <a href="#" className="btn min"><i className="fa fa-compress" /></a> */}
                        </div>
                        {/* <div className="default-social">
                                                        <h4 className="share-now">Share:</h4>
                                                        <ul>
                                                            <li><a className="facebook" href="#"><i className="fa fa-facebook" /></a></li>
                                                            <li><a className="twitter" href="#"><i className="fa fa-twitter" /></a></li>
                                                            <li><a className="youtube" href="#"><i className="fa fa-pinterest-p" /></a></li>
                                                            <li><a className="dribbble" href="#"><i className="fa fa-google-plus" /></a></li>
                                                        </ul>
                                                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )
      }
      {/* Modal end */}
    </>
  )
}

export default Home
