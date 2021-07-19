import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { load_param } from '../../actions/actions';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function Blog_Slide_bar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_param(''))
  }, [])
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li><a href="index1.html">Home<i className="ti-arrow-right" /></a></li>
                  <li className="active"><a href="blog-single.html">Blog Single Sidebar</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumbs */}
      {/* Start Blog Single */}
      <section className="blog-single section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="blog-single-main">
                <div className="row">
                  <div className="col-12">
                    <div className="image">
                      <img src="images\blog-single1.jpg" alt="#" />
                    </div>
                    <div className="blog-detail">
                      <h2 className="blog-title">What are the secrets to start- up success?</h2>
                      <div className="blog-meta">
                        <span className="author"><a href="#"><i className="fa fa-user" />By Admin</a><a href="#"><i className="fa fa-calendar" />Dec 24, 2018</a><a href="#"><i className="fa fa-comments" />Comment (15)</a></span>
                      </div>
                      <div className="content">
                        <p>What a crazy time. I have five children in colleghigh school graduates.jpge or pursing post graduate studies  Each of my children attends college far from home, the closest of which is more than 800 miles away. While I miss being with my older children, I know that a college experience can be the source of great growth and experience can be the source of source of great growth and can provide them with even greater in future.</p>
                        <blockquote> <i className="fa fa-quote-left" /> Do what you love to do and give it your very best. Whether it's business or baseball, or the theater, or any field. If you don't love what you're doing and you can't give it your best, get out of it. Life is too short. You'll be an old man before you know it. risus. Ut tincidunt, erat eget feugiat eleifend, eros magna dapibus diam.</blockquote>
                        <p>What a crazy time. I have five children in colleghigh school graduates.jpge or pursing post graduate studies  Each of my children attends college far from home, the closest of which is more than 800 miles away. While I miss being with my older children, I know that a college experience can be the source of great growth and experience can be the source of source of great growth and can provide them with even greater in future.</p>
                        <p>What a crazy time. I have five children in colleghigh school graduates.jpge or pursing post graduate studies  Each of my children attends college far from home, the closest of which is more than 800 miles away. While I miss being with my older children, I know that a college experience can be the source of great growth and experience can be the source of source of great growth and can provide them with even greater in future.</p>
                      </div>
                    </div>
                    <div className="share-social">
                      <div className="row">
                        <div className="col-12">
                          <div className="content-tags">
                            <h4>Tags:</h4>
                            <ul className="tag-inner">
                              <li><a href="#">Glass</a></li>
                              <li><a href="#">Pant</a></li>
                              <li><a href="#">t-shirt</a></li>
                              <li><a href="#">swater</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="comments">
                      <h3 className="comment-title">Comments (3)</h3>
                      {/* Single Comment */}
                      <div className="single-comment">
                        <img src="images\comment1.jpg" alt="#" />
                        <div className="content">
                          <h4>Alisa harm <span>At 8:59 pm On Feb 28, 2018</span></h4>
                          <p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
                          <div className="button">
                            <a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true" />Reply</a>
                          </div>
                        </div>
                      </div>
                      {/* End Single Comment */}
                      {/* Single Comment */}
                      <div className="single-comment left">
                        <img src="images\comment2.jpg" alt="#" />
                        <div className="content">
                          <h4>john deo <span>Feb 28, 2018 at 8:59 pm</span></h4>
                          <p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
                          <div className="button">
                            <a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true" />Reply</a>
                          </div>
                        </div>
                      </div>
                      {/* End Single Comment */}
                      {/* Single Comment */}
                      <div className="single-comment">
                        <img src="images\comment3.jpg" alt="#" />
                        <div className="content">
                          <h4>megan mart <span>Feb 28, 2018 at 8:59 pm</span></h4>
                          <p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
                          <div className="button">
                            <a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true" />Reply</a>
                          </div>
                        </div>
                      </div>
                      {/* End Single Comment */}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="reply">
                      <div className="reply-head">
                        <h2 className="reply-title">Leave a Comment</h2>
                        {/* Comment Form */}
                        <form className="form" action="#">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                              <div className="form-group">
                                <label>Your Name<span>*</span></label>
                                <input type="text" name="name" placeholder required="required" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                              <div className="form-group">
                                <label>Your Email<span>*</span></label>
                                <input type="email" name="email" placeholder required="required" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label>Your Message<span>*</span></label>
                                <textarea name="message" placeholder defaultValue={""} />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group button">
                                <button type="submit" className="btn">Post comment</button>
                              </div>
                            </div>
                          </div>
                        </form>
                        {/* End Comment Form */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="main-sidebar">
                {/* Single Widget */}
                <div className="single-widget search">
                  <div className="form">
                    <input type="email" placeholder="Search Here..." />
                    <a className="button" href="#"><i className="fa fa-search" /></a>
                  </div>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget category">
                  <h3 className="title">Blog Categories</h3>
                  <ul className="categor-list">
                    <li><a href="#">Men's Apparel</a></li>
                    <li><a href="#">Women's Apparel</a></li>
                    <li><a href="#">Bags Collection</a></li>
                    <li><a href="#">Accessories</a></li>
                    <li><a href="#">Sun Glasses</a></li>
                  </ul>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget recent-post">
                  <h3 className="title">Recent post</h3>
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="images\modal1.png" alt="#" />
                    </div>
                    <div className="content">
                      <h5><a href="#">Top 10 Beautyful Women Dress in the world</a></h5>
                      <ul className="comment">
                        <li><i className="fa fa-calendar" aria-hidden="true" />Jan 11, 2020</li>
                        <li><i className="fa fa-commenting-o" aria-hidden="true" />35</li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Post */}
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="images\modal2.png" alt="#" />
                    </div>
                    <div className="content">
                      <h5><a href="#">Top 10 Beautyful Women Dress in the world</a></h5>
                      <ul className="comment">
                        <li><i className="fa fa-calendar" aria-hidden="true" />Mar 05, 2019</li>
                        <li><i className="fa fa-commenting-o" aria-hidden="true" />59</li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Post */}
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="images\modal3.png" alt="#" />
                    </div>
                    <div className="content">
                      <h5><a href="#">Top 10 Beautyful Women Dress in the world</a></h5>
                      <ul className="comment">
                        <li><i className="fa fa-calendar" aria-hidden="true" />June 09, 2019</li>
                        <li><i className="fa fa-commenting-o" aria-hidden="true" />44</li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Post */}
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget side-tags">
                  <h3 className="title">Tags</h3>
                  <ul className="tag">
                    <li><a href="#">business</a></li>
                    <li><a href="#">wordpress</a></li>
                    <li><a href="#">html</a></li>
                    <li><a href="#">multipurpose</a></li>
                    <li><a href="#">education</a></li>
                    <li><a href="#">template</a></li>
                    <li><a href="#">Ecommerce</a></li>
                  </ul>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget newsletter">
                  <h3 className="title">Newslatter</h3>
                  <div className="letter-inner">
                    <h4>Subscribe &amp; get news <br /> latest updates.</h4>
                    <div className="form-inner">
                      <input type="email" placeholder="Enter your email" />
                      <a href="#">Submit</a>
                    </div>
                  </div>
                </div>
                {/*/ End Single Widget */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End Blog Single */}
    </div>
  )
}

export default Blog_Slide_bar
