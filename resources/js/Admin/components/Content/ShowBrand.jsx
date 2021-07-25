import axios from 'axios';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class ShowBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: [],
        };
        this.loadBrand = this.loadBrand.bind(this);
    }

    loadBrand(){
        axios.get('http://127.0.0.1:8000/api/brand/')
        .then(res=>{
            console.log('brand:', res);
            this.setState({
                brand: res.data
            },
                // ()=>{
                //     console.log('t: ', this.state.brand);
                // }
            );
        }).catch(err =>console.log(err));
        // console.log('n: ', this.state.brand);
    }

    componentDidMount(){
        this.loadBrand();
    }
    
    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/brand/' + id)
        .then(res =>{
            if(res.data != null){
                this.loadBrand();
            }
        })
        .catch(err => {
            if(Array.isArray(err.response.data)){
                err.response.data.map((error) => {
                    console.log(error);
                    // alert(error);
                    toast.error('Lỗi '+ error);
                })
            } else {
                toast.error('Lỗi '+ err.response.data);
            }
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
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng thương hiệu</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="brandName" className="mr-sm-2">Thêm thương hiệu:</Label>
                                        <Link to = {"/admin/home/add-brand"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã thương hiệu</th>
                                                        <th>Tên thương hiệu</th>
                                                        <th>Tên slug thương hiệu</th>
                                                        <th>Mô tả thương hiệu</th>
                                                        <th>Trạng thái thương hiệu</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã thương hiệu</th>
                                                        <th>Tên thương hiệu</th>
                                                        <th>Tên slug thương hiệu</th>
                                                        <th>Mô tả thương hiệu</th>
                                                        <th>Trạng thái thương hiệu</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.brand.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.brand_id}</td>
                                                                <td>{item.brand_name}</td>
                                                                <td>{item.brand_slug}</td>
                                                                <td>{item.brand_desc}</td>
                                                                <td>{item.brand_status}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    {/* <Link to = {"/admin/home/edit-brand/" + item.brand_slug}> */}
                                                                        <Button onClick={ () => {
                                                                            this.props.history.push({
                                                                                pathname: '/admin/home/edit-brand/' + item.brand_slug,
                                                                                sendData: {
                                                                                    brand_id: item.brand_id
                                                                                }
                                                                            });
                                                                        }} outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    {/* </Link> */}
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.brand_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>
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

export default ShowBrand;