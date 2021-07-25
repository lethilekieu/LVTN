import axios from 'axios';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Button, Form, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShowReceipt extends Component {
    constructor(props) {
        super(props);
        this.state={
            receipts: [],
            suppliers:[],
            filter_text:"",
        };
        this.loadReceipts = this.loadReceipts.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadReceipts(){
        axios.get('http://127.0.0.1:8000/api/receipt/')
        .then(res => {
            this.setState({
                receipts: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    loadSupplier(){
        axios.get('http://127.0.0.1:8000/api/supplier/')
        .then(res => {
            this.setState({
                suppliers: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadReceipts();
        this.loadSupplier();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/receipt/' + id)
        .then(res => {
            if(res.data != null){
                this.loadReceipts();
            }
        })
        .catch(err => {
            toast.error('Lỗi '+ err.response.data);
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
                name: 'Mã nhà cung cấp',
                selector: 'supplier_id',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {this.state.suppliers.map((item, index) => <div key={index}>{item.supplier_id == row.supplier_id && row.supplier_id + " - " + item.supplier_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Tổng tiền nhập',
                selector: 'bill_total',
                sortable: true,
                right: true,
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
                                    pathname: '/admin/home/edit-receipt/' + row.receipt_id,
                                    sendData: {
                                        receipt_id: row.receipt_id
                                    }
                                });
                            }} outline color="info" style={{margin: "10px"}}>Sửa</Button>,
                button: true,
            },
            {
                cell: row => <Button onClick={ (id)=>this.onDelete(row.receipt_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>,
                button: true,
            }
        ];
        var filter_receipt= this.state.filter_text == "" ? this.state.receipts : this.state.receipts.filter(item => item.supplier_id && item.supplier_id == this.state.filter_text);
        const FilterComponent = () => (
            <>
                <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" name="filter_text" value = {this.state.filter_text} onChange={this.onHandleChange} className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
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
                <ToastContainer position="top-right" />
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <Label for="Name" className="mr-sm-2">Thêm phiếu nhập:</Label>
                                <Link to = {"/admin/home/add-receipt/"}>
                                    <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                </Link>
                                <DataTable
                                    title="Danh sách phiếu nhập"
                                    columns={columns}
                                    data={ filter_receipt }
                                    pagination
                                    subHeader
                                    subHeaderComponent={FilterComponent(this.state.receipts)}
                                    // paginationPerPage={1}
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowReceipt;