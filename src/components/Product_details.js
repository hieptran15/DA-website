import React from 'react'
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Header from './Header';
import Footer from './Footer';
function Product_details() {
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <div>
            <Header/>
             {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <div className="bread-inner">
                            <ul className="bread-list">
                            <li><a href="index1.html">Home<i className="ti-arrow-right" /></a></li>
                            <li className="active"><a href="blog-single.html">Contact</a></li>
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
                        <div className="col-lg-6 col-12">
                            <div className="form-main">
                            <div className="title">
                                <h4>Get in touch</h4>
                                <h3>Write us a message</h3>
                            </div>
                            <form className="form" method="post" action="mail/mail.php">
                                <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                    <label>Your Name<span>*</span></label>
                                    <input name="name" type="text" placeholder />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                    <label>Your Subjects<span>*</span></label>
                                    <input name="subject" type="text" placeholder />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                    <label>Your Email<span>*</span></label>
                                    <input name="email" type="email" placeholder />
                                    </div>	
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                    <label>Your Phone<span>*</span></label>
                                    <input name="company_name" type="text" placeholder />
                                    </div>	
                                </div>
                                <div className="col-12">
                                    <div className="form-group message">
                                    <label>your message<span>*</span></label>
                                    <textarea name="message" placeholder defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group button">
                                    <button type="submit" className="btn ">Send Message</button>
                                    </div>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="single-head">
                            <div className="single-info">
                                <i className="fa fa-phone" />
                                <h4 className="title">Call us Now:</h4>
                                <ul>
                                <li>+123 456-789-1120</li>
                                <li>+522 672-452-1120</li>
                                </ul>
                            </div>
                            <div className="single-info">
                                <i className="fa fa-envelope-open" />
                                <h4 className="title">Email:</h4>
                                <ul>
                                <li><a href="mailto:info@yourwebsite.com">info@yourwebsite.com</a></li>
                                <li><a href="mailto:info@yourwebsite.com">support@yourwebsite.com</a></li>
                                <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
                                </ul>
                            </div>
                            <div className="single-info">
                                <i className="fa fa-location-arrow" />
                                <h4 className="title">Our Address:</h4>
                                <ul>
                                <li>KA-62/1, Travel Agency, 45 Grand Central Terminal, New York.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                {/*/ End Contact */}
                <Footer/>
        </div>
    )
}

export default Product_details
