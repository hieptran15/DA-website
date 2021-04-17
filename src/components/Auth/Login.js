import React, { useState } from 'react'
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login_user } from '../../actions/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [visible, setVisible] = useState(false);
    const [ShowVisible, setShowVisible] = useState(false);
    const [showRegister,setShowRegister]=useState(false);
    const [getValue,setValue]=useState({
        email:"",
        password:""
    })
    const LoginState = useSelector(state => state.login)
    const{user,loading,error,token}=LoginState
    const dispatch = useDispatch();
    const handleOnchange=(e)=>{
        e.preventDefault()
        setValue({...getValue,[e.target.name]:e.target.value})
    }
    const login=(e)=>{
        e.preventDefault()
        if(getValue.email!==""&&getValue.password!==""){
            dispatch(login_user(getValue))
        }else{
            return  toast.error("điền đủ thông tin trước khi đăng nhập !")
        }
    }
    console.log(LoginState)
// modal login............
   const showModal = () => {
    setVisible(true)
      };
   const handleCancel = e => {
        setVisible(false)
      };
// modal lost password.....
    const showButton=()=>{
        setShowVisible(true)
    }
    const closeButton=()=>{
        setShowVisible(false)
    }
// modal register..........
    const showButtonRegister=()=>{
        setShowRegister(true)
        setVisible(false)
    }
    const closeRegister=()=>{
        setShowRegister(false)
    }
    if(loading==false&&!error){
        return <Redirect to={"/"}/>
    }
    return (
        <>
             {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <div className="bread-inner">
                            <ul className="bread-list">
                            <li><Link to="/">Home<i className="ti-arrow-right" /></Link></li>
                            <li className="active"><a href="#">login</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* End Breadcrumbs */}
                <ToastContainer autoClose={3000} />
                {/* {loading&&toast.success("Register success ! go to login")} */}
            <div className="edit_login">
            <form className="form_Register">
                    <h2>Login</h2>
                    <div className="form-group">
                    <div><strong style={{color: 'red',margin:"5px 5px 5px 5px"}}>{error?"email hoặc password sai...!":""}</strong></div>
                        <label>YourEmail</label>
                        <input type="email" value={getValue.email}  onChange={(e)=>handleOnchange(e)} className="form-control form-control-sm" name="email" id aria-describedby="helpId" placeholder />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" value={getValue.password}  onChange={(e)=>handleOnchange(e)} className="form-control form-control-sm" name="password" id aria-describedby="helpId" placeholder />
                    </div>
                    <div className="form-group">
    <button onClick={(e)=>login(e)} className="btn btn-primary editButton_Loading login">login {loading&&<div className="loading_edit"><img src="images/loading.gif"/></div>}</button>
                    </div>
                    <p className="edit-register">
                        <Link to="/register" onClick={()=>showButtonRegister()}>click to Register account</Link>
                    </p>
                    <p className="lost-password">
                        <a  onClick={()=>showButton()} href="#">Lost your password?</a>
                    </p>
                </form>

            <Modal header={null} visible={ShowVisible} onCancel={closeButton}footer={null}className="content_modal">
                    <div className="form-group">
                        <label>forgot password</label>
                        <input type="email" className="form-control form-control-sm" name id aria-describedby="helpId" placeholder="your email" />
                        <button>send</button>
                    </div>
            </Modal>

            </div>
        </>
    )
}

export default Login
