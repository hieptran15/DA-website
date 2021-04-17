import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useSelector,useDispatch } from 'react-redux';
import { registers } from '../../actions/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';
function Register(props) {
    const [getValue,setValue]=useState({
        name:"",
        email:"",
        password:""
    })
    const RegisterState = useSelector(state => state.register)
    const{user,loading,error,status}=RegisterState
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/login';
    const handleOnchange=(e)=>{
        e.preventDefault();
        setValue({...getValue,[e.target.name]:e.target.value})
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //          if (user) {
    //         props.history.push(redirect)
    //     }
    //     }, 3000);
    // }, [user])
    const submibRegister= (v)=>{
        v.preventDefault();
        console.log(getValue)
        if(getValue.name!== "" && getValue.email!=="" && getValue.password !== ""){
            dispatch (registers(getValue))
        }else{
            return  toast.error("điền đủ thông tin trước khi đăng kí !")
        }
        // setValue({name:"",email:"",password:""})
    }
    console.log(RegisterState)
            //  if(status===200){
            // return <Redirect to={"/login"} />
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
                <div className="edit_login">
                
            <form className="form_login">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" onChange={(e)=>handleOnchange(e)} value={getValue.name} className="form-control form-control-sm" name="name" id="name"  placeholder="username" />
                    </div>
                    <div className="form-group">
                        <div><strong style={{color: 'red',margin:"5px 5px 5px 5px"}}>{error?"email đã được đăng kí vui lòng chọn email khác...!":''}</strong></div>
                        <label>Email</label>
                        <input type="email" onChange={(e)=>handleOnchange(e)} value={getValue.email} className="form-control form-control-sm" name="email" id="email"  placeholder="your email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e)=>handleOnchange(e)} value={getValue.password} className="form-control form-control-sm" name="password" id="password"  placeholder="password" />
                    </div>
                    <div className="form-group">
                        <button onClick={(v)=>submibRegister(v)} className="btn btn-primary editButton_Loading">Register {loading &&<div className="loading_edit"><img src="images/loading.gif"/></div>}</button>
                    </div>
                    <div className="form-group">
                        <p><Link to="/login">already is account?</Link></p>
                    </div>
                </form>
            </div>
            <div style={{margin:"5px 5px 5px 5px"}}>
                <ToastContainer autoClose={3000} />
                {loading&&toast.success("Register success ! go to login")}
            </div>
        </>
    )
}

export default Register
