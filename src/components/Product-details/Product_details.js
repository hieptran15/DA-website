import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Modal, Button } from 'antd';
import { useEffect } from 'react';
import { reload_cart } from '../../actions/actions';
import Axios from 'axios';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import "./Project-details.css"
function Product_details() {
    const cities = [
        { name: 'S', code: 'S' },
        { name: 'L', code: 'L' },
        { name: 'XL', code: 'XL' },
    ];
    const [data, setData] = useState(null);
    const [viewAddCart, setViewAddCart] = useState(null);
    const [modalViewAddCart, setModalViewAddCart] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [sizre,setSize] = useState('')
    const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [])
    const [checkey, setCheckey] = useState('des')
    const [number, setNumber] = useState(1);
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    const userID = query.get("userId");

    useEffect(() => {
        Axios.get(`http://localhost:8080/api/product/get-product/${userID}`).then((result) => {
            console.log(result);
            setData(result.data);
            console.log(data);
        })
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }

    const onSizeChange = (e) => {
        setSelectedSize(e.value);
        setSize(e.value.name)
    }

    const reduceNumber = () => {
        setNumber(number - 1)
    }
    const addNumber = () => {
        setNumber(number + 1)
    }
    const closeModalViewCart = () => {
        setModalViewAddCart(false)
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
            cart.push({ ...res, count: number, size: sizre !== '' ? sizre : ''});
        }
        console.log(cart);
        setCartItems(cart)
        localStorage.setItem("cartItems", JSON.stringify(cart))
        console.log(cart);
        dispatch(reload_cart(cart));
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
                    <div className="contact-head page-product-details">
                        <div className="row">
                            <div className="col-lg-5 col-12">
                                <div className="form-main" style={{ padding: "0" }}>
                                    <img src={data ? data.img_url : ''} />
                                </div>
                            </div>
                            <div className="col-lg-7 col-12">
                                <div className="quickview-content">
                                    <h2>{data ? data.name : ''}</h2>
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
                                    <h3>{data ? formatCurrency(data.price) : ''}</h3>
                                    <div className="quickview-peragraph edit-ckeditor-show">
                                        {data ? parse(data.description) : ''}
                                    </div>
                                    <div className="size">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <h5 className="title">Size</h5>
                                                <Dropdown value={selectedSize} options={cities} optionLabel="name" onChange={onSizeChange} placeholder="Chọn size" />
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
                                                <button type="button" disabled={number === 1} onClick={() => reduceNumber()} className="btn btn-primary btn-number" data-type="minus">
                                                    <i className="ti-minus" />
                                                </button>
                                            </div>
                                            <input type="text" className="input-number" data-min={1} data-max={1000} value={number} />
                                            <div className="button plus">
                                                <button type="button" onClick={() => addNumber()} className="btn btn-primary btn-number" data-type="plus" >
                                                    <i className="ti-plus" />
                                                </button>
                                            </div>
                                        </div>
                                        {/*/ End Input Order */}
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn" onClick={() => onlyAddCart(data)}>Add to cart</a>
                                    </div>
                                </div>
                                <div className="contact-Staff">
                                    <a href="tel:12345678" className="staff-item">
                                        <div style={{ marginRight: "10px", padding: "5px" }}>
                                            <img style={{ width: "40px", borderRadius: "50%" }} src="./images/logoDefault.jpg" />
                                        </div>
                                        <div className="edit-text">
                                            <p>Kinh doanh 1</p>
                                            <p>1234335356</p>
                                        </div>
                                    </a>
                                    <a href="tel:12345678" className="staff-item">
                                        <div style={{ marginRight: "10px", padding: "5px" }}>
                                            <img style={{ width: "40px", borderRadius: "50%" }} src="./images/logoDefault.jpg" />
                                        </div>
                                        <div className="edit-text">
                                            <p>Kinh doanh 2</p>
                                            <p>1234335356</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-tab">
                        <ul className="list-style">
                            <li onClick={() => setCheckey('des')} className={'test' + ' ' + (checkey === 'des' ? 'activeList' : '')}>
                                <a>Mô tả sản phẩm</a>
                            </li>
                            <li onClick={() => setCheckey('plo')} className={checkey === 'plo' ? 'activeList' : ''}>
                                <a>Chính sách đổi trả</a>
                            </li>
                        </ul>
                        <div className="tab-content edit">
                            {checkey === 'des' && (
                                <div className="description">
                                    {data ? parse(data.description) : ''}
                                </div>
                            )}
                            {checkey === 'plo' && (
                                <div className="policy">
                                    <h6>1. Đổi trả theo nhu cầu khách hàng (đổi trả hàng vì không ưng ý)</h6>
                                    <p>Tất cả mặt hàng đã mua đều có thể hoàn trả trong vòng 30 ngày kể từ ngày nhận hàng (trừ khi có quy định gì khác). Chúng tôi chỉ chấp nhận đổi trả cho các sản phẩm còn nguyên điều kiện ban đầu, còn hóa đơn mua hàng & sản phẩm chưa qua sử dụng, bao gồm:</p>
                                    <p>- Còn nguyên đóng gói và bao bì không bị móp rách <br />
                                    - Đầy đủ các chi tiết, phụ kiện <br />
                                    - Tem / phiếu bảo hành, tem thương hiệu, hướng dẫn kỹ thuật và các quà tặng kèm theo (nếu có) v.v… phải còn đầy đủ và nguyên vẹn <br />
                                    - Không bị dơ bẩn, trầy xước, hư hỏng, có mùi lạ hoặc có dấu hiệu đã qua qua sử dụng</p>
                                    <h6>2. Đổi trả không vì lý do chủ quan từ khách hàng</h6>
                                    <p>2.1. Hàng giao không mới, không nguyên vẹn, sai nội dung hoặc bị thiếu <br />
                                    Chúng tôi khuyến khích quý khách hàng phải kiểm tra tình trạng bên ngoài của thùng hàng và sản phẩm trước khi thanh toán để đảm bảo rằng hàng hóa được giao đúng chủng loại, số lượng, màu sắc theo đơn đặt hàng và tình trạng bên ngoài không bị tác động.
                                    Nếu gặp trường hợp này, Quý khách vui lòng từ chối nhận hàng và/hoặc báo ngay cho bộ phận hỗ trợ khách hàng để chúng tôi có phương án xử lí kịp thời. (Xin lưu ý những bước kiểm tra sâu hơn như dùng thử sản phẩm chỉ có thể được chấp nhận sau khi đơn hàng được thanh toán đầy đủ).
                                    Trong trường hợp khách hàng đã thanh toán, nhận hàng và sau đó phát hiện hàng hóa không còn mới nguyên vẹn, sai nội dung hoặc thiếu hàng, xin vui lòng chụp ảnh sản phẩm gửi về hộp thư của chúng tôi để được chúng tôi hỗ trợ các bước tiếp theo như đổi/trả hàng hoặc gửi sản phẩm còn thiếu đến quý khách…
                                    Sau 48h kể từ ngày quý khách nhận hàng, chúng tôi có quyền từ chối hỗ trợ cho những khiếu nại theo nội dung như trên.</p>
                                    <p>2.2. Hàng giao bị lỗi<br />
                                    Khi quý khách gặp trục trặc với sản phẩm đặt mua của chúng tôi, vui lòng thực hiện các bước sau đây: <br />
                                    - Bước 1: Kiểm tra lại sự nguyên vẹn của sản phẩm, chụp lại ảnh sản phẩm xuất hiện lỗi <br />
                                    - Bước 2: Quý khách liên hệ với trung tâm chăm sóc khách hàng của chúng tôi để được xác nhận <br />
                                    - Bước 3: Trong vòng 30 ngày kể từ ngày nhận hàng, nếu quý khách được xác nhận từ trung tâm chăm sóc khách hàng rằng sản phẩm bị lỗi kỹ thuật, quý khách vui lòng truy cập ngay Hướng dẫn đổi trả hàng để bắt đầu quy trình đổi trả hàng</p>
                                    <h6>3. Phương thức hoàn tiền</h6>
                                    <p>Tùy theo lí do hoàn trả sản phẩm kết quả đánh giá chất lượng tại kho, chúng tôi sẽ có những phương thức hoàn tiền với chi tiết như sau:</p>
                                    <p>- Hoàn tiền bằng mã tiền điện tử dùng để mua sản phẩm mới <br />
                                    - Đổi sản phẩm mới cùng loại <br />
                                    - Chuyển khoản qua ngân hàng theo thông tin của quý khách cung cấp <br />
                                    - Riêng đối với các đơn hàng thanh toán qua thẻ tín dụng quốc tế, chúng tôi sẽ áp dụng hình thức hoàn tiền vào tài khoản thanh toán của chủ thẻ <br />
                                    - Hoàn tiền mặt trực tiếp tại văn phòng <br />
                                    Mọi chi tiết hoặc thắc mắc quý khách vui lòng liên hệ với chúng tôi qua số điện thoại hỗ trợ hoặc để lại lời nhắn tại website. Xin chân thành cảm ơn.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="product-related-edit">
                        <h2>Sản phẩm liên quan</h2>
                        <div className="carousel-product">
                            product
                        </div>
                    </div>
                </div>
            </section>
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
                        <Link style={{ width: "50%" }} to="/cart">
                            <button style={{ width: "100%", padding: "10px", backgroundColor: "#31353d", color: "white" }}>Đi tới giỏ hàng</button>
                        </Link>
                        <Link style={{ width: "50%" }} to="/checkout">
                            <button style={{ width: "100%", padding: "10px", backgroundColor: "#f6435b", color: "white" }}>Thanh toán</button>
                        </Link>
                    </div>
                </Modal>
            )}
            {/* Modal end */}
            {/*/ End Contact */}
            <Footer />
        </div>
    )
}

export default Product_details
