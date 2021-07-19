import React from 'react'

function Footer() {
    return (
        <>
  {/* Start Footer Area */}
<footer className="footer">
  {/* Footer Top */}
  <div className="footer-top section">
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-12">
          {/* Single Widget */}
          <div className="single-footer about">
            <div className="logo">
              <a href="index.html"><img src="images\logo2.png" alt="#" /></a>
            </div>
            <p className="text">Eshop sẽ mang lại cho khách hàng những trải nghiệm mua sắm thời trang hàng hiệu trực tuyến thú vị từ các thương hiệu thời trang quốc tế và trong nước, cam kết chất lượng phục vụ hàng đầu cùng với những bộ sưu tập quần áo nam nữ khổng lồ từ giày dép, trang phục</p>
            <p className="call">Gọi cho chúng tôi 24/7<span><a href="tel:0342925252">0342925252</a></span></p>
          </div>
          {/* End Single Widget */}
        </div>
        <div className="col-lg-2 col-md-6 col-12">
          {/* Single Widget */}
          <div className="single-footer links">
            <h4>Thông tin</h4>
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Điều khoản &amp; Điều kiện</a></li>
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">Trợ giúp</a></li>
            </ul>
          </div>
          {/* End Single Widget */}
        </div>
        <div className="col-lg-2 col-md-6 col-12">
          {/* Single Widget */}
          <div className="single-footer links">
            <h4>Dịch vụ khách hàng</h4>
            <ul>
              <li><a href="#">Hinh thức thanh toán</a></li>
              <li><a href="#">Hoàn tiền</a></li>
              <li><a href="#">Trả hàng</a></li>
              <li><a href="#">Giao hàng</a></li>
              <li><a href="#">Bảo mật</a></li>
            </ul>
          </div>
          {/* End Single Widget */}
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          {/* Single Widget */}
          <div className="single-footer social">
            <h4>Liên lạc</h4>
            {/* Single Widget */}
            <div className="contact">
              <ul>
                <li>Lê Văn Hiến , Đức Thắng, Bắc từ liêm , Hà Nội.</li>
                <li>Lê Văn Hiến.</li>
                <li>info@eshop.com</li>
                <li>0342925252</li>
              </ul>
            </div>
            {/* End Single Widget */}
            <ul>
              <li><a href="#"><i className="ti-facebook" /></a></li>
              <li><a href="#"><i className="ti-twitter" /></a></li>
              <li><a href="#"><i className="ti-flickr" /></a></li>
              <li><a href="#"><i className="ti-instagram" /></a></li>
            </ul>
          </div>
          {/* End Single Widget */}
        </div>
      </div>
    </div>
  </div>
  {/* End Footer Top */}
  <div className="copyright">
    <div className="container">
      <div className="inner">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="left">
              <p>Copyright © 2021 <a href="http://www.wpthemesgrid.com" target="_blank">Wpthemesgrid</a>  -  All Rights Reserved.</p>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="right">
              <img src="images\payments.png" alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
{/* /End Footer Area */}
        </>
    )
}

export default Footer
