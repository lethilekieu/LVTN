import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

class EditProductType extends Component {
    constructor(props) {
        super(props);
        this.state ={
            product_type_id: "",
            product_type_name: "",
            categories_id: "",
            meta_keywords: "",
            product_type_slug: "",
            product_type_desc: "",
            product_type_status: "",
            updated_at: moment(new Date()).format("yyyy-MM-DD"),

            categories: [],
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(){
        const brand_id_C2 = this.props.location.sendData.product_type_id
        const listBrand = this.state;
        // console.log('lb:', listBrand);
        axios.put('http://127.0.0.1:8000/api/product-type/' + brand_id_C2, listBrand)
        .then(res =>{
            if(res != null){
                return this.props.history.push('/admin/home/product-type');
            }
        })
        .catch(err => {
            err.response.data.map((error) => {
                console.log(error);
                // alert(error);
                toast.error('Lỗi '+ error);
            })
        })
    }

    editProductType(){
        const proType_id = this.props.location.sendData.product_type_id
        axios.get('http://127.0.0.1:8000/api/product-type/' + proType_id)
        .then(res =>{
            this.setState({
                product_type_id: res.data.product_type_id,
                product_type_name: res.data.product_type_name,
                categories_id: res.data.categories_id,
                meta_keywords: res.data.meta_keywords,
                product_type_slug: res.data.product_type_slug,
                product_type_desc: res.data.product_type_desc,
                product_type_status: res.data.product_type_status
            });
        })
    }

    loadCategories(){
        axios.get('http://127.0.0.1:8000/api/categories/')
        .then(res=>{
            console.log('categories:', res);
            this.setState({
                categories: res.data,
                categories_id: res.data[0].categories_id
            });
        }).catch(err =>console.log(err));
    }

    componentWillMount(){
        this.loadCategories();
        this.editProductType();
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
                                        <Label for="productTypeName" className="mr-sm-2">Tên loại</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_type_name } name="product_type_name" id="product_type_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Dạng sản phẩm</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.categories_id} name="categories_id" id="categories_id" >
                                            {this.state.categories.map((category, index) =>
                                                    <option key={ index } value={category.categories_id}>{category.categories_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="metaKey" className="mr-sm-2">Từ khóa mở rộng</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.meta_keywords } name="meta_keywords" id="meta_keywords"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productTypeSlug" className="mr-sm-2">Tên slug loại</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_type_slug } name="product_type_slug" id="product_type_slug" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productTypeDesc" className="mr-sm-2">Mô tả loại</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_type_desc } name="product_type_desc" id="product_type_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productTypeStatus" className="mr-sm-2">Trạng thái loại</Label>
                                        <Input type="select" value={this.state.product_type_status} onChange={ this.onHandleChange } name="product_type_status" id="product_type_status" >
                                            <option value={1}>Đang kinh doanh</option>
                                            <option value={0}>Đã ngừng kinh doanh</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="productTypeCreate">Ngày cập nhật</Label>
                                        <Input type="date" name="updated_at" id="exampleDate" defaultValue={moment(this.state.updated_at).format("yyyy-MM-DD")} readOnly/>
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

export default EditProductType;