import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { GMap } from 'primereact/gmap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { load_param } from '../../actions/actions';
import { useTranslation } from 'react-i18next';
function Contact() {
  const { t, i18n } = useTranslation();
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [overlays, setOverlays] = useState([]);
  const google = window.google;
  const dispatch = useDispatch();
  useEffect(() => {
    setGoogleMapsReady(true);
    dispatch(load_param(''))
  },[])
  const mapOptions = {
    center: { lat: 21.072687, lng: 105.773568 },
    zoom: 15,
    stylers: [
      {color: ''},
      {visibility: ''},
      {backgroundColor: 'rgb(105 105 105 / 0%)'}
      // Add any stylers you need.
    ]
  };

  const onMapReady = (event) => {
    setOverlays(
      [
        new google.maps.Marker({ position: { lat: 21.072687, lng: 105.773568 }, title: "Cổ nhuế" }),
        // new google.maps.Circle({ center: { lat: 21.072687, lng:  105.773568 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
      ]
    )
  }
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li><a href="index1.html">{t('breadCrumb.home')}<i className="ti-arrow-right" /></a></li>
                  <li className="active"><a href="blog-single.html">{t('breadCrumb.contact')}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumbs */}
      {/* Start Contact */}
      <section id="contact-us" className="contact-us section">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="form-main">
                  <div className="title">
                    <h4>{t('contact.getInTouch')}</h4>
                    <h3>{t('contact.writeUsAMessage')}</h3>
                  </div>
                  <form className="form" method="post" action="mail/mail.php">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>{t('checkout.name')}<span>*</span></label>
                          <input name="name" type="text" placeholder />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>{t('contact.yourSubjects')}<span>*</span></label>
                          <input name="subject" type="text" placeholder />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>Email<span>*</span></label>
                          <input name="email" type="email" placeholder />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>{t('checkout.phone')}<span>*</span></label>
                          <input name="company_name" type="text" placeholder />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group message">
                          <label>{t('contact.yourSubjects')}<span>*</span></label>
                          <textarea name="message" placeholder defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group button">
                          <button type="submit" className="btn ">{t('contact.sendMessage')}</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="single-head">
                  <div className="single-info">
                    <i className="fa fa-phone" />
                    <h4 className="title">{t('contact.callUsNow')}</h4>
                    <ul>
                      <li>0342925252</li>
                      <li>0342925252</li>
                    </ul>
                  </div>
                  <div className="single-info">
                    <i className="fa fa-envelope-open" />
                    <h4 className="title">Email:</h4>
                    <ul>
                      <li><a href="mailto:info@yourwebsite.com">Hieptv@gmail.com</a></li>
                      <li><a href="mailto:info@yourwebsite.com">Hieptv@gmail.com</a></li>
                    </ul>
                  </div>
                  <div className="single-info">
                    <i className="fa fa-location-arrow" />
                    <h4 className="title">{t('contact.ourAddress')}</h4>
                    <ul>
                      <li>Số 23 Lê Văn Hiến , Đức Thắng, Hà Nội</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End Contact */}
      {/* Map Section */}
      <div className="map-section">
        {googleMapsReady && (
          <div>
            <GMap options={mapOptions} overlays={overlays}  style={{ width: '100%', minHeight: '520px' }} onMapReady={onMapReady} />
          </div>
        )}
      </div>
      {/*/ End Map Section */}
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
    </div>
  )
}

export default Contact
