import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router';
function Product_details() {
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const [data, setData] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const userID = query.get("userId");
    useEffect(() => {
        Axios.get(`http://localhost:8080/api/product/get-product/${userID}`).then((result) => {
            console.log(result);
            setData(result.data);
            console.log(data);
        })
    }, [])
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
                            <div className="col-lg-5 col-12">
                                <div className="form-main" style={{padding: "0"}}>
                                    <img src={data ? data.img_url : ''} />
                                </div>
                            </div>
                            <div className="col-lg-7 col-12">
                                <div className="single-head">
                                    <div className="single-info">
                                        <h4 className="title">{data ? data.name : ''}</h4>
                                    </div>
                                    <div className="single-info">
                                        <h4 className="title">{data ? data.price : ''}</h4>
                                        <p>{data ? data.description : ''}</p>
                                    </div>
                                    <div className="single-info">
                                        <span>Kích cỡ:</span>
                                        <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
                                    </div>
                                    <div className="single-info">
                                        
                                        <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
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
            <Footer />
        </div>
    )
}

export default Product_details
