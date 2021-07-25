import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { storage } from '../../../FirebaseConfig';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: "",
            product_name: "",
            product_quantity: 0,
            product_slug: "",
            product_type_id: "",
            brand_id: "",
            unit: "",
            unit_price: "",
            promotion_price: "",
            product_desc: "",
            product_content: "",
            product_image: "",
            product_status: 1,
            created_at: moment(new Date()).format("yyyy-MM-DD"),

            product_save_image: null,
            brand: [],
            product_type: [],
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeFile = this.onHandleChangeFile.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onHandleChangeFile(e){
        console.log(e.target.files[0])
        this.setState({
            product_save_image: e.target.files[0],
        })
    }

    loadBrand(){
        axios.get('http://127.0.0.1:8000/api/brand/')
        .then(res=>{
            console.log('brand:', res);
            this.setState({
                brand: res.data,
                brand_id: res.data[0].brand_id
            });
        }).catch(err =>console.log(err));
    }

    loadProduct_type(){
        axios.get('http://127.0.0.1:8000/api/product-type/')
        .then(res=>{
            console.log('pro_type:', res);
            this.setState({
                product_type: res.data,
                product_type_id: res.data[0].product_type_id
            });
        }).catch(err =>console.log(err));
    }

    componentWillMount() {
        this.loadBrand();
        this.loadProduct_type();
    }

    onSubmit(){
        try {
            var newNameFile = Date.now() + "_" + this.state.product_save_image.name;
            var child = newNameFile;
    
            const uploadTask = storage.ref('product').child(child).put(this.state.product_save_image);
                uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                    storage.ref('product').child(child).getDownloadURL()
                    .then(urlImage => { 
                        this.setState({product_image: urlImage});

                        const listProduct = {
                        product_id: this.state.product_id,
                        product_name: this.state.product_name,
                        product_quantity: this.state.product_quantity,
                        product_slug: this.state.product_slug,
                        product_type_id: this.state.product_type_id,
                        brand_id: this.state.brand_id,
                        unit: this.state.unit,
                        unit_price: this.state.unit_price,
                        promotion_price: this.state.promotion_price,
                        product_desc: this.state.product_desc,
                        product_content: this.state.product_content,
                        product_image: urlImage,
                        product_status: this.state.product_status,
                        created_at: this.state.created_at
                        }
                        // console.warn('send:', listProduct);
                        axios.post('http://127.0.0.1:8000/api/product/', listProduct)
                        .then(res => {
                            if(res != null){
                                return this.props.history.push('/admin/home/product');
                            }
                        })
                        .catch(err => {
                            err.response.data.map((error) => {
                                // console.log(error);
                                toast.error('Lỗi '+ error);
                            })
                        })
                    })
                });
        } catch (error) {
            toast.error('Lỗi: Hình không được trống');
        }
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
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Mã sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_id" id="product_id"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Tên sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_name" id="product_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Số lượng sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_quantity" id="product_quantity" readOnly/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Tên slug sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_slug" id="product_slug" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Mã loại sản phẩm</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } name="product_type_id" id="product_type_id"/> */}
                                        <Input type="select" onChange={ this.onHandleChange } name="product_type_id" id="product_type_id" >
                                            {this.state.product_type.map((productType, index) =>
                                                    <option key={ index } value={productType.product_type_id}>{productType.product_type_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Mã thương hiệu</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } name="brand_id" id="brand_id"/> */}
                                        <Input type="select" onChange={ this.onHandleChange } name="brand_id" id="brand_id" >
                                            {this.state.brand.map((productBrand, index) =>
                                                    <option key={ index } value={productBrand.brand_id}>{productBrand.brand_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Đơn vị tính</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="unit" id="unit"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Giá sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="unit_price" id="unit_price"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Giá khuyến mãi</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="promotion_price" id="promotion_price"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productDesc" className="mr-sm-2">Mô tả sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_desc" id="product_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Nội dung sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_content" id="product_content"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Hình sản phẩm</Label>
                                        <Input type="file" onChange={ this.onHandleChangeFile } name="product_image" id="product_image" required/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productStatus" className="mr-sm-2">Trạng thái sản phẩm</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } name="product_status" id="product_status" /> */}
                                        <Input type="select" value={this.state.product_status} onChange={ this.onHandleChange } name="product_status" id="product_status" >
                                            <option value={0}>Đang kinh doanh</option>
                                            <option value={1}>Sản phẩm mới</option>
                                            <option value={2}>Tạm ngừng</option>
                                            <option value={3}>Ngừng kinh doanh</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="brandCreate">Ngày thêm</Label>
                                        <Input type="date" name="created_at" id="exampleDate" defaultValue={moment(this.state.created_at).format("yyyy-MM-DD")} readOnly/>
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;