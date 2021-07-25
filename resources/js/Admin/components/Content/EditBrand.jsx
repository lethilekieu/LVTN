import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default class EditBrand extends Component {
    constructor(props) {
        super(props);
        this.state ={
            brand_id: "",
            brand_name : "",
            brand_slug : "",
            brand_desc : "",
            brand_status : "",
            update_at : moment(new Date()).format("yyyy-MM-DD")
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // onSubmit(){
    //     console.log('ts: ', this.state);
    //     const listBrand = this.state;
    //     // console.log('lb:', listBrand);
    //     axios.put('http://127.0.0.1:8000/api/brand/' + this.state.brand_id, listBrand)
    //     .then(res =>{
    //         if(res != null){
    //             return this.props.history.push('/admin/home/brand');
    //         }
    //     })
    // }

    onSubmit(){
        const brand_id_C2 = this.props.location.sendData.brand_id
        const listBrand = this.state;
        // console.log('lb:', listBrand);
        axios.put('http://127.0.0.1:8000/api/brand/' + brand_id_C2, listBrand)
        .then(res =>{
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

    // editBrand(){
    //     axios.get('http://127.0.0.1:8000/api/brand/find-id-by-slug/' + this.props.match.params.slug)
    //     .then(res=>{
    //         this.setState({brand_id: res.data.brand_id})
    //         console.log('get id by slug', res.data.brand_id);
 
    //         axios.get('http://127.0.0.1:8000/api/brand/' + res.data.brand_id)
    //         .then(res =>{
    //             this.setState({
    //                 brand_name : res.data.brand_name,
    //                 brand_slug : res.data.brand_slug,
    //                 brand_desc : res.data.brand_desc,
    //                 brand_status : res.data.brand_status,
    //                 // update_at : res.data.update_at //do update sẽ lấy time mới nên ko cần thiết, ngoài ra nếu dữ liệu đổ lên input sẽ giữ nguyên ->ko update đc
    //             });
    //         })
    //     })

        
    // }

    editBrand(){
        const brand_id_C2 = this.props.location.sendData.brand_id
        axios.get('http://127.0.0.1:8000/api/brand/' + brand_id_C2)
        .then(res =>{
            this.setState({
                brand_name : res.data.brand_name,
                brand_slug : res.data.brand_slug,
                brand_desc : res.data.brand_desc,
                brand_status : res.data.brand_status,
                // update_at : res.data.update_at //do update sẽ lấy time mới nên ko cần thiết, ngoài ra nếu dữ liệu đổ lên input sẽ giữ nguyên ->ko update đc
            });
        })
    }

    componentWillMount(){
        this.editBrand();
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
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.brand_name} name="brand_name" id="brand_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Tên slug thương hiệu</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.brand_slug} name="brand_slug" id="brand_slug" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandDesc" className="mr-sm-2">Mô tả thương hiệu</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.brand_desc} name="brand_desc" id="brand_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandStatus" className="mr-sm-2">Trạng thái thương hiệu</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } value={this.state.brand_status} name="brand_status" id="brand_status" /> */}
                                        <Input type="select" value={this.state.brand_status} onChange={ this.onHandleChange } name="brand_status" id="brand_status" >
                                            <option value={1}>Đang kinh doanh</option>
                                            <option value={0}>Đã ngừng kinh doanh</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="brandUpdate">Ngày cập nhật</Label>
                                        <Input type="date" value={this.state.update_at} onChange={ this.onHandleChange } name="update_at" id="exampleDate" readOnly/>
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
