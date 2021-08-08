import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Rating } from 'primereact/rating';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './DashBroard.css'
function DasbBoard() {
    const [products, setProducts] = useState([]);
    const [users, setUser] = useState([]);
    const [orders, setOrder] = useState([]);
    const [totalMount, setTotalMount] = useState([]);
    useEffect(() => {
        getProducts();
        getUsers();
        getOrders();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    const getUsers = () => {
        Axios.get("http://localhost:8080/api/user/get-all-users").then((result) => {
            setUser(result.data.filter(x => x.role === "ROLE_USER"));
        });
    }
    const getOrders = () => {
        Axios.get('http://localhost:8080/api/order/get-all-order').then(res => {
            setOrder(res.data);
            const orderFinish = res.data.filter(x => x.status === "FINISHED").reduce((a,b)=> a + b.total, 0);
            setTotalMount(orderFinish)
        })
    }
    const getProducts = () => {
        Axios.get("http://localhost:8080/api/product/list-all-product").then((result) => {
            setProducts(result.data);
        });
    }
    const options = {
        chart: {
            type: 'areaspline',
            renderTo: 'chart',
        },
        xAxis: {
            categories: [
                'T1',
                'T2',
                'T3',
                'T4',
                'T5',
                'T6',
                'T7',
                'T8',
                'T9',
                'T10',
                'T11',
                'T12'
            ],
        },
        yAxis: {
            title: {
                text: ''
            },
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b>',
            pointFormat: '{point.x1} : {point.y} đ',
            clusterFormat: 'Clustered points: {point.clusterPointsAmount}'
        },
        title: {
            text: 'Doanh thu'
        },
        series: [{
            name: 'Tổng',
            data: [5000000, 40000000, 30000000, 53000000, 28000000, 100000000, 120000000, 140000000, 60000000, 70000000, 80000000, 150000000], color: '#f07f84'
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
                                <b>Đơn hàng</b>
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
                                <b>Sản phẩm</b>
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
                                <b>Khách hàng</b>
                            </div>
                            <div className="edit_icon">
                                <i class="fa fa-users"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="edit_review">
                            <div className="item">
                                <p>{formatCurrency(totalMount)}</p>
                                <b>Tổng thu nhập</b>
                            </div>
                            <div className="edit_icon">
                                <i class="ti-shopping-cart-full"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="list_widgets_body">
                <div className="edit-chart">
                    {/* <div className="header-edit">Summary</div> */}
                    <HighchartsReact  highcharts={Highcharts} options={options} />
                </div>
                <div className="top-selling">
                    <div className="header-edit">Top Đánh giá sản phẩm</div>
                    <div className="item_body">
                        {products.length !== 0 ? products.map((value, key) => {
                            return (
                                <div key={value._id} className="body_selling d-flex align-items-center justify-content-between">
                                    <div className="product_left d-flex align-items-center">
                                        <div className="edit-selling">
                                            <img src={value.img_url} />
                                        </div>
                                        <div>
                                            <div>
                                                <b style={{marginLeft: "5px"}}>{value.name}</b>
                                            </div>
                                            <div className="list-revews">       
                                                <Rating value={value.rate} readOnly stars={5} cancel={false} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_right">
                                        {formatCurrency(value.price)}
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