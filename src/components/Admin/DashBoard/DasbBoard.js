import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './DashBroard.css'
function DasbBoard() {
    const [products, setProducts] = useState([]);
    const [users, setUser] = useState([]);
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        getProducts();
        getUsers();
        getOrders();
    }, []);
    const getUsers = () => {
        Axios.get("http://localhost:8080/api/user/get-all-users").then((result) => {
            setUser(result.data);
        });
    }
    const getOrders = () => {
        Axios.get('http://localhost:8080/api/order/get-all-order').then(res => {
            setOrder(res.data)
        })
    }
    const getProducts = () => {
        Axios.get("http://localhost:8080/api/product/list-all-product").then((result) => {
            setProducts(result.data);
        });
    }

    const options = {
        chart: {
            type: 'areaspline'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
        },
        yAxis: {
            title: {
                text: ''
            },
        },
        title: {
            text: 'Summary'
        },
        series: [{
            name: 'revenue',
            data: [0, 40, 30, 50, 40, 100, 120, 140, 60, 170, 80, 190], color: '#f07f84'
        }]
    };
    return (
        <div className="page_dashBoard">
            <div className="list_widgets_top">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="edit_order">
                            <div className="item">
                                <p>{orders.length !== 0 ? orders.length : 0}</p>
                                <b>Order</b>
                            </div>
                            <div className="edit_icon">
                                <i class="ti-package"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="edit_product">
                            <div className="item">
                                <p>{products.length !== 0 ? products.length : 0}</p>
                                <b>Products</b>
                            </div>
                            <div className="edit_icon">
                                <i class="ti-receipt"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="edit_customer">
                            <div className="item">
                                <p>{users.length !== 0 ? users.length : 0}</p>
                                <b>Customers</b>
                            </div>
                            <div className="edit_icon">
                                <i class="fa fa-users"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="edit_review">
                            <div className="item">
                                <p>0</p>
                                <b>Reviews</b>
                            </div>
                            <div className="edit_icon">
                                <i class="ti-comment-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="list_widgets_body">
                <div className="edit-chart">
                    {/* <div className="header-edit">Summary</div> */}
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div className="top-selling">
                    <div className="header-edit">Top Selling Products</div>
                    <div className="item_body">
                        {products.length !== 0 ? products.map((value, key) => {
                            return (
                                <div key={value._id} className="body_selling d-flex align-items-center justify-content-between">
                                    <div className="product_left d-flex align-items-center">
                                        <div className="edit-selling">
                                            <img src={value.img_url} />
                                        </div>
                                        <div>
                                            <b>{value.name}</b>
                                        </div>
                                    </div>
                                    <div className="product_right">
                                        {value.price}
                                    </div>
                                </div>
                            )
                        }) : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DasbBoard