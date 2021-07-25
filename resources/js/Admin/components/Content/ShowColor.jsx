import axios from 'axios';
import { Button, Label } from 'reactstrap';
import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ShowColor extends Component {
    constructor(props) {
        super(props);
        this.state={
            colors: []
        };
        this.loadColors = this.loadColors.bind(this);
    }

    loadColors(){
        axios.get('http://127.0.0.1:8000/api/color/')
        .then(res => {
            console.log('color: ', res);
            this.setState({
                colors: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadColors();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/color/' + id)
        .then(res => {
            if(res.data != null){
                this.loadColors();
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
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng màu</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="brandName" className="mr-sm-2">Thêm màu:</Label>
                                        <Link to = {"/admin/home/add-color/"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã màu</th>
                                                        <th>Tên màu</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã màu</th>
                                                        <th>Tên màu</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.colors.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.color_id}</td>
                                                                <td>{item.color_name}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-color/" + item.color_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.color_id) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
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

export default ShowColor;