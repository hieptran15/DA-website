import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import Axios from 'axios';
import { Checkbox } from 'primereact/checkbox';
import './Checkout.css'
import { Redirect } from 'react-router';
import Modal from 'antd/lib/modal/Modal';
import { Link } from 'react-router-dom';
function CheckOut() {
  const cities = [
    { name: 'Ninh Bình', code: 'NY' },
    { name: 'Hà nội', code: 'RM' },
    { name: 'Nam định', code: 'LDN' },
    { name: 'Thái bình', code: 'IST' },
    { name: 'Thành phố Hồ Chí Minh', code: 'PRS' }
  ];
  const [cartItem, setCartItem] = useState(null);
  const [keySelect, setKeySelect] = useState('Payments');
  const [modalViewOrderSuccess, setModalViewOrderSuccess] = useState(false);
  useEffect(() => {
    setCartItem(JSON.parse(localStorage.getItem("cartItems")));
    window.scrollTo(0, 0)
  }, []);
  const formatCurrency = (value) => {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  }
  let emptyValue = {
    fullName: '',
    email: '',
    address: '',
    phone: null,
    portCode: null,
    city: '',
    noteOrder: '',
  };
  const [formValues, setFormValues] = useState(emptyValue);
  const [selectedCity, setSelectedCity] = useState()
  const onInputChange = (e, name) => {
    const val = e.target.value;
    let _valueItem = { ...formValues };
    _valueItem[`${name}`] = val;
    setFormValues(_valueItem);
  }
  const onDropdownChange = (e, name) => {
    const val = e.target.value;
    setSelectedCity(val)
    let _valueItem = { ...formValues };
    _valueItem[`${name}`] = val.name;
    setFormValues(_valueItem);
  }
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _valueItem = { ...formValues };
    _valueItem[`${name}`] = val;
    setFormValues(_valueItem);
  }
  const selectCheckOut = (value) => {
    setKeySelect(value)
  }
  const onSubmit = () => {
    let _valueItem = { ...formValues, cartItems: cartItem, total: cartItem !== null ? cartItem.reduce((a, c) => a + c.price * c.count, 0) : 0, status: "PENDING" };
    console.log(_valueItem);
    try {
      Axios.post("http://localhost:8080/api/order/post-order", _valueItem).then(res => {
        console.log(res);
        setModalViewOrderSuccess(true)
        setFormValues(emptyValue);
        localStorage.setItem("cartItems", JSON.stringify([]))
      })
    } catch (error) {
      console.log('error');
    }
  }
  const closeModalViewCart = () => {
    setModalViewOrderSuccess(false);
  }
  return (
    <div>
      <Header />
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li><a href="index1.html">Home<i className="ti-arrow-right" /></a></li>
                  <li className="active"><a href="blog-single.html">Checkout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumbs */}
      {/* Start Checkout */}
      <section className="shop checkout section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="checkout-form">
                <h2>Make Your Checkout Here</h2>
                <p>Please register in order to checkout more quickly</p>
                {/* Form */}
                <form className="form edit-form" method="post" action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>Full name<span>*</span></label>
                        <InputText id="fullName" name="fullName" value={formValues.fullName} onChange={(e) => onInputChange(e, 'fullName')} />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>Email<span>*</span></label>
                        <InputText id="email" name="email" value={formValues.email} onChange={(e) => onInputChange(e, 'email')} />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>Address<span>*</span></label>
                        <InputText id="address" name="address" value={formValues.address} onChange={(e) => onInputChange(e, 'address')} />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>Phone<span>*</span></label>
                        <div>
                          <InputNumber id="phone" name="phone" value={formValues.phone} onChange={(e) => onInputNumberChange(e, 'phone')} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>Postal Code<span>*</span></label>
                        <div>
                          <InputNumber id="portCode" name="portCode" value={formValues.portCode} onChange={(e) => onInputNumberChange(e, 'portCode')} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>City<span>*</span></label>
                        <div className="edit-dropDown">
                          <Dropdown id="city" name="city" value={selectedCity} options={cities} onChange={(e) => onDropdownChange(e, 'city')} optionLabel="name" placeholder="Select a City" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>Note<span>*</span></label>
                        <InputTextarea id="noteOrder" value={formValues.noteOrder} onChange={(e) => onInputChange(e, 'noteOrder')} rows={5} cols={30} />
                      </div>
                    </div>
                  </div>
                </form>
                {/*/ End Form */}
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="order-details">
                {/* Order Widget */}
                <div className="single-widget">
                  <h2>ORDER ({cartItem !== null ? cartItem.length : 0} product)</h2>
                  <div className="content">
                    {cartItem !== null ? cartItem.map((value, key) => {
                      return (
                        <div className="product-details d-flex">
                          <div style={{ position: "relative" }} className="d-flex align-items-center ">
                            <img src={value.img_url} />
                            <p>{value.name}</p>
                            <div className="product-count">{value.count}</div>
                          </div>
                          <p>{formatCurrency(value.price)}</p>
                        </div>
                      )
                    }) : <div className="product-details">empty</div>}
                    <ul>                    
                      <li className="last">Total<span>{formatCurrency(cartItem !== null ? cartItem.reduce((a, c) => a + c.price * c.count, 0) : 0)}</span></li>
                    </ul>
                  </div>
                </div>
                {/*/ End Order Widget */}
                {/* Order Widget */}
                <div className="single-widget">
                  <h2>Payments</h2>
                  <div className="content">
                    <div className="checkbox">
                      <label className="checkbox-inline" htmlFor={'1'}><Checkbox inputId="1" checked={keySelect === 'Payments'} onChange={e => selectCheckOut('Payments')} /> Check Payments</label>
                      {/* <label className="checkbox-inline" htmlFor={'2'}><Checkbox inputId="2" checked={keySelect === 'Delivery'} onChange={e => selectCheckOut('Delivery')} /> Cash On Delivery</label>
                      <label className="checkbox-inline" htmlFor={'3'}><Checkbox inputId="3" checked={keySelect === 'PayPal'} onChange={e => selectCheckOut('PayPal')} /> PayPal</label> */}
                    </div>
                  </div>
                </div>
                {/*/ End Order Widget */}
                {/* Payment Method Widget */}
                <div className="single-widget payement">
                  <div className="content">
                    <img src="images\payment-method.png" alt="#" />
                  </div>
                </div>
                {/*/ End Payment Method Widget */}
                {/* Button Widget */}
                <div className="single-widget get-button">
                  <div className="content">
                    <button disabled={keySelect === '' || formValues.fullName === '' || formValues.phone === null || formValues.email === '' || formValues.address === ''} className="button" onClick={() => onSubmit()}>
                      <a className="btn edit-process">proceed to checkout</a>
                    </button>
                  </div>
                </div>
                {/*/ End Button Widget */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End Checkout */}
      {/* Start Shop Services Area  */}
      <section className="shop-services section home">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-rocket" />
                <h4>Free shiping</h4>
                <p>Orders over $100</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-reload" />
                <h4>Free Return</h4>
                <p>Within 30 days returns</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-lock" />
                <h4>Sucure Payment</h4>
                <p>100% secure payment</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-tag" />
                <h4>Best Peice</h4>
                <p>Guaranteed price</p>
              </div>
              {/* End Single Service */}
            </div>
          </div>
        </div>
      </section>
      {/* End Shop Services */}
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
      <Modal footer={false} centered visible={modalViewOrderSuccess} width={500} onCancel={() => closeModalViewCart()}>
        <h2 style={{ color: '#63ab01' }}>Mua hàng thành công!</h2>
        <p>Chúng tôi sẽ sớm liên hệ với bạn để giao hàng trong thời gian ngắn nhất</p>
        <Link to="/">Tiếp tục mua hàng</Link>
      </Modal>
      {/* End Shop Newsletter */}
      <Footer />
    </div>
  )
}

export default CheckOut
