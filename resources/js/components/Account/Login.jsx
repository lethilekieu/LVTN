import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Input } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            customer_id: "",
            customer_password: "",
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleEnter = this.onHandleEnter.bind(this);
    }

    onHandleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onLogin(){
        const customer={
            customer_id: this.state.customer_id,
            customer_password: this.state.customer_password
        }
        axios.post('http://127.0.0.1:8000/api/login/', customer)
        .then((res)=>{
            console.log("then: ", res);
            var objCustomer = {
                customer_id: res.data[0].customer_id,
                customer_name: res.data[0].customer_name,
                customer_email: res.data[0].customer_email,
                customer_phone: res.data[0].customer_phone,
            };
            console.log(objCustomer);
            sessionStorage.setItem('objCustomer',JSON.stringify(objCustomer));
            return this.props.history.push("/");
        }).catch((error)=>{
            console.log("catch: ", error.response);
            toast.error('Lỗi '+ error.response.data);
        });
    }

    onHandleEnter(event){
        if(event.key === "Enter"){
            this.onLogin();
        }
    }
    
    render() {
        return (
            <div className="container">
                <ToastContainer/>
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <Form className="user">
                                            <div className="form-group">
                                                <Input type="email" onChange={ this.onHandleChange } className="form-control form-control-user" name="customer_id" id="customer_id" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                            </div>
                                            <div className="form-group">
                                                <Input type="password" onChange={this.onHandleChange} onKeyDown={this.onHandleEnter} className="form-control form-control-user" name="customer_password" id="customer_password" placeholder="Password" />
                                            </div>
                                            {/* <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <Input type="checkbox" onChange={this.onHandleChange} className="custom-control-input" id="customCheck" />
                                                    <Label className="custom-control-label" htmlFor="customCheck">Remember Me</Label>
                                                </div>
                                            </div> */}
                                            <Button className="btn btn-primary btn-user btn-block" onClick={ ()=>this.onLogin() } style={{backgroundColor: "#4e73df"}}> Login </Button>
                                            <hr />
                                            {/* <Link to="index.html" className="btn btn-google btn-user btn-block"> <i className="fab fa-google fa-fw" /> Login with Google </Link>
                                            <Link to="index.html" className="btn btn-facebook btn-user btn-block"> <i className="fab fa-facebook-f fa-fw" /> Login with Facebook </Link> */}
                                        </Form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to ="forgot-password.html" className="btn btn-danger btn-block"  style={{margin: "2px"}}>Quên mật khẩu</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to ='/register' className="btn btn-success btn-block"  style={{margin: "2px"}}>Tạo một tài khoản mới</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
