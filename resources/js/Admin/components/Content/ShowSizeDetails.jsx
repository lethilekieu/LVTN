import axios from 'axios';
import { Button, Form, Label } from 'reactstrap';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShowSizeDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            size: [],
            size_details: [],
            products: [],

            filter_text: "",
        };
        this.loadSizeDetails = this.loadSizeDetails.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadSizeDetails(){
        axios.get('http://127.0.0.1:8000/api/size-details/')
        .then(res => {
            this.setState({
                size_details: res.data
            });
        })
        .catch( err => console.log(err) );
    }
    loadSize(){
        axios.get('http://127.0.0.1:8000/api/size/')
        .then(res => {
            this.setState({
                size: res.data
            });
        })
        .catch( err => console.log(err) );
    }
    loadProduct(){
        axios.get('http://127.0.0.1:8000/api/product/')
        .then(res => {
            console.log(res);
            this.setState({
                products: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadSizeDetails();
        this.loadSize();
        this.loadProduct();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/size-details/' + id)
        .then(res => {
            if(res.data != null){
                this.loadSizeDetails();
            }
        })
    }
    render() {
        const columns = [
            {
                name: 'Mã size',
                selector: 'size_id',
                sortable: true,
                cell: row => (
                    <>
                        {this.state.size.map((item, index) => <div key={index}> {item.size_id == row.size_id && row.size_id + " - " + item.size_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Mã chi tiết kích cỡ',
                selector: 'size_detail_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Mã sản phẩm',
                selector: 'product_id',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {this.state.products.map((item, index) => <div key={index}> {item.product_id == row.product_id && row.product_id + " - " + item.product_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Ngày thêm',
                selector: 'create_at',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày cập nhật',
                selector: 'update_at',
                sortable: true,
                right: true,
            },
            {
                cell: row => <Button onClick={ () => {
                                this.props.history.push({
                                    pathname: '/admin/home/edit-size-details/' + row.size_detail_id,
                                    sendData: {
                                        size_detail_id: row.size_detail_id
                                    }
                                });
                            }} outline color="info" style={{margin: "10px"}}>Sửa</Button>,
                button: true,
            },
            {
                cell: row => <Button onClick={ (id)=>this.onDelete(row.size_detail_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>,
                button: true,
            }
        ];
        var filter_size_details = this.state.filter_text == "" ? this.state.size_details : this.state.size_details.filter(item => item.product_id && item.product_id == this.state.filter_text);
        const FilterComponent = () => (
            <>
                <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" name="filter_text" value = {this.state.filter_text} onChange={this.onHandleChange} className="form-control bg-light border-0 small" placeholder="Mã sản phẩm cần tìm size" aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <Button className="btn btn-primary" onClick={ () => this.setState({filter_text: ""})} type="button">
                                <FontAwesomeIcon icon={ faTrash } size="sm"/>
                            </Button>
                        </div>
                    </div>
                </Form>
            </>
        );
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <Label for="Name" className="mr-sm-2">Thêm kích cỡ sản phẩm:</Label>
                                <Link to = {"/admin/home/add-size-details/"}>
                                    <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                </Link>
                                <DataTable
                                    title="Danh sách kích cỡ sản phẩm"
                                    columns={columns}
                                    data={ filter_size_details }
                                    pagination
                                    subHeader
                                    subHeaderComponent={FilterComponent(this.state.size_details)}
                                />
                                {/* <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng chi tiết size</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã kích cỡ sản phẩm</th>
                                                        <th>Mã size</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã kích cỡ sản phẩm</th>
                                                        <th>Mã size</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.size_details.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.size_detail_id}</td>
                                                                <td>{item.size_id}</td>
                                                                <td>{item.product_id}</td>
                                                                <td>{item.create_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-size-details/" + item.size_detail_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    <Button onClick={ (id)=>this.onDelete(item.size_detail_id) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>   */}
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng size</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã size</th>
                                                        <th>Tên size</th>
                                                        <th>Mô tả</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã chi tiết màu</th>
                                                        <th>Mã màu</th>
                                                        <th>Mã sản phẩm</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.size.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.size_id}</td>
                                                                <td>{item.size_name}</td>
                                                                <td>{item.size_desc}</td>
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

export default ShowSizeDetails;