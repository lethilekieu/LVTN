import axios from 'axios';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

class EditAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_name: "",
            admin_email: "",
            admin_phone: "",
            admin_password: "",
            grant: "",
            admin_old_pass:'',

            isChanged: 0,
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editAdmin(){
        axios.get('http://127.0.0.1:8000/api/Admin/' + this.props.match.params.id)
        .then(res =>{
            this.setState({
                admin_id : res.data.admin_id,
                admin_name : res.data.admin_name,
                admin_email : res.data.admin_email,
                admin_phone : res.data.admin_phone,
                admin_password : res.data.admin_password,
                grant: res.data.grant,
            });
        })
    }

    onChangeInfo(){
        const listAdmin = this.state;
        var objAdmin = {
            admin_id: this.state.admin_id,
            admin_name: this.state.admin_name,
            grant: this.state.grant,
        };
        axios.put('http://127.0.0.1:8000/api/Admin/' + this.props.match.params.id, listAdmin)
        .then(res =>{
            if(res != null){
                sessionStorage.setItem('objAdmin',JSON.stringify(objAdmin));
                this.props.history.push('/admin/home/');
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

    componentWillMount(){
        this.editAdmin();
    }

    showChangePass(){
        if(this.state.isChanged == 0){
            return  <Input type="password" className="form-control form-control-user" defaultValue={ this.state.admin_password } name="admin_password" id="admin_password" readOnly/>
        }
        else{
            return  <>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Input type="password" className="form-control form-control-user" onChange={ this.onHandleChange } name="admin_password" id="admin_password" placeholder="Nhập vào mật khẩu mới" />              
                        </div>
                        <div className="col-sm-6">
                            <Input type="password" className="form-control form-control-user" onChange={ this.onHandleChange } name="admin_old_pass" id="admin_old_pass" placeholder="Nhập vào mật khẩu cũ" />
                        </div>
                    </>
        }
        
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
                                        <Label for="admin_name" className="mr-sm-2">Tên nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.admin_name} name="admin_name" id="admin_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="admin_email" className="mr-sm-2">Email nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.admin_email} name="admin_email" id="admin_email" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="admin_phone" className="mr-sm-2">Số điện thoại nhân viên</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.admin_phone} name="admin_phone" id="admin_phone" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label check><Input onChange={ (e)=>{ this.setState({isChanged: e.target.checked}) } } type="checkbox"/>Chọn để thay đổi password</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            this.showChangePass()
                                        }
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onChangeInfo() }>Thay đổi thông tin tài khoản</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditAdmin;