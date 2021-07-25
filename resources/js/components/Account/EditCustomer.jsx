import axios from 'axios';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Input, Label } from 'reactstrap';

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id: '',
            customer_name: '',
            customer_email: '',
            customer_password: '',
            customer_phone: '',
            customer_old_password:'',
            
            isChanged: 0,
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onChangeInfo(){
        const listCustomer = this.state;
        var objCustomer = {
            customer_id: this.state.customer_id,
            customer_name: this.state.customer_name
        };
        axios.put('http://127.0.0.1:8000/api/customer/' + this.props.match.params.id, listCustomer)
        .then(res =>{
            if(res != null){
                sessionStorage.setItem('objCustomer',JSON.stringify(objCustomer));
                this.props.history.push('/');
                alert("Thay đổi thông tin tài khoản thành công")
            }
        }).catch(err =>{
            if(Array.isArray(err.response.data)){
                err.response.data.map((error) =>{
                    console.log(error);
                    toast.error('Lỗi: '+ error);
                })
            }else{
                toast.error('Lỗi: ' + err.response.data);
            }
        })
    }

    editCustomer(){
        axios.get('http://127.0.0.1:8000/api/customer/' + this.props.match.params.id)
        .then(res =>{
            this.setState({
                customer_id: res.data.customer_id,
                customer_name: res.data.customer_name,
                customer_email: res.data.customer_email,
                customer_password: res.data.customer_password,
                customer_phone: res.data.customer_phone,
            })
        })
    }

    componentWillMount(){
        this.editCustomer();
    }

    showChangePass(){
        if(this.state.isChanged == 0){
            return  <Input type="password" className="form-control form-control-user" defaultValue={ this.state.customer_password } name="customer_password" id="customer_password" readOnly/>
        }
        else{
            return  <>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Input type="password" className="form-control form-control-user" onChange={ this.onHandleChange } name="customer_password" id="customer_password" placeholder="Nhập vào mật khẩu mới" />              
                        </div>
                        <div className="col-sm-6">
                            <Input type="password" className="form-control form-control-user" onChange={ this.onHandleChange } name="customer_old_password" id="customer_old_password" placeholder="Nhập vào mật khẩu cũ" />
                        </div>
                    </>
        }
        
    }
    
    render() {
        return (
            <div className="container">
                <ToastContainer position="top-right" />
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Thay đổi thông tin tài khoản</h1>
                                    </div>
                                    <Form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } value={ this.state.customer_id } name="customer_id" id="customer_id" readOnly/>
                                            </div>
                                            <div className="col-sm-6">
                                                <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } value={ this.state.customer_name } name="customer_name" id="customer_name" placeholder="Nhập tên" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Input type="email" className="form-control form-control-user" onChange={ this.onHandleChange } value={ this.state.customer_email } name="customer_email" id="customer_email" placeholder="Nhập địa chỉ email" />
                                        </div>
                                        <div className="form-group">
                                            <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } value={ this.state.customer_phone } name="customer_phone" id="customer_phone" placeholder="Nhập vào số điện thoại" />
                                        </div>
                                        <div className="form-group">
                                            <Label check><Input onChange={ (e)=>{ this.setState({isChanged: e.target.checked}) } } type="checkbox"/>Chọn để thay đổi password</Label>
                                        </div>
                                        <div className="form-group row">
                                                {
                                                    this.showChangePass()
                                                }
                                        </div>
                                        <Button className="btn btn-primary btn-user btn-block" onClick={ ()=>this.onChangeInfo() } style={{backgroundColor: "#4e73df"}}> Thay đổi thông tin </Button>
                                        <hr />
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCustomer;