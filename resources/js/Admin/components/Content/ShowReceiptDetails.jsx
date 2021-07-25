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

class ShowReceiptDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            receipt_details: [],
            products: [],
            filter_text:"",
        };
        this.loadReceiptDetails = this.loadReceiptDetails.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadReceiptDetails(){
        axios.get('http://127.0.0.1:8000/api/receipt-details/')
        .then(res => {
            this.setState({
                receipt_details: res.data
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
        this.loadReceiptDetails();
        this.loadProduct();
    }

    onDelete(id, product_id, receipt_id, receipt_quantity, receipt_price){
        axios.delete('http://127.0.0.1:8000/api/receipt-details/' + id)
        .then(res => {
            if(res.data != null){
                // const data = {
                //     product_id: product_id,
                //     receipt_id: receipt_id,
                //     total_money: receipt_quantity * receipt_price,
                //     action: 3
                // }
                // axios.put('http://127.0.0.1:8000/api/receipt_upd_bill/' + receipt_id, data)
                // .then(res =>{
                    
                // })
                this.loadReceiptDetails();
            }
        })
    }
    render() {
        const columns = [
            {
                name: 'Mã phiếu nhập',
                selector: 'receipt_id',
                sortable: true,
            },
            {
                name: 'Mã chi tiết phiếu nhập',
                selector: 'receipt_details_id',
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
                        {this.state.products.map((item, index) => <div key={index}> {item.product_id == row.product_id && item.product_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Số lượng nhập',
                selector: 'receipt_quantity',
                sortable: true,
                right: true,
            },
            {
                name: 'Giá sản phẩm nhập vào',
                selector: 'receipt_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày thêm',
                selector: 'created_at',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày cập nhật',
                selector: 'updated_at',
                sortable: true,
                right: true,
            },
            {
                cell: row => <Button onClick={ () => {
                                this.props.history.push({
                                    pathname: '/admin/home/edit-receipt-details/' + row.receipt_details_id,
                                    sendData: {
                                        receipt_details_id: row.receipt_details_id
                                    }
                                });
                            }} outline color="info" style={{margin: "10px"}}>Sửa</Button>,
                button: true,
            },
            {
                cell: row => <Button onClick={ (id)=>this.onDelete(row.receipt_details_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>,
                button: true,
            }
        ];
        var filter_receipt= this.state.filter_text == "" ? this.state.receipt_details : this.state.receipt_details.filter(item => item.receipt_id && item.receipt_id == this.state.filter_text);
        const FilterComponent = () => (
            <>
                <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" name="filter_text" value = {this.state.filter_text} onChange={this.onHandleChange} className="form-control bg-light border-0 small" placeholder="Mã phiếu nhập cần tìm" aria-label="Search" aria-describedby="basic-addon2" />
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
                                <Label for="Name" className="mr-sm-2">Thêm chi tiết phiếu nhập:</Label>
                                <Link to = {"/admin/home/add-receipt-details/"}>
                                    <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                </Link>
                                <DataTable
                                    title="Danh sách chi tiết phiếu nhập"
                                    columns={columns}
                                    data={ filter_receipt }
                                    pagination
                                    subHeader
                                    subHeaderComponent={FilterComponent(this.state.receipts)}
                                    // paginationPerPage={1}
                                />
                                {/* <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng chi tiết phiếu nhập</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã chi tiết phiếu nhập</th>
                                                        <th>Mã phiếu nhập</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Số lượng nhập</th>
                                                        <th>Giá sản phẩm nhập vào</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã chi tiết phiếu nhập</th>
                                                        <th>Mã phiếu nhập</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Số lượng nhập</th>
                                                        <th>Giá sản phẩm nhập vào</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.receipt_details.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.receipt_details_id}</td>
                                                                <td>{item.receipt_id}</td>
                                                                <td>{this.state.products.map((itemPro, index) => <div key={ index }>{itemPro.product_id == item.product_id && itemPro.product_name}</div>)}</td>
                                                                <td>{item.receipt_quantity}</td>
                                                                <td>{item.receipt_price}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.updated_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-receipt-details/" + item.receipt_details_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.receipt_details_id, item.product_id, item.receipt_id, item.receipt_quantity, item.receipt_price) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>   */}
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowReceiptDetails;