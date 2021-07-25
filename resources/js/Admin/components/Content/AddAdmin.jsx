import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_name: "",
            admin_email: "",
            admin_phone: "",
            admin_password: "",
            grant: 0,
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }
    
    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(){
        console.warn('send:', this.state);
        const listAccountAdmin = {
            admin_name : this.state.admin_name,
            admin_email : this.state.admin_email,
            admin_phone : this.state.admin_phone,
            admin_password : this.state.admin_password,
            grant : this.state.grant,
        }
        axios.post('http://127.0.0.1:8000/api/Admin/', listAccountAdmin)
        .then(res => {
            if(res != null){
                return this.props.history.push('/admin/home/admin');
            }
        })
        .catch(err => {
            err.response.data.map((error) => {
                console.log(error);
                toast.error('Lỗi '+ error);
            })
        })
    }
    render() {
        return (
            <div id="page-top">
                <ToastContainer position="top-right" />
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandName" className="mr-sm-2">Tên nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="admin_name" id="admin_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Email nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="admin_email" id="admin_email" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandDesc" className="mr-sm-2">Số điện thoại nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="admin_phone" id="admin_phone" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandDesc" className="mr-sm-2">Mật khẩu nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="admin_password" id="admin_password" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandStatus" className="mr-sm-2">Quyền truy cập</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } name="brand_status" id="brand_status" /> */}
                                        <Input type="select" value={this.state.brand_status} onChange={ this.onHandleChange } name="brand_status" id="brand_status" >
                                            <option defaultValue={0}>Nhân viên</option>
                                            <option value={1}>Quản lý cấp cao</option>
                                        </Input>
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}
