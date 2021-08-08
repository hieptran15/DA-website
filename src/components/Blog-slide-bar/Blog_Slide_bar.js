import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { load_param } from '../../actions/actions';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Blog_Slide_bar() {
  const { t, i18n } = useTranslation();
  const emptyComment = {
    name: '',
    email: '',
    comment: ''
  }
  const [blog, setBlog] = useState(null);
  const [commentItem, setCommentItem] = useState(emptyComment);
  const [load, setLoad] = useState(false);
  const [review, setReviews] = useState([])
  const email = JSON.parse(localStorage.getItem('email'));
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("http://localhost:8080/api/blog/get-all-blog").then((result) => {
      setBlog(result.data[0]);
      setReviews(result.data[0].reviews)
    });
    dispatch(load_param(''));

    if (email !== null) {
      const newComment = { ...commentItem };
      newComment['email'] = email;
      setCommentItem(newComment);
    } else {
      const newComment = { ...commentItem };
      newComment['email'] = '';
      setCommentItem(newComment);
    }
  }, [load]);

  const dateFormat = (date) => {
    const dateInput = new Date(date);
    const dateStringOutPut = dateInput.getFullYear() + '-' +
      ('0' + (dateInput.getMonth() + 1)).slice(-2) + '-' +
      ('0' + dateInput.getDate()).slice(-2) + ' ' +
      ('0' + dateInput.getHours()).slice(-2) + ':' +
      ('0' + dateInput.getMinutes()).slice(-2) + ':' +
      ('0' + dateInput.getSeconds()).slice(-2)
    return dateStringOutPut
  };

  const onChangeInput = (e, name) => {
    const val = e.target.value;
    const newComment = { ...commentItem };
    newComment[`${name}`] = val;
    setCommentItem(newComment);
  }

  const addComment = (e) => {
    e.preventDefault()
    try {
      Axios.post(`http://localhost:8080/api/blog/${blog._id}/reviews`, commentItem).then(res => {
        setCommentItem(emptyComment);
        setLoad(!load)
      })
    } catch (error) {
      console.log(error);
    }
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
                  <li className="active"><a href="blog-single.html">Blog</a></li>
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
                      <img src={blog ? blog.img_url : ''} alt="#" />
                    </div>
                    <div className="blog-detail">
                      <h2 className="blog-title">{blog ? blog.title : ''}</h2>
                      <div className="blog-meta">
                        <span className="author"><a ><i className="fa fa-user" />Admin</a><a ><i className="fa fa-calendar" />{blog ? dateFormat(blog.createdAt) : ''}</a><a ><i className="fa fa-comments" />{t('news.comment')}({blog ? blog.reviews.length : 0})</a></span>
                      </div>
                      <div className="content">
                        {/* <p>What a crazy time. I have five children in colleghigh school graduates.jpge or pursing post graduate studies  Each of my children attends college far from home, the closest of which is more than 800 miles away. While I miss being with my older children, I know that a college experience can be the source of great growth and experience can be the source of source of great growth and can provide them with even greater in future.</p>
                        <blockquote> <i className="fa fa-quote-left" /> Do what you love to do and give it your very best. Whether it's business or baseball, or the theater, or any field. If you don't love what you're doing and you can't give it your best, get out of it. Life is too short. You'll be an old man before you know it. risus. Ut tincidunt, erat eget feugiat eleifend, eros magna dapibus diam.</blockquote>
                        <p>What a crazy time. I have five children in colleghigh school graduates.jpge or pursing post graduate studies  Each of my children attends college far from home, the closest of which is more than 800 miles away. While I miss being with my older children, I know that a college experience can be the source of great growth and experience can be the source of source of great growth and can provide them with even greater in future.</p>
                        <p>What a crazy time. I have five children in colleghigh school graduates.jpge or pursing post graduate studies  Each of my children attends college far from home, the closest of which is more than 800 miles away. While I miss being with my older children, I know that a college experience can be the source of great growth and experience can be the source of source of great growth and can provide them with even greater in future.</p> */}
                        {blog ? parse(blog.description) : ''}
                      </div>
                    </div>
                    <div className="share-social">
                      <div className="row">
                        <div className="col-12">
                          <div className="content-tags">
                            {/* <h4>Tags:</h4>
                            <ul className="tag-inner">
                              <li><a href="#">Glass</a></li>
                              <li><a href="#">Pant</a></li>
                              <li><a href="#">t-shirt</a></li>
                              <li><a href="#">swater</a></li>
                            </ul> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="comments">
                      <h3 className="comment-title">{t('news.comment')} ({blog ? blog.reviews.length : 0})</h3>
                      {/* Single Comment */}
                      {review.length !== 0 ? review.map((value, key) => {
                        return (
                          <div key={value._id} className="single-comment">
                            <img src="./images/logoDefault.jpg" alt="#" />
                            <div className="content">
                              <h4>{value.name} <span>{dateFormat(value.createdAt)}</span></h4>
                              <p>{value.comment}</p>
                              {/* <div className="button">
                            <a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true" />Reply</a>
                          </div> */}
                            </div>
                          </div>
                        )
                      }) : <p>Không có bình luận nào</p>}

                      {/* End Single Comment */}
                      {/* Single Comment */}
                      {/* <div className="single-comment left">
                        <img src="images\comment2.jpg" alt="#" />
                        <div className="content">
                          <h4>john deo <span>Feb 28, 2018 at 8:59 pm</span></h4>
                          <p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
                          <div className="button">
                            <a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true" />Reply</a>
                          </div>
                        </div>
                      </div> */}
                      {/* End Single Comment */}
                      {/* Single Comment */}
                      {/* <div className="single-comment">
                        <img src="images\comment3.jpg" alt="#" />
                        <div className="content">
                          <h4>megan mart <span>Feb 28, 2018 at 8:59 pm</span></h4>
                          <p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
                          <div className="button">
                            <a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true" />Reply</a>
                          </div>
                        </div>
                      </div> */}
                      {/* End Single Comment */}
                    </div>
                  </div>
                  <div className="col-12">
                    {email !== null ? (
                      <div className="reply">
                        <div className="reply-head">
                          <h2 className="reply-title">{t('news.leaveAComment')}</h2>
                          {/* Comment Form */}
                          <form className="form">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label>{t('checkout.name')}<span>*</span></label>
                                  <input style={{outline: 'none'}} type="text" name="name" onChange={(e) => onChangeInput(e, 'name')} placeholder required="required" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label>Email<span>*</span></label>
                                  <input style={{outline: 'none'}} type="email" name="email" value={commentItem.email} onChange={(e) => onChangeInput(e, 'email')} placeholder required="required" />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label>{t('contact.message')}<span>*</span></label>
                                  <textarea style={{outline: 'none'}} name="comment" onChange={(e) => onChangeInput(e, 'comment')} placeholder defaultValue={""} />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group button">
                                  <button onClick={(e) => addComment(e)} className="btn">{t('news.postComment')}</button>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* End Comment Form */}
                        </div>
                      </div>
                    ) : <div><Link style={{ fontWeight: "bold" }} to="/login">Đăng nhập</Link> để bình luận Tin tức.</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="main-sidebar">
                {/* Single Widget */}
                <div className="single-widget search">
                  <div className="form">
                    <input type="email" placeholder="Tìm kiếm..." />
                    <a className="button" href="#"><i className="fa fa-search" /></a>
                  </div>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget category">
                  <h3 className="title">{t('news.category')}</h3>
                  <ul className="categor-list">
                    <li><a href="#">Thời Trang Nam 2020</a></li>
                    <li><a href="#">Thời Trang Nam 2020</a></li>
                    <li><a href="#">Thời Trang Nam 2020</a></li>
                    <li><a href="#">Thời Trang Nam 2020</a></li>
                  </ul>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget recent-post">
                  <h3 className="title">{t('news.thisPost')}</h3>
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="images\modal1.png" alt="#" />
                    </div>
                    <div className="content">
                      <h5><a href="#">Top 10 mẫu sơ mi nam đẹp nhất</a></h5>
                      <ul className="comment">
                        <li><i className="fa fa-calendar" aria-hidden="true" />22/12/2020</li>
                        <li><i className="fa fa-commenting-o" aria-hidden="true" />35</li>
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
                  <h3 className="title">{t('news.tag')}</h3>
                  <ul className="tag">
                    <li><a href="#">Ecommerce</a></li>
                  </ul>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                {/* <div className="single-widget newsletter">
                  <h3 className="title">Newslatter</h3>
                  <div className="letter-inner">
                    <h4>Subscribe &amp; get news <br /> latest updates.</h4>
                    <div className="form-inner">
                      <input type="email" placeholder="Enter your email" />
                      <a href="#">Submit</a>
                    </div>
                  </div>
                </div> */}
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
