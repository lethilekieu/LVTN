import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default class ShowSupplier extends Component {
    constructor(props) {
        super(props);
        this.state ={
            supplier: []
        };
        this.loadSupplier = this.loadSupplier.bind(this);
    }

    loadSupplier(){
        axios.get('http://127.0.0.1:8000/api/supplier')
        .then(res => {
            console.log('supp: ', res);
            this.setState({
                supplier: res.data
            });
        }).catch(err => console.log(err));
    }

    componentWillMount(){
        this.loadSupplier();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/supplier/' + id)
        .then(res => {
            if(res.data != null){
                this.loadSupplier();
            }
        }).catch(err=>{
            toast.error('Không thể xóa: ' + err.response.data)
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
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Danh sách nhà cung cấp</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="Name" className="mr-sm-2">Thêm nhà cung cấp:</Label>
                                        <Link to = {"/admin/home/add-supplier/"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã nhà cung cấp</th>
                                                        <th>Tên nhà cung cấp</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã nhà cung cấp</th>
                                                        <th>Tên nhà cung cấp</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.supplier.map((item, index) =>
                                                            <tr key={ index }>
                                                                <td>{item.supplier_id}</td>
                                                                <td>{item.supplier_name}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-supplier/" + item.supplier_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={()=>this.onDelete(item.supplier_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>
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
