import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'

export default class ShowAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
        };
        this.loadAdmin = this.loadAdmin.bind(this);
    }

    loadAdmin(){
        axios.get('http://127.0.0.1:8000/api/Admin/')
        .then(res=>{
            this.setState({
                admin: res.data
            },
            );
        }).catch(err =>console.log(err));
    }

    componentDidMount(){
        this.loadAdmin();
    }
    
    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/Admin/' + id)
        .then(res =>{
            if(res.data != null){
                this.loadAdmin();
            }
        })
        .catch(err => {
            toast.error('Lỗi '+ err.response.data);
        })
    }

    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng tài khoản nhân viên</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="brandName" className="mr-sm-2">Thêm nhân viên:</Label>
                                        <Link to = {"/admin/home/add-admin/"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã tài khoản nhân viên</th>
                                                        <th>Tên nhân viên</th>
                                                        <th>Email nhân viên</th>
                                                        <th>Số điện thoại nhân viên</th>
                                                        <th>Phân quyền</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã tài khoản nhân viên</th>
                                                        <th>Tên nhân viên</th>
                                                        <th>Email nhân viên</th>
                                                        <th>Số điện thoại nhân viên</th>
                                                        <th>Phân quyền</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        // "categories_id":1,"categories_name":"\u00c1o","created_at":null,"update_at":null
                                                        this.state.admin.map((item, index) => 
                                                            // <div key={ index }>
                                                            //     <p>
                                                            //         categories_id: {item.categories_id}<br />
                                                            //         categories_name: {item.categories_name}<br/>
                                                            //     </p>    
                                                            //     <br/>              
                                                            //     <br/>                
                                                            // </div>
                                                            <tr key={ index }>
                                                                <td>{item.admin_id}</td>
                                                                <td>{item.admin_name}</td>
                                                                <td>{item.admin_email}</td>
                                                                <td>{item.admin_phone}</td>
                                                                <td>{item.grant}</td>
                                                                <td>
                                                                    <Button onClick={ (id)=>this.onDelete(item.customer_id) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}
