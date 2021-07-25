import axios from 'axios';
import { Button, Label } from 'reactstrap';
import React, { Component } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default class ShowCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            categories: []
        };
        this.loadCategories = this.loadCategories.bind(this);
        // this.onDelete = this.onDelete.bind(this);
    }

    loadCategories(){
        // 100 200 -> then
        // 300 400 500 -> catch err -> err.response.data (noi loi tu be api)
        axios.get('http://127.0.0.1:8000/api/categories/')
        .then(res => {
            console.log('categories: ', res);
            this.setState({
                categories: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadCategories();
    }

    onDelete(id){
        console.warn('delete: ', id);
        axios.delete('http://127.0.0.1:8000/api/categories/' + id)
        .then(res => {
            if(res.data != null){
                this.loadCategories();
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
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng danh mục</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="Name" className="mr-sm-2">Thêm danh mục:</Label>
                                        <Link to = {"/admin/home/add-categories/"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã danh mục</th>
                                                        <th>Tên danh mục</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã danh mục</th>
                                                        <th>Tên danh mục</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        // "categories_id":1,"categories_name":"\u00c1o","created_at":null,"update_at":null
                                                        this.state.categories.map((item, index) => 
                                                            // <div key={ index }>
                                                            //     <p>
                                                            //         categories_id: {item.categories_id}<br />
                                                            //         categories_name: {item.categories_name}<br/>
                                                            //     </p>    
                                                            //     <br/>              
                                                            //     <br/>                
                                                            // </div>
                                                            <tr key={ index }>
                                                                <td>{item.categories_id}</td>
                                                                <td>{item.categories_name}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-categories/" + item.categories_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.categories_id) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
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
