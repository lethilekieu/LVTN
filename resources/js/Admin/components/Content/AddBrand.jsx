import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default class AddBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand_name: "",
            brand_slug: "",
            brand_desc: "",
            brand_status: 1,
            created_at: moment(new Date()).format("yyyy-MM-DD"),
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }
    
    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(){
        console.warn('send:', this.state);
        const listBrand = {
            brand_name : this.state.brand_name,
            brand_slug : this.state.brand_slug,
            brand_desc : this.state.brand_desc,
            brand_status : this.state.brand_status,
            created_at : this.state.created_at,
        }
        axios.post('http://127.0.0.1:8000/api/brand/', listBrand)
        .then(res => {
            if(res != null){
                return this.props.history.push('/admin/home/brand');
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
                                        <Label for="brandName" className="mr-sm-2">Tên thương hiệu</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="brand_name" id="brand_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Tên slug thương hiệu</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="brand_slug" id="brand_slug" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandDesc" className="mr-sm-2">Mô tả thương hiệu</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="brand_desc" id="brand_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandStatus" className="mr-sm-2">Trạng thái thương hiệu</Label>
                                        <Input type="select" value={this.state.brand_status} onChange={ this.onHandleChange } name="brand_status" id="brand_status" >
                                            <option defaultValue={1}>Đang kinh doanh</option>
                                            <option value={0}>Đã ngừng kinh doanh</option>
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
        )
    }
}
