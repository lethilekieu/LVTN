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
import { storage } from '../../../FirebaseConfig';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShowProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            filter_text:"",
        };
        this.loadProduct = this.loadProduct.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadProduct(){
        // 100 200 -> then
        // 300 400 500 -> catch err -> err.response.data (noi loi tu be api)
        axios.get('http://127.0.0.1:8000/api/product/')
        .then(res => {
            console.log('product: ', res);
            this.setState({
                product: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadProduct();
    }

    onDelete(id, urlImage){
        try { 
            storage.refFromURL(urlImage).delete()
            .then(() => {
                alert("Picture is deleted successfully!");
                axios.delete('http://127.0.0.1:8000/api/product/' + id)
                .then(res =>{
                    console.log(res);
                    if(res.data != null){
                        this.loadProduct();
                    }
                })
                .catch(err => {
                    toast.error('Lỗi '+ err.response.data);
                })
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            alert("Can't delete Picture!");
            console.log(error);
        }
        
    }
    
    
    render() {
        const columns = [
            {
                name: '#',
                selector: 'product_id',
                sortable: true,
            },
            {
                name: 'Tên sản phẩm',
                selector: 'product_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Số lượng',
                selector: 'product_quantity',
                sortable: true,
                right: true,
            },
            {
                name: 'Slug',
                selector: 'product_slug',
                sortable: true,
                right: true,
            },
            {
                name: 'Loại sp',
                selector: 'product_type_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Thương hiệu',
                selector: 'brand_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Đơn vị',
                selector: 'unit',
                sortable: true,
                right: true,
            },
            {
                name: 'Giá gốc',
                selector: 'unit_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Giá giảm',
                selector: 'promotion_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Mô tả',
                selector: 'product_desc',
                sortable: true,
                right: true,
            },
            {
                name: 'Nội dung',
                selector: 'product_content',
                sortable: true,
                right: true,
            },
            {
                name: 'Hình',
                cell: row => <img height="100" width="200" src={ row.product_image } alt="Card image cap" />,
                sortable: true,
                right: true,
            },
            {
                name: 'Trạng thái',
                selector: 'product_status',
                sortable: true,
                right: true,
            },
            {
                cell: row => <Button onClick={ () => {
                                this.props.history.push({
                                    pathname: '/admin/home/edit-product/' + row.product_id,
                                    sendData: {
                                        product_id: row.product_id
                                    }
                                });
                            }} outline color="info" style={{margin: "10px"}}>Sửa</Button>,
                button: true,
            },
            {
                cell: row => <Button onClick={ (id)=>this.onDelete(row.product_id, row.product_image)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>,
                button: true,
            }
        ];

        var filter_product= this.state.filter_text == "" ? this.state.product : this.state.product.filter(item => item.product_name && item.product_name.toLowerCase().includes(this.state.filter_text.toLowerCase()));
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
                                <Label for="Name" className="mr-sm-2">Thêm sản phẩm:</Label>
                                <Link to = {"/admin/home/add-product/"}>
                                    <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                </Link>
                                 <DataTable
                                    title="Danh sách sản phẩm"
                                    columns={columns}
                                    data={ filter_product }
                                    pagination
                                    subHeader
                                    subHeaderComponent={FilterComponent(this.state.product)}
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

export default ShowProduct;