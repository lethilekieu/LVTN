import axios from 'axios';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class ShowProductType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_type: []
        };
        this.loadProduct_type = this.loadProduct_type.bind(this);
    }

    loadProduct_type(){
        axios.get('http://127.0.0.1:8000/api/product-type/')
        .then(res=>{
            console.log('send:', res);
            this.setState({
                product_type: res.data
            });
        }).catch(err =>console.log(err));
    }

    componentWillMount(){
        this.loadProduct_type();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/product-type/' + id)
        .then(res =>{
            if(res.data != null){
                this.loadProduct_type();
            }
        })
        .catch(err => {
            toast.error('Lỗi '+ err.response.data);
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
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng loại sản phẩm</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="brandName" className="mr-sm-2">Thêm loại sản phẩm:</Label>
                                        <Link to = {"/admin/home/add-product-type/"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã loại</th>
                                                        <th>Tên loại</th>
                                                        <th>Mã dạng sản phẩm</th>
                                                        <th>Từ khóa mở rộng</th>
                                                        <th>Tên slug</th>
                                                        <th>Mô tả loại</th>
                                                        <th>Trạng thái</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã loại</th>
                                                        <th>Tên loại</th>
                                                        <th>Mã dạng sản phẩm</th>
                                                        <th>Từ khóa mở rộng</th>
                                                        <th>Tên slug</th>
                                                        <th>Mô tả loại</th>
                                                        <th>Trạng thái</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.product_type.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.product_type_id}</td>
                                                                <td>{item.product_type_name}</td>
                                                                <td>{item.categories_id}</td>
                                                                <td>{item.meta_keywords}</td>
                                                                <td>{item.product_type_slug}</td>
                                                                <td>{item.product_type_desc}</td>
                                                                <td>{item.product_type_status}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.updated_at}</td>
                                                                <td>
                                                                    <Button onClick={ () => {
                                                                        this.props.history.push({
                                                                            pathname: '/admin/home/edit-product-type/' + item.product_type_id,
                                                                            sendData: {
                                                                                product_type_id: item.product_type_id
                                                                            }
                                                                        });
                                                                    }} outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    <Button onClick={ (id)=>this.onDelete(item.product_type_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>
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
        );
    }
}

export default ShowProductType;