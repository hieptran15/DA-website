import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Products() {
    const [data,setData]=useState(null)
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/product/get-product").then((result) =>{
            setData(result.data)
        })
    },[])
    console.log(data)
    return (
        <>
            {/* Breadcrumbs */}
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
                                        <h3 className="title">Categories</h3>
                                        <ul className="categor-list">
                                            <li><a href="#">T-shirts</a></li>
                                            <li><a href="#">jacket</a></li>
                                            <li><a href="#">jeans</a></li>
                                            <li><a href="#">sweatshirts</a></li>
                                            <li><a href="#">trousers</a></li>
                                            <li><a href="#">kitwears</a></li>
                                            <li><a href="#">accessories</a></li>
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
                                            <li>
                                                <label className="checkbox-inline" htmlFor={1}><input name="news" id={1} type="checkbox" />$20 - $50<span className="count">(3)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" htmlFor={2}><input name="news" id={2} type="checkbox" />$50 - $100<span className="count">(5)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" htmlFor={3}><input name="news" id={3} type="checkbox" />$100 - $250<span className="count">(8)</span></label>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*/ End Shop By Price */}
                                    {/* Single Widget */}
                                    <div className="single-widget recent-post">
                                        <h3 className="title">Recent post</h3>
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
                                    <div className="single-widget category">
                                        <h3 className="title">Manufacturers</h3>
                                        <ul className="categor-list">
                                            <li><a href="#">Forever</a></li>
                                            <li><a href="#">giordano</a></li>
                                            <li><a href="#">abercrombie</a></li>
                                            <li><a href="#">ecko united</a></li>
                                            <li><a href="#">zara</a></li>
                                        </ul>
                                    </div>
                                    {/*/ End Single Widget */}
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-12">
                                <div className="row">
                                    <div className="col-12">
                                        {/* Shop Top */}
                                        <div className="shop-top">
                                            <div className="shop-shorter">
                                                <div className="single-shorter">
                                                    <label>Show :</label>
                                                    <select>
                                                        <option selected="selected">09</option>
                                                        <option>15</option>
                                                        <option>25</option>
                                                        <option>30</option>
                                                    </select>
                                                </div>
                                                <div className="single-shorter">
                                                    <label>Sort By :</label>
                                                    <select>
                                                        <option selected="selected">Name</option>
                                                        <option>Price</option>
                                                        <option>Size</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <ul className="view-mode">
                                                <li className="active"><a href="shop-grid.html"><i className="fa fa-th-large" /></a></li>
                                                <li><a href="shop-list.html"><i className="fa fa-th-list" /></a></li>
                                            </ul>
                                        </div>
                                        {/*/ End Shop Top */}
                                    </div>
                                </div>
                                <div className="row">
                                    {data!==null?data.map((value,key)=>{
                                        return(
                                            <div className="col-lg-4 col-md-6 col-12">
                                        <div className="single-product">
                                            <div className="product-img" style={{  
                                                        backgroundImage: "url(" + value.img_url + ")",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        height:'300px'
                                                        }}>
                                                <a href="#">
                                                    <img className="default-img" />
                                                    {/* <img className="hover-img" src="images\products\p2.jpg"  /> */}
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i className=" ti-eye" /><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="#"><i className=" ti-heart " /><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="#"><i className="ti-bar-chart-alt" /><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">{value.name}</a></h3>
                                                <div className="product-price">
                                                <span>{value.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        )

                                    }):""}
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
                {/* Modal end */}
            </div>

        </>
    )
}

export default Products