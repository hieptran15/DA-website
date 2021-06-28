import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Modal, Button } from 'antd';
import Header from '../Header/Header';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Paginator } from 'primereact/paginator';
import { useDispatch, useSelector } from 'react-redux';
import { reload_cart } from '../../actions/actions';
import parse from 'html-react-parser';
import Footer from '../Footer/Footer';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./Products.css"
function Products() {
    const sort = [{ name: 'Mặc định', code: '' }, { name: 'Giá tăng dần', code: 'lowest' }, { name: 'Giá giảm dần', code: 'heightest' }];
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [getRow, setGetRow] = useState(0);
    const [typeSort, setTypeSort] = useState('');
    const [valueSort, setValueSort] = useState({ name: 'Mặc định', code: '' });
    const [view, setView] = useState(null);
    const [productViewType, setProductViewType] = useState('grid')
    const [viewAddCart, setViewAddCart] = useState(null);
    const [keyCategory, setKeyCategory] = useState('');
    const [keyBrand, setKeyBrand] = useState('');
    const [valueRange, setValueRange] = useState('')
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(0);
    const [countProduct, setCountProdcut] = useState(0);
    const [modalView, setModalView] = useState(false);
    const [modalViewAddCart, setModalViewAddCart] = useState(false);
    const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []);
    const [number, setNumber] = useState(1);
    const toast = useRef(null);
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    const LoginState = useSelector(state => state.login)
    const { user, loading, error, token, carts, role } = LoginState;
    const keySearch = query.get("search");
    const { t, i18n } = useTranslation();
    useEffect(() => {
        Axios.get(`http://localhost:8080/api/product/get-product?searchKeyword=${keySearch ? keySearch : ''}&min=${priceMin}&max=${priceMax}&category=${keyCategory}&brand=${keyBrand}&price=${typeSort}&page=${page}`).then((result) => {
            setData(result.data.datas);
            setCountProdcut(result.data.count);
            setPageCount(result.data.pages);
        });
    }, [keyCategory, typeSort, page, keySearch, priceMin, priceMax, keyBrand, user]);

    useEffect(() => {
        Axios.get("http://localhost:8080/api/category/get-all-category").then((result) => {
            setCategory(result.data);
        });
        getAllBrand();
        window.scrollTo(0, 0)
    }, [user])
    const getAllBrand = () =>{
        Axios.get("http://localhost:8080/api/brand/get-all-brand").then((result) => {
            setBrands(result.data)
        });
    }
    const onSortChange = (e) => {
        setTypeSort(e.value.code);
        setValueSort(e.value);
        setPage(1)
    }

    const onKeyCategory = (e) => {
        if (keyCategory === e) {
            setKeyCategory('');
            setPage(1)
        } else {
            setKeyCategory(e);
            setPage(1)
        }
    }

    const onKeyBrand = (e) => {
        if (keyBrand === e) {
            setKeyBrand('');
            setPage(1)
        } else {
            setKeyBrand(e);
            setPage(1)
        }
    }

    const onBasicPageChange = (event) => {
        setPage(event.page + 1);
        setGetRow(event.rows)
        // console.log(event.page);
        // console.log(event.rows);
        console.log(event);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
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
    const productTypeView = (e) => {
        setProductViewType(e)
    }
    const addToCart = (res) => {
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

    const arrayRange = [
        { name: '100k - 600k', min: 100000, max: 600000 },
        { name: '600k - 1tr', min: 600000, max: 1000000 },
        { name: '1tr - 5tr', min: 1000000, max: 5000000 },
    ]

    const rangePrice = (value) => {
        setValueRange(value.name)
        if (priceMin === value.min && priceMax === value.max) {
            setPriceMin(0);
            setPriceMax(0);
            setValueRange('')
        } else {
            setPriceMin(value.min);
            setPriceMax(value.max);
        }
        setPage(1)
    }
    return (
        <>
            <Header />
            {/* Breadcrumbs */}
            <Toast ref={toast} />
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><a href="index1.html">Home<i className="ti-arrow-right" /></a></li>
                                    <li className="active"><a href="blog-single.html">Shop Grid</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrumbs */}
            <div>
                {/* Product Style */}
                <section className="product-area shop-sidebar shop section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-12">
                                <div className="shop-sidebar">
                                    {/* Single Widget */}
                                    <div className="single-widget category">
                                        <h3 className="title">{t('category')}</h3>
                                        <ul className="categor-list">
                                            {category ? category.map((value, key) => {
                                                return (
                                                    <li key={value._id}><a className={'' + (keyCategory === value.category ? 'activeSideBarCategory' : '')} onClick={() => onKeyCategory(value.category)}>{value.category}</a></li>
                                                )
                                            }) : ''}
                                        </ul>
                                    </div>
                                    <div className="single-widget category">
                                        <h3 className="title">Brands</h3>
                                        <ul className="categor-list">
                                            {brands ? brands.map((value, key) => {
                                                return (
                                                    <li key={value._id}><a className={'' + (keyBrand === value.brand ? 'activeSideBarCategory' : '')} onClick={() => onKeyBrand(value.brand)}>{value.brand}</a></li>
                                                )
                                            }) : ''}
                                        </ul>
                                    </div>
                                    {/*/ End Single Widget */}
                                    {/* Shop By Price */}
                                    <div className="single-widget range">
                                        <h3 className="title">Shop by Price</h3>
                                        <div className="price-filter">
                                            <div className="price-filter-inner">
                                                <div id="slider-range" />
                                                <div className="price_slider_amount">
                                                    <div className="label-input">
                                                        <span>Range:</span><input type="text" id="amount" name="price" placeholder="Add Your Price" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="check-box-list">
                                            {
                                                arrayRange.map((value, key) => {
                                                    return (
                                                        <li key={key}>
                                                            <label className="checkbox-inline" htmlFor={value.name}><Checkbox checked={valueRange === value.name} inputId={value.name} value={value.name} onChange={() => rangePrice(value)} />{value.name}</label>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    {/*/ End Shop By Price */}
                                    {/* Single Widget */}
                                    <div className="single-widget recent-post">
                                        <h3 className="title">Other products</h3>
                                        {/* Single Post */}
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="images\single-shop-img1.png" alt="#" />
                                            </div>
                                            <div className="content">
                                                <h5><a href="#">Girls Dress</a></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li><i className="ti-star" /></li>
                                                    <li><i className="ti-star" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Single Post */}
                                        {/* Single Post */}
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="images\single-shop-img2.png" alt="#" />
                                            </div>
                                            <div className="content">
                                                <h5><a href="#">Women Clothings</a></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li><i className="ti-star" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Single Post */}
                                        {/* Single Post */}
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="images\single-shop-img3.png" alt="#" />
                                            </div>
                                            <div className="content">
                                                <h5><a href="#">Man Tshirt</a></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                    <li className="yellow"><i className="ti-star" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Single Post */}
                                    </div>
                                    {/*/ End Single Widget */}
                                    {/* Single Widget */}                               
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-12">
                                <div className="row">
                                    <div className="col-12">
                                        {/* Shop Top */}
                                        <div className="shop-top">
                                            <div className="shop-shorter">
                                                <div className="single-shorter">
                                                    <label>Sort By :</label>
                                                    <Dropdown value={valueSort} options={sort} optionLabel="name" placeholder="Giá..." onChange={onSortChange} />
                                                </div>
                                            </div>
                                            <div className="shop-shorter-right">
                                                <ul className="view-mode">
                                                    <li className="active"><a onClick={() => productTypeView('grid')}><i className="fa fa-th-large" /></a></li>
                                                    <li><a onClick={() => productTypeView('list')}><i className="fa fa-th-list" /></a></li>
                                                </ul>
                                                <div className="paginate-edit" >
                                                    <button className={'' + (page == 1 ? 'disable' : '')} onClick={() => setPage(page - 1)} disabled={page == 1}><i class="fa fa-chevron-left"></i></button>
                                                    <button className={'' + ((data ? data.length < 6 : 0) ? 'disable' : '')} onClick={() => setPage(page + 1)} disabled={data ? data.length < 6 : 0}><i class="fa fa-chevron-right"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        {/*/ End Shop Top */}
                                    </div>
                                </div>
                                <div>
                                    {productViewType === "grid" && (
                                        <div className="row">
                                            {data.length !== 0 ? data.map((value, key) => {
                                                return (
                                                    <div key={value._id} className="col-lg-4 col-md-6 col-12">
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <Link to={`/product-details?userId=${value._id}`}>
                                                                    <img className="default-img" src={value.img_url} />
                                                                    <img className="hover-img" src={value.img_url} />
                                                                </Link>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" onClick={() => quickView(value)} ><i className=" ti-eye" /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="#"><i className=" ti-heart " /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="#"><i className="ti-bar-chart-alt" /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" onClick={() => onlyAddCart(value)}>Add to cart</a>
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
                                                    </div>
                                                )
                                            }) : <h4 className="text-empty">Không có sản phẩm nào</h4>}
                                        </div>
                                    )}
                                    {productViewType === "list" && (
                                        <div className="row">
                                            {data.length !== 0 ? data.map((value, key) => {
                                                return (
                                                    <div key={value._id} className="col-lg-12 col-md-12 col-12">
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <Link to={`/product-details?userId=${value._id}`}>
                                                                    <img className="default-img" src={value.img_url} />
                                                                    <img className="hover-img" src={value.img_url} />
                                                                </Link>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><Link to={`/product-details?userId=${value._id}`}>{value.name}</Link></h3>
                                                                <div className="product-price">
                                                                    <span>{formatCurrency(value.price)}</span>
                                                                </div>
                                                                <div>
                                                                    {value.description}
                                                                </div>
                                                                <div>
                                                                    <button>xem nhanh</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : <h4 className="text-empty">Không có sản phẩm nào</h4>}
                                        </div>
                                    )}
                                </div>
                                <div className="edit-paginator">
                                    <Paginator first={page} rows={6} totalRecords={countProduct} onPageChange={onBasicPageChange}></Paginator>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*/ End Product Style 1  */}
                {/* Start Shop Newsletter  */}
                <section className="shop-newsletter section">
                    <div className="container">
                        <div className="inner-top">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2 col-12">
                                    {/* Start Newsletter Inner */}
                                    <div className="inner">
                                        <h4>Newsletter</h4>
                                        <p> Subscribe to our newsletter and get <span>10%</span> off your first purchase</p>
                                        <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                                            <input name="EMAIL" placeholder="Your email address" required type="email" />
                                            <button className="btn">Subscribe</button>
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
                {viewAddCart && (
                    <Modal footer={false} centered visible={modalViewAddCart} width={500} onCancel={() => closeModalViewCart()}>
                        <div style={{ marginBottom: "15px", color: "#84b767", fontSize: "18px" }}><i style={{ marginRight: '10px' }} class="fa fa-check-circle"></i>Thêm vào giỏ hàng thành công!</div>
                        <div style={{ marginBottom: "10px" }} className="d-flex">
                            <div style={{ marginRight: "25px" }}>
                                <img src={viewAddCart.img_url} style={{ width: "200px", height: "220px", objectFit: "cover" }} />
                            </div>
                            <div>
                                <p style={{ fontSize: "18px", fontWeight: "600" }}>{viewAddCart.name}</p>
                                <i>số lượng: 1</i>
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
                {/* Modal end */}
            </div>
            <Footer />
        </>
    )
}

export default Products
